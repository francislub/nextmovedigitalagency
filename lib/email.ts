import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string
  subject: string
  html?: string
  text?: string
}) {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@nextmovedigitalagency.com',
      to,
      subject,
      html,
      text,
    })
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('[v0] Email error:', error)
    return { success: false, error }
  }
}

export async function sendInviteEmail(email: string, token: string) {
  const inviteUrl = `${process.env.NEXT_PUBLIC_APP_URL}/register-invite?token=${token}`
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333;">Join NextMove Digital Agency Team</h1>
      <p>You've been invited to join our team! Click the link below to complete your registration:</p>
      <a href="${inviteUrl}" style="display: inline-block; padding: 12px 24px; background: linear-gradient(to right, var(--primary), var(--secondary)); color: white; text-decoration: none; border-radius: 8px; margin: 20px 0;">
        Accept Invitation
      </a>
      <p>Or copy this link: ${inviteUrl}</p>
      <p style="color: #666; font-size: 12px; margin-top: 30px;">This link expires in 7 days.</p>
    </div>
  `
  return sendEmail({ to: email, subject: 'Join NextMove Digital Agency Team', html })
}

export async function sendConsultationConfirm(email: string, data: any) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333;">Consultation Scheduled</h1>
      <p>Thank you for scheduling a consultation with NextMove Digital Agency!</p>
      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Name:</strong> ${data.fullName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Service:</strong> ${data.serviceType}</p>
        <p><strong>Preferred Date:</strong> ${data.preferredDate || 'Not specified'}</p>
      </div>
      <p>We'll be in touch soon to confirm your consultation.</p>
    </div>
  `
  return sendEmail({
    to: email,
    subject: 'Consultation Scheduled - NextMove Digital Agency',
    html,
  })
}

export async function sendContactReply(email: string, message: string) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333;">We Received Your Message</h1>
      <p>Thank you for contacting NextMove Digital Agency!</p>
      <p>Our team has received your message and we'll get back to you shortly.</p>
      <p style="color: #666; font-size: 12px; margin-top: 30px;">If you have any urgent questions, feel free to call us directly.</p>
    </div>
  `
  return sendEmail({
    to: email,
    subject: 'Message Received - NextMove Digital Agency',
    html,
  })
}
