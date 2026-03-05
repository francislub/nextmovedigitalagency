import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateEmail, validatePhone } from '@/lib/auth'
import { sendConsultationConfirm } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const {
      fullName,
      email,
      phone,
      company,
      industry,
      budget,
      services,
      description,
      preferredDate,
      preferredTime,
    } = await request.json()

    // Validate required fields
    if (!fullName || !email || !phone || !services || services.length === 0) {
      return NextResponse.json(
        { error: 'Required fields missing' },
        { status: 400 }
      )
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email' },
        { status: 400 }
      )
    }

    if (!validatePhone(phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number' },
        { status: 400 }
      )
    }

    // Create consultation
    const consultation = await prisma.scheduleConsultation.create({
      data: {
        fullName,
        email,
        phone,
        company,
        industry,
        budget,
        services: Array.isArray(services) ? services.join(', ') : services,
        description,
        preferredDate: preferredDate ? new Date(preferredDate) : null,
        preferredTime,
      },
    })

    // Send confirmation email to user
    try {
      await sendConsultationConfirm(email, {
        fullName,
        email,
        phone,
        services: services.join(', '),
        preferredDate,
        preferredTime,
      })
    } catch (error) {
      console.error('[v0] Email send error:', error)
    }

    // Notify admin
    try {
      await prisma.notification.create({
        data: {
          type: 'consultation-scheduled',
          title: 'New Consultation Scheduled',
          message: `${fullName} scheduled a consultation for ${services.join(', ')}`,
          data: JSON.stringify({
            consultationId: consultation.id,
            email,
            services,
          }),
        },
      })
    } catch (error) {
      console.error('[v0] Notification error:', error)
    }

    return NextResponse.json({
      success: true,
      message: 'Consultation scheduled successfully!',
      consultationId: consultation.id,
    })
  } catch (error) {
    console.error('[v0] Consultation error:', error)
    return NextResponse.json(
      { error: 'Failed to schedule consultation' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const consultations = await prisma.scheduleConsultation.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    })

    return NextResponse.json(consultations)
  } catch (error) {
    console.error('[v0] Get consultations error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch consultations' },
      { status: 500 }
    )
  }
}
