import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, phone, subject, message } = await req.json();
    console.log("🚀 Contact API triggered", { name, email, phone, subject, message });

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: "Name, email, subject, and message are required" },
        { status: 400 }
      );
    }

    // Save submission
    const submission = await prisma.contactSubmission.create({
      data: { fullName: name, email, phone, subject, message },
    });
    console.log("💾 Submission saved:", submission);

    // Fetch active admins
    const admins = await prisma.teamMember.findMany({
      where: { mainRole: "admin", active: true },
      select: { activeEmail: true, name: true },
    });

    const adminEmails = admins.map(a => a.activeEmail).filter(Boolean);
    console.log("📬 Admin emails:", adminEmails);

    // Configure email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // HTML Email Templates
    const adminEmailHTML = `
      <div style="font-family:Arial,sans-serif;color:#333;">
        <h2 style="color:#0f172a;">New Contact Form Submission</h2>
        <p>A user has submitted a contact form on your website:</p>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td><strong>Name:</strong></td><td>${name}</td></tr>
          <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
          <tr><td><strong>Phone:</strong></td><td>${phone || "N/A"}</td></tr>
          <tr><td><strong>Subject:</strong></td><td>${subject}</td></tr>
          <tr><td><strong>Message:</strong></td><td>${message}</td></tr>
        </table>
        <p style="margin-top:20px;color:#6b7280;">Please follow up within 12 hours.</p>
      </div>
    `;

    const userEmailHTML = `
      <div style="font-family:Arial,sans-serif;color:#333;">
        <h2 style="color:#0f172a;">Thank You for Contacting Us!</h2>
        <p>Hi ${name},</p>
        <p>We have received your message regarding <strong>${subject}</strong>. Our team will review your message and reply within 12 hours.</p>
        <p>Your message:</p>
        <blockquote style="border-left:4px solid #3b82f6;padding-left:10px;margin-left:0;color:#6b7280;">
          ${message}
        </blockquote>
        <p>Thank you for reaching out to us!</p>
        <p style="margin-top:20px;">Best regards,<br/><strong>NextMove Team</strong></p>
      </div>
    `;

    // Send emails in parallel
    const sendEmails = [
      // Admin notification
      adminEmails.length > 0 &&
        transporter.sendMail({
          from: `"NextMove System" <${process.env.SMTP_USER}>`,
          to: adminEmails,
          subject: `New Contact Form Submission: ${subject}`,
          html: adminEmailHTML,
        }),
      // User acknowledgment
      transporter.sendMail({
        from: `"NextMove Team" <${process.env.SMTP_USER}>`,
        to: email,
        subject: `Thank You for Contacting NextMove`,
        html: userEmailHTML,
      }),
    ].filter(Boolean);

    const results = await Promise.all(sendEmails);
    console.log("📨 Emails sent:", results.map(r => r.accepted));

    // Save notification for admins
    if (adminEmails.length > 0) {
      await prisma.notification.create({
        data: {
          type: "contact-submission",
          title: "New Contact Submission",
          message: `${name} submitted a contact form.`,
          data: JSON.stringify(submission),
        },
      });
    }

    return NextResponse.json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("🔥 CONTACT API ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send message" },
      { status: 500 }
    );
  }
}