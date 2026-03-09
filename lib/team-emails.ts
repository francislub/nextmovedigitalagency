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

async function sendEmail(options: {
  to: string
  subject: string
  html: string
}) {
  return transporter.sendMail({
    from: process.env.SMTP_FROM,
    ...options,
  })
}

export async function sendTeamMemberWelcomeEmail(email: string, data: {
  name: string
  activeEmail: string
  activePhone: string
}) {
  const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
      <div style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">Welcome to NextMove Digital Agency</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">You're Now Part of Our Team!</p>
        </div>

        <!-- Content -->
        <div style="padding: 40px;">
          <p style="font-size: 16px; color: #333; margin: 0 0 20px 0;">
            Hello <strong>${data.name}</strong>,
          </p>

          <p style="font-size: 15px; color: #666; line-height: 1.6; margin: 0 0 20px 0;">
            Congratulations! Your account has been successfully created and you've joined the NextMove Digital Agency team. We're excited to have you on board!
          </p>

          <!-- Account Details -->
          <div style="background: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; margin: 20px 0; border-radius: 4px;">
            <h3 style="margin: 0 0 15px 0; color: #333; font-size: 14px; font-weight: 600;">YOUR ACCOUNT DETAILS</h3>
            <table style="width: 100%; font-size: 14px; color: #555;">
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #333; width: 120px;">Email:</td>
                <td style="padding: 8px 0;">${data.activeEmail}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #333;">Phone:</td>
                <td style="padding: 8px 0;">${data.activePhone}</td>
              </tr>
            </table>
          </div>

          <!-- Next Steps -->
          <div style="background: #e8f4f8; border-left: 4px solid #00bcd4; padding: 20px; margin: 20px 0; border-radius: 4px;">
            <h3 style="margin: 0 0 15px 0; color: #00897b; font-size: 14px; font-weight: 600;">NEXT STEPS</h3>
            <ol style="margin: 0; padding-left: 20px; font-size: 14px; color: #555; line-height: 1.8;">
              <li>Log in to your portal using your email or phone number</li>
              <li>Update your profile with additional information (optional)</li>
              <li>Start collaborating with the team</li>
              <li>Check your email for important announcements</li>
            </ol>
          </div>

          <!-- CTA Button -->
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/login" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 40px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block; font-size: 14px;">
              Go to Login
            </a>
          </div>

          <!-- Footer Note -->
          <p style="font-size: 13px; color: #999; margin: 30px 0 0 0; line-height: 1.6;">
            If you need any assistance or have questions, please don't hesitate to contact our support team.
          </p>
        </div>

        <!-- Footer -->
        <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e0e0e0;">
          <p style="margin: 0; font-size: 12px; color: #999;">
            © ${new Date().getFullYear()} NextMove Digital Agency. All rights reserved.
          </p>
          <p style="margin: 8px 0 0 0; font-size: 12px; color: #999;">
            You received this email because you registered for NextMove Digital Agency.
          </p>
        </div>
      </div>
    </div>
  `

  return sendEmail({
    to: email,
    subject: 'Welcome to NextMove Digital Agency - Account Created',
    html,
  })
}

export async function sendAdminTeamMemberNotificationEmail(email: string, data: {
  name: string
  activeEmail: string
  activePhone: string
  description?: string
  image?: string
}) {
  const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
      <div style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">New Team Member Joined!</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Admin Notification</p>
        </div>

        <!-- Alert Box -->
        <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px 20px; margin: 0; font-size: 14px; color: #856404;">
          <strong>⚠️ ACTION REQUIRED:</strong> Review and manage this new team member in your admin portal.
        </div>

        <!-- Content -->
        <div style="padding: 40px;">
          <p style="font-size: 15px; color: #666; margin: 0 0 20px 0;">
            A new team member has successfully registered and joined NextMove Digital Agency.
          </p>

          <!-- Member Details -->
          <div style="background: #f8f9fa; padding: 20px; margin: 20px 0; border-radius: 8px; border: 1px solid #e0e0e0;">
            <h3 style="margin: 0 0 15px 0; color: #333; font-size: 14px; font-weight: 600;">TEAM MEMBER INFORMATION</h3>
            
            <table style="width: 100%; font-size: 14px; color: #555;">
              <tr>
                <td style="padding: 10px 0; font-weight: 600; color: #333; width: 120px;">Name:</td>
                <td style="padding: 10px 0; font-weight: 600; color: #f5576c;">${data.name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: 600; color: #333;">Email:</td>
                <td style="padding: 10px 0;"><a href="mailto:${data.activeEmail}" style="color: #667eea; text-decoration: none;">${data.activeEmail}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: 600; color: #333;">Phone:</td>
                <td style="padding: 10px 0;"><a href="tel:${data.activePhone}" style="color: #667eea; text-decoration: none;">${data.activePhone}</a></td>
              </tr>
              ${data.description ? `
              <tr>
                <td style="padding: 10px 0; font-weight: 600; color: #333;">Bio:</td>
                <td style="padding: 10px 0;">${data.description}</td>
              </tr>
              ` : ''}
            </table>
          </div>

          <!-- Admin Actions -->
          <div style="background: #e3f2fd; border-left: 4px solid #2196F3; padding: 20px; margin: 20px 0; border-radius: 4px;">
            <h3 style="margin: 0 0 15px 0; color: #1565c0; font-size: 14px; font-weight: 600;">ADMIN ACTIONS</h3>
            <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #555; line-height: 1.8;">
              <li>Review member profile and details</li>
              <li>Assign roles and permissions</li>
              <li>Update team member information</li>
              <li>Monitor team member activity</li>
            </ul>
          </div>

          <!-- Info Box -->
          <div style="background: #f0f4c3; border-left: 4px solid #9ccc65; padding: 15px 20px; margin: 20px 0; border-radius: 4px; font-size: 13px; color: #558b2f; line-height: 1.6;">
            <strong>ℹ️ Note:</strong> This is an automated notification sent to all administrators. New team members must be reviewed and assigned appropriate roles within the admin portal.
          </div>
        </div>

        <!-- Footer -->
        <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e0e0e0;">
          <p style="margin: 0; font-size: 12px; color: #999;">
            © ${new Date().getFullYear()} NextMove Digital Agency. All rights reserved.
          </p>
          <p style="margin: 8px 0 0 0; font-size: 12px; color: #999;">
            This is an automated admin notification from NextMove Digital Agency.
          </p>
        </div>
      </div>
    </div>
  `

  return sendEmail({
    to: email,
    subject: `[NEW TEAM MEMBER] ${data.name} has joined NextMove Digital Agency`,
    html,
  })
}
