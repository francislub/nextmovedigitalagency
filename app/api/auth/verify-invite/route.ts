import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get('token')

    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      )
    }

    // Find invite by token
    const invite = await prisma.teamInvite.findUnique({
      where: { token },
    })

    if (!invite) {
      return NextResponse.json(
        { error: 'Invalid or expired invitation link' },
        { status: 404 }
      )
    }

    if (invite.status !== 'pending') {
      return NextResponse.json(
        { error: 'This invitation has already been used' },
        { status: 400 }
      )
    }

    if (new Date() > invite.expiresAt) {
      return NextResponse.json(
        { error: 'This invitation has expired. Please request a new one.' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      email: invite.email,
      token,
    })
  } catch (error) {
    console.error('[v0] Verify invite error:', error)
    return NextResponse.json(
      { error: 'Failed to verify invitation' },
      { status: 500 }
    )
  }
}
