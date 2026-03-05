import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, phone, subject, message } = await req.json();
    console.log("🚀 Contact API triggered");
    console.log("📦 Request body:", { name, email, phone, subject, message });

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: "Name, email, subject, and message are required" },
        { status: 400 }
      );
    }

    // Save submission
    const submission = await prisma.contactSubmission.create({
      data: {
        fullName: name,
        email,
        phone,
        subject,
        message,
      },
    });
    console.log("💾 Submission saved:", submission);

    // Fetch active admins
    const admins = await prisma.teamMember.findMany({
      where: { mainRole: "admin", active: true },
      select: { activeEmail: true, name: true },
    });
    console.log("👨‍💼 Admins found:", admins);

    const adminEmails = admins.map(a => a.activeEmail).filter(Boolean);
    console.log("📬 Admin emails:", adminEmails);

    // Configure email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    console.log("⚙️ Email transporter ready");

    // Notify admins
    if (adminEmails.length > 0) {
      const mailResult = await transporter.sendMail({
        from: `"NextMove System" <${process.env.SMTP_USER}>`,
        to: adminEmails,
        subject: `New Contact Form Submission: ${subject}`,
        html: `
          <h3>New Contact Submission</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "N/A"}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
      });
      console.log("📨 Admins notified via email:", mailResult.accepted);

      // Save notification
      await prisma.notification.create({
        data: {
          type: "contact-submission",
          title: "New Contact Submission",
          message: `${name} submitted a contact form.`,
          data: JSON.stringify(submission),
        },
      });
      console.log("🔔 Notification saved");
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