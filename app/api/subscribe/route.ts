import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  console.log("🚀 Subscribe API triggered")

  try {
    const body = await req.json()
    console.log("📦 Request body:", body)

    const { email } = body

    if (!email) {
      console.log("❌ No email provided")

      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      )
    }

    console.log("📧 Email received:", email)

    // Check existing subscriber
    console.log("🔍 Checking if subscriber already exists...")

    const existing = await prisma.subscriber.findUnique({
      where: { email }
    })

    if (existing) {
      console.log("⚠️ Subscriber already exists:", email)

      return NextResponse.json({
        success: false,
        message: "You are already subscribed"
      })
    }

    // Create subscriber
    console.log("💾 Creating subscriber in database...")

    const subscriber = await prisma.subscriber.create({
      data: { email }
    })

    console.log("✅ Subscriber created:", subscriber)

    // Fetch admins
    console.log("👨‍💼 Fetching admin users to notify...")

    const admins = await prisma.teamMember.findMany({
      where: {
        mainRole: "admin",
        active: true
      },
      select: {
        activeEmail: true,
        name: true
      }
    })

    console.log("👥 Admins found:", admins)

    const adminEmails = admins
      .map(a => a.activeEmail)
      .filter(Boolean)

    console.log("📬 Admin emails:", adminEmails)

    // Create transporter
    console.log("⚙️ Creating email transporter...")

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })

    console.log("📨 Email transporter ready")

    // Send welcome email
    console.log("📤 Sending welcome email to subscriber...")

    await transporter.sendMail({
      from: `"NextMove Digital Agency" <${process.env.SMTP_FROM}>`,
      to: email,
      subject: "Welcome to NextMove Newsletter 🚀",
      html: `
        <h2>Welcome to NextMove Digital Agency</h2>
        <p>Thank you for subscribing to our newsletter.</p>
        <p>You will now receive insights, tips, and updates from our team.</p>
      `
    })

    console.log("✅ Subscriber email sent")

    // Save email log
    console.log("📝 Saving email log...")

    await prisma.emailLog.create({
      data: {
        to: email,
        subject: "Newsletter Subscription",
        type: "notification",
        status: "sent"
      }
    })

    console.log("📦 Email log saved")

    // Notify admins
    if (adminEmails.length > 0) {
      console.log("📤 Sending admin notification email...")

      await transporter.sendMail({
        from: `"NextMove System" <${process.env.SMTP_FROM}>`,
        to: adminEmails,
        subject: "New Newsletter Subscriber",
        html: `
          <h3>New Subscriber Alert</h3>
          <p><strong>Email:</strong> ${email}</p>
        `
      })

      console.log("✅ Admin notification sent")
    }

    // Save notification
    console.log("🔔 Saving system notification...")

    await prisma.notification.create({
      data: {
        type: "newsletter",
        title: "New Subscriber",
        message: `${email} subscribed to the newsletter`,
        data: JSON.stringify(subscriber)
      }
    })

    console.log("✅ Notification stored")

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed"
    })

  } catch (error) {
    console.error("🔥 SUBSCRIBE API ERROR:", error)

    return NextResponse.json(
      { success: false, message: "Subscription failed" },
      { status: 500 }
    )
  }
}