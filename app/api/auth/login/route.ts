import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateToken, validateEmail, validatePhone } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, phone } = await request.json()

    // Validate input
    if (!email && !phone) {
      return NextResponse.json(
        { error: 'Email or phone number is required' },
        { status: 400 }
      )
    }

    if (email && !validateEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    if (phone && !validatePhone(phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      )
    }

    // Find user
    let user = await prisma.teamLogin.findFirst({
      where: email ? { email } : { phone },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found. Please register first.' },
        { status: 404 }
      )
    }

    // Generate token
    const token = generateToken({ id: user.id, email: user.email, phone: user.phone })

    // Create secure response
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
      token,
    })

    // Set secure cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return response
  } catch (error) {
    console.error('[v0] Login error:', error)
    return NextResponse.json(
      { error: 'Login failed. Please try again.' },
      { status: 500 }
    )
  }
}
