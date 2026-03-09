import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateToken } from '@/lib/auth'
import { sendTeamMemberWelcomeEmail, sendAdminTeamMemberNotificationEmail } from '@/lib/team-emails'

export async function POST(request: NextRequest) {
  try {
    const {
      token,
      name,
      image,
      description,
      activeEmail,
      activePhone,
      mainRole = 'admin',
      githubLink,
      twitterLink,
      linkedinLink,
      instagramLink,
      websiteLink,
      roleIds = [],
    } = await request.json()

    if (!token || !name || !activeEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Verify token
    const invite = await prisma.teamInvite.findUnique({
      where: { token },
    })

    if (!invite) {
      return NextResponse.json(
        { error: 'Invalid or expired invite' },
        { status: 404 }
      )
    }

    if (invite.status !== 'pending') {
      return NextResponse.json(
        { error: 'Invite has already been used' },
        { status: 400 }
      )
    }

    if (new Date() > invite.expiresAt) {
      return NextResponse.json(
        { error: 'Invite has expired' },
        { status: 400 }
      )
    }

    // Check if email already exists in TeamMember
    const existingEmailMember = await prisma.teamMember.findUnique({
      where: { activeEmail },
    })

    if (existingEmailMember) {
      return NextResponse.json(
        { error: 'This email is already registered. Please use a different email.' },
        { status: 400 }
      )
    }

    // Check if phone already exists in TeamMember (if provided)
    if (activePhone) {
      const existingPhoneMember = await prisma.teamMember.findUnique({
        where: { activePhone },
      })

      if (existingPhoneMember) {
        return NextResponse.json(
          { error: 'This phone number is already registered. Please use a different phone number.' },
          { status: 400 }
        )
      }
    }

    // Create team member with all fields
    const teamMember = await prisma.teamMember.create({
      data: {
        name,
        image,
        description,
        activeEmail,
        activePhone,
        mainRole,
        githubLink,
        twitterLink,
        linkedinLink,
        instagramLink,
        websiteLink,
        roleIds: roleIds || [],
        active: true,
      },
      include: {
        roles: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    // Create login
    const login = await prisma.teamLogin.create({
      data: {
        name,
        email: activeEmail,
        phone: activePhone,
        verified: true,
      },
    })

    // Update invite status
    await prisma.teamInvite.update({
      where: { id: invite.id },
      data: { status: 'accepted' },
    })

    // Generate auth token
    const authToken = generateToken({
      id: login.id,
      email: login.email,
      phone: login.phone,
    })

    // Send welcome email to new team member
    try {
      await sendTeamMemberWelcomeEmail(activeEmail, {
        name,
        activeEmail,
        activePhone,
      })
    } catch (emailError) {
      console.error('[v0] Welcome email error:', emailError)
    }

    // Send admin notification emails
    try {
      const admins = await prisma.teamMember.findMany({
        where: { mainRole: 'admin' },
        select: { activeEmail: true },
      })

      for (const admin of admins) {
        if (admin.activeEmail) {
          try {
            await sendAdminTeamMemberNotificationEmail(admin.activeEmail, {
              name,
              activeEmail,
              activePhone,
              description,
              image,
            })
          } catch (adminEmailError) {
            console.error('[v0] Admin notification email error:', adminEmailError)
          }
        }
      }
    } catch (adminError) {
      console.error('[v0] Admin notification error:', adminError)
    }

    // Notify admin via database
    await prisma.notification.create({
      data: {
        type: 'team-member-joined',
        title: 'New Team Member Joined',
        message: `${name || invite.email} has joined the team`,
        data: JSON.stringify({ memberId: teamMember.id, email: invite.email }),
      },
    })

    const response = NextResponse.json({
      success: true,
      user: {
        id: teamMember.id,
        name: teamMember.name,
        email: activeEmail,
        activeEmail: teamMember.activeEmail,
        activePhone: teamMember.activePhone,
        image: teamMember.image,
        description: teamMember.description,
        mainRole: teamMember.mainRole,
        githubLink: teamMember.githubLink,
        twitterLink: teamMember.twitterLink,
        linkedinLink: teamMember.linkedinLink,
        instagramLink: teamMember.instagramLink,
        websiteLink: teamMember.websiteLink,
        roles: teamMember.roles,
      },
      token: authToken,
    })

    response.cookies.set('auth-token', authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
    })

    return response
  } catch (error) {
    console.error('[v0] Register invite error:', error)
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    )
  }
}
