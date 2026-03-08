import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  console.log("🚀 Subscribe API triggered");

  try {
    const { email } = await req.json();
    console.log("📦 Request body:", { email });

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    // Check existing subscriber
    const existing = await prisma.subscriber.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({
        success: false,
        message: "You are already subscribed",
      });
    }

    // Create subscriber
    const subscriber = await prisma.subscriber.create({ data: { email } });
    console.log("✅ Subscriber created:", subscriber);

    // Fetch admins
    const admins = await prisma.teamMember.findMany({
      where: { mainRole: "admin", active: true },
      select: { activeEmail: true, name: true },
    });
    const adminEmails = admins.map(a => a.activeEmail).filter(Boolean);

    // Configure transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    // HTML email for subscriber
    const subscriberHTML = `
      <div style="font-family:Arial,sans-serif;color:#333;padding:20px;">
        <h2 style="color:#0f172a;">Welcome to NextMove Digital Agency!</h2>
        <p>Hi there,</p>
        <p>Thank you for subscribing to our newsletter. You will now receive insights, tips, and updates directly from our team.</p>
        <p>We’re excited to share our knowledge and keep you informed about the latest trends.</p>
        <p style="margin-top:20px;color:#6b7280;">If you have any questions, feel free to reply to this email. We aim to respond within 12 hours.</p>
        <p style="margin-top:20px;">Best regards,<br/><strong>NextMove Team</strong></p>
      </div>
    `;

    // HTML email for admins
    const adminHTML = `
      <div style="font-family:Arial,sans-serif;color:#333;padding:20px;">
        <h2 style="color:#0f172a;">New Newsletter Subscriber</h2>
        <p>A new user has subscribed to the newsletter:</p>
        <table style="width:100%;border-collapse:collapse;margin-top:10px;">
          <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
          <tr><td><strong>Subscribed At:</strong></td><td>${new Date().toLocaleString()}</td></tr>
        </table>
        <p style="margin-top:20px;color:#6b7280;">Please welcome our new subscriber!</p>
      </div>
    `;

    // Send emails safely
    try {
      await transporter.sendMail({
        from: `"NextMove Team" <${process.env.SMTP_FROM}>`,
        to: email,
        subject: "Welcome to NextMove Newsletter 🚀",
        html: subscriberHTML,
      });
      console.log("✅ Subscriber email sent");
    } catch (e) {
      console.error("⚠️ Failed to send subscriber email:", e);
    }

    if (adminEmails.length > 0) {
      try {
        await transporter.sendMail({
          from: `"NextMove System" <${process.env.SMTP_FROM}>`,
          to: adminEmails,
          subject: "New Newsletter Subscriber",
          html: adminHTML,
        });
        console.log("✅ Admin notification sent");
      } catch (e) {
        console.error("⚠️ Failed to send admin email:", e);
      }
    }

    // Save notification for admins
    if (adminEmails.length > 0) {
      await prisma.notification.create({
        data: {
          type: "newsletter",
          title: "New Subscriber",
          message: `${email} subscribed to the newsletter`,
          data: JSON.stringify(subscriber),
        },
      });
    }

    // Save email log
    await prisma.emailLog.create({
      data: {
        to: email,
        subject: "Newsletter Subscription",
        type: "notification",
        status: "sent",
      },
    });

    // Return success no matter what
    return NextResponse.json({
      success: true,
      message: "Successfully subscribed",
    });
  } catch (error) {
    console.error("🔥 SUBSCRIBE API ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Subscription failed" },
      { status: 500 }
    );
  }
}