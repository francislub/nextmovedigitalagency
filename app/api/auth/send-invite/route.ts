import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateInviteToken, validateEmail } from '@/lib/auth'
import { sendInviteEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !validateEmail(email)) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    // Check if email already exists in TeamMember
    const existingTeamMember = await prisma.teamMember.findUnique({
      where: { activeEmail: email },
    })

    if (existingTeamMember) {
      return NextResponse.json(
        { error: 'Email already exists. This person is already registered as a team member.' },
        { status: 400 }
      )
    }

    // Check if already invited
    const existingInvite = await prisma.teamInvite.findUnique({
      where: { email },
    })

    if (existingInvite && existingInvite.status === 'accepted') {
      return NextResponse.json(
        { error: 'User already registered' },
        { status: 400 }
      )
    }

    if (existingInvite && existingInvite.status === 'pending') {
      return NextResponse.json(
        { error: 'Invitation already sent to this email. Please check your inbox.' },
        { status: 400 }
      )
    }

    // Generate token
    const token = generateInviteToken()
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

    // Create or update invite
    const invite = await prisma.teamInvite.upsert({
      where: { email },
      update: {
        token,
        status: 'pending',
        expiresAt,
      },
      create: {
        email,
        token,
        expiresAt,
        status: 'pending',
      },
    })

    // Send email
    await sendInviteEmail(email, token)

    // Notify admin
    await prisma.notification.create({
      data: {
        type: 'team-invite-sent',
        title: 'New Team Invite Sent',
        message: `Invitation sent to ${email}`,
        data: JSON.stringify({ email, inviteId: invite.id }),
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Invitation sent successfully',
    })
  } catch (error) {
    console.error('[v0] Send invite error:', error)
    return NextResponse.json(
      { error: 'Failed to send invitation' },
      { status: 500 }
    )
  }
}
