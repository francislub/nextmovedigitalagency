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
  const serviceTypeMap: Record<string, string> = {
    'web-design': 'Web Design & Development',
    'branding': 'Branding & Identity',
    'content': 'Content Creation & Strategy',
    'social-media': 'Social Media Marketing',
    'seo': 'SEO Optimization',
  }

  const serviceLabel = serviceTypeMap[data.serviceType] || data.serviceType

  const html = `
    <div style="font-family: 'Courier New', monospace; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 40px 20px; border-radius: 12px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #00d4ff; font-size: 28px; margin: 0; text-shadow: 0 0 10px rgba(0, 212, 255, 0.3);">✓ CONSULTATION CONFIRMED</h1>
        <p style="color: #00d4ff; opacity: 0.8; margin-top: 10px; font-size: 12px; letter-spacing: 2px;">NEXT MOVE DIGITAL AGENCY</p>
      </div>
      
      <div style="background: rgba(0, 212, 255, 0.1); border-left: 3px solid #00d4ff; padding: 20px; margin: 20px 0; border-radius: 4px;">
        <p style="color: #e0e0e0; margin: 0 0 15px 0; font-size: 13px;">Thank you for scheduling a consultation with us! Your request has been received and confirmed.</p>
      </div>

      <div style="background: rgba(255, 255, 255, 0.05); padding: 20px; margin: 20px 0; border-radius: 8px; border: 1px solid rgba(0, 212, 255, 0.2);">
        <table style="width: 100%; color: #e0e0e0; font-size: 13px;">
          <tr>
            <td style="padding: 8px 0; color: #00d4ff; font-weight: bold; width: 120px;">&gt; NAME</td>
            <td style="padding: 8px 0;">${data.fullName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #00d4ff; font-weight: bold;">&gt; EMAIL</td>
            <td style="padding: 8px 0;">${data.email}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #00d4ff; font-weight: bold;">&gt; PHONE</td>
            <td style="padding: 8px 0;">${data.phone}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #00d4ff; font-weight: bold;">&gt; SERVICE</td>
            <td style="padding: 8px 0;">${serviceLabel}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #00d4ff; font-weight: bold;">&gt; DATE</td>
            <td style="padding: 8px 0;">${data.preferredDate ? new Date(data.preferredDate).toLocaleDateString() : 'TBD'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #00d4ff; font-weight: bold;">&gt; TIME</td>
            <td style="padding: 8px 0;">${data.preferredTime || 'TBD'}</td>
          </tr>
        </table>
      </div>

      <div style="background: rgba(0, 212, 255, 0.05); padding: 15px; margin: 20px 0; border-radius: 4px; border-left: 2px solid #00d4ff;">
        <p style="color: #00d4ff; font-size: 12px; margin: 0; font-weight: bold;">NEXT STEPS:</p>
        <p style="color: #e0e0e0; font-size: 12px; margin: 8px 0 0 0;">Our team will review your consultation request and reach out shortly to confirm the appointment time and discuss your project requirements.</p>
      </div>

      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(0, 212, 255, 0.2);">
        <p style="color: #00d4ff; font-size: 11px; opacity: 0.7; margin: 0;">Next Move Digital Agency</p>
        <p style="color: #00d4ff; font-size: 10px; opacity: 0.5; margin: 5px 0 0 0;">Transforming Digital Vision into Reality</p>
      </div>
    </div>
  `
  return sendEmail({
    to: email,
    subject: '✓ Consultation Confirmed - NextMove Digital Agency',
    html,
  })
}

export async function sendAdminNotification(email: string, data: any) {
  const serviceTypeMap: Record<string, string> = {
    'web-design': 'Web Design & Development',
    'branding': 'Branding & Identity',
    'content': 'Content Creation & Strategy',
    'social-media': 'Social Media Marketing',
    'seo': 'SEO Optimization',
  }

  const serviceLabel = serviceTypeMap[data.serviceType] || data.serviceType

  const html = `
    <div style="font-family: 'Courier New', monospace; max-width: 600px; margin: 0 auto; background: #0f0f1e; padding: 40px 20px; border-radius: 12px; border: 1px solid #ff0066;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #ff0066; font-size: 28px; margin: 0; text-shadow: 0 0 10px rgba(255, 0, 102, 0.3);">[!] NEW CONSULTATION</h1>
        <p style="color: #ff0066; opacity: 0.8; margin-top: 10px; font-size: 12px; letter-spacing: 2px;">ADMIN ALERT</p>
      </div>
      
      <div style="background: rgba(255, 0, 102, 0.1); border-left: 3px solid #ff0066; padding: 20px; margin: 20px 0; border-radius: 4px;">
        <p style="color: #e0e0e0; margin: 0; font-size: 13px;"><strong>${data.fullName}</strong> has scheduled a consultation request and is awaiting confirmation.</p>
      </div>

      <div style="background: rgba(255, 255, 255, 0.03); padding: 20px; margin: 20px 0; border-radius: 8px; border: 1px solid rgba(255, 0, 102, 0.2);">
        <table style="width: 100%; color: #e0e0e0; font-size: 13px;">
          <tr>
            <td style="padding: 10px 0; color: #ff0066; font-weight: bold; width: 120px;">◆ NAME</td>
            <td style="padding: 10px 0;">${data.fullName}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #ff0066; font-weight: bold;">◆ EMAIL</td>
            <td style="padding: 10px 0;"><a href="mailto:${data.email}" style="color: #00d4ff; text-decoration: none;">${data.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #ff0066; font-weight: bold;">◆ PHONE</td>
            <td style="padding: 10px 0;"><a href="tel:${data.phone}" style="color: #00d4ff; text-decoration: none;">${data.phone}</a></td>
          </tr>
          ${data.company ? `<tr>
            <td style="padding: 10px 0; color: #ff0066; font-weight: bold;">◆ COMPANY</td>
            <td style="padding: 10px 0;">${data.company}</td>
          </tr>` : ''}
          <tr>
            <td style="padding: 10px 0; color: #ff0066; font-weight: bold;">◆ SERVICE</td>
            <td style="padding: 10px 0;">${serviceLabel}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #ff0066; font-weight: bold;">◆ DATE</td>
            <td style="padding: 10px 0;">${data.preferredDate ? new Date(data.preferredDate).toLocaleDateString() : 'Not specified'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #ff0066; font-weight: bold;">◆ TIME</td>
            <td style="padding: 10px 0;">${data.preferredTime || 'Not specified'}</td>
          </tr>
        </table>
      </div>

      ${data.message ? `
      <div style="background: rgba(0, 212, 255, 0.05); padding: 15px; margin: 20px 0; border-radius: 4px; border-left: 2px solid #00d4ff;">
        <p style="color: #00d4ff; font-size: 12px; margin: 0 0 8px 0; font-weight: bold;">MESSAGE:</p>
        <p style="color: #e0e0e0; font-size: 12px; margin: 0; white-space: pre-wrap;">${data.message}</p>
      </div>
      ` : ''}

      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255, 0, 102, 0.2);">
        <p style="color: #ff0066; font-size: 11px; opacity: 0.7; margin: 0;">ACTION REQUIRED: Review and confirm this consultation</p>
        <p style="color: #ff0066; font-size: 10px; opacity: 0.5; margin: 5px 0 0 0;">Check your admin portal for full details</p>
      </div>
    </div>
  `
  return sendEmail({
    to: email,
    subject: `[NEW CONSULTATION] ${data.fullName} - ${serviceLabel}`,
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
