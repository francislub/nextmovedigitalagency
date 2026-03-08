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

    // Verify transporter connection
    try {
      await transporter.verify();
      console.log("✅ SMTP Server verified and ready");
    } catch (err) {
      console.warn("⚠️ SMTP verification failed:", err);
    }

    // HTML email for subscriber
    const subscriberHTML = `
      <div style="font-family:Arial,sans-serif;color:#111;padding:20px;background:#f9fafb;border-radius:8px;">
        <h2 style="color:#0f172a;">Welcome to NextMove Digital Agency!</h2>
        <p>Hi there,</p>
        <p>Thank you for subscribing to our newsletter. You will now receive insights, tips, and updates directly from our team.</p>
        <p>We’re excited to share our knowledge and keep you informed about the latest trends in digital marketing and technology.</p>
        <p style="margin-top:20px;color:#6b7280;">If you have any questions, feel free to reply to this email. We aim to respond within 12 hours.</p>
        <p style="margin-top:20px;">Best regards,<br/><strong>NextMove Team</strong></p>
      </div>
    `;

    // HTML email for admins
    const adminHTML = `
      <div style="font-family:Arial,sans-serif;color:#111;padding:20px;background:#f3f4f6;border-radius:8px;">
        <h2 style="color:#0f172a;">New Newsletter Subscriber</h2>
        <p>A new user has subscribed to the newsletter:</p>
        <table style="width:100%;border-collapse:collapse;margin-top:10px;">
          <tr><td style="padding:4px;"><strong>Email:</strong></td><td style="padding:4px;">${email}</td></tr>
          <tr><td style="padding:4px;"><strong>Subscribed At:</strong></td><td style="padding:4px;">${new Date().toLocaleString()}</td></tr>
        </table>
        <p style="margin-top:20px;color:#6b7280;">Please welcome our new subscriber!</p>
      </div>
    `;

    // Send emails in parallel and catch individual errors
    const emailPromises: Promise<any>[] = [];

    // Send subscriber email
    emailPromises.push(
      transporter.sendMail({
        from: `"NextMove Team" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Welcome to NextMove Newsletter 🚀",
        html: subscriberHTML,
      }).then(() => console.log("✅ Subscriber email sent"))
        .catch(err => console.error("⚠️ Failed to send subscriber email:", err))
    );

    // Send admin notification if admins exist
    if (adminEmails.length > 0) {
      emailPromises.push(
        transporter.sendMail({
          from: `"NextMove System" <${process.env.SMTP_USER}>`,
          to: adminEmails,
          subject: "New Newsletter Subscriber",
          html: adminHTML,
        }).then(() => console.log("✅ Admin notification sent"))
          .catch(err => console.error("⚠️ Failed to send admin email:", err))
      );
    }

    await Promise.all(emailPromises);

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
      console.log("🔔 Notification saved for admins");
    }

    // Save email log for subscriber
    await prisma.emailLog.create({
      data: {
        to: email,
        subject: "Newsletter Subscription",
        type: "notification",
        status: "sent",
      },
    });

    return NextResponse.json({ success: true, message: "Successfully subscribed" });
  } catch (error) {
    console.error("🔥 SUBSCRIBE API ERROR:", error);
    return NextResponse.json({ success: false, message: "Subscription failed" }, { status: 500 });
  }
}