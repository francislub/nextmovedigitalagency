import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  console.log("📩 Subscribe API triggered")

  try {
    const body = await req.json()
    console.log("📦 Request body:", body)

    const { email } = body

    if (!email) {
      console.log("❌ No email provided")
      return NextResponse.json(
        { success: false, message: "Email required" },
        { status: 400 }
      )
    }

    console.log("📧 Email received:", email)

    // SAVE SUBSCRIBER
    const subscriber = await prisma.subscriber.upsert({
      where: { email },
      update: {},
      create: { email },
    })

    console.log("✅ Subscriber saved:", subscriber)

    // CREATE SMTP TRANSPORT
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })

    console.log("📡 SMTP transporter created")

    // ADMIN EMAIL
    const adminMail = {
      from: process.env.SMTP_FROM,
      to: process.env.SMTP_USER,
      subject: "📬 New Newsletter Subscriber",
      html: `
        <h2>New Newsletter Subscription</h2>
        <p>A new user has subscribed to your newsletter.</p>

        <p><strong>Email:</strong> ${email}</p>

        <br/>
        <p>Login to your admin dashboard to view subscribers.</p>
      `,
    }

    // USER EMAIL
    const userMail = {
      from: process.env.SMTP_FROM,
      to: email,
      subject: "🎉 Welcome to NextMove Newsletter",
      html: `
        <h2>Welcome to NextMove Digital Agency</h2>

        <p>Thank you for subscribing to our newsletter.</p>

        <p>You will receive:</p>

        <ul>
          <li>Marketing tips</li>
          <li>Business growth strategies</li>
          <li>Exclusive insights</li>
        </ul>

        <br/>

        <p>We are excited to have you with us!</p>

        <br/>

        <strong>NextMove Digital Agency</strong>
      `,
    }

    console.log("📨 Sending admin email...")
    await transporter.sendMail(adminMail)

    console.log("📨 Sending user email...")
    await transporter.sendMail(userMail)

    console.log("✅ Emails sent successfully")

    return NextResponse.json({
      success: true,
      message: "Subscribed successfully",
    })

  } catch (error) {
    console.error("❌ Subscribe API error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Server error",
      },
      { status: 500 }
    )
  }
}