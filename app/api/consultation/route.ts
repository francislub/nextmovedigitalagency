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
      serviceType,
      message,
      preferredDate,
      preferredTime,
    } = await request.json()

    // Validate required fields
    if (!fullName || !email || !phone || !serviceType) {
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
        company: company || undefined,
        serviceType,
        message: message || undefined,
        preferredDate: preferredDate ? new Date(preferredDate) : null,
        preferredTime: preferredTime || undefined,
        status: 'pending',
        notified: false,
      },
    })

    // Send confirmation email to user
    try {
      await sendConsultationConfirm(email, {
        fullName,
        email,
        phone,
        serviceType,
        preferredDate,
        preferredTime,
      })
    } catch (error) {
      console.error('[v0] Email send error:', error)
    }

    // Send admin notification email
    try {
      const adminEmails = await prisma.teamMember.findMany({
        where: { mainRole: 'admin' },
        select: { activeEmail: true },
      })

      if (adminEmails.length > 0) {
        const { sendAdminNotification } = await import('@/lib/email')
        for (const admin of adminEmails) {
          if (admin.activeEmail) {
            await sendAdminNotification(admin.activeEmail, {
              type: 'consultation',
              fullName,
              email,
              phone,
              company,
              serviceType,
              preferredDate,
              preferredTime,
              message,
            })
          }
        }
      }
    } catch (error) {
      console.error('[v0] Admin notification error:', error)
    }

    // Create notification record
    try {
      await prisma.notification.create({
        data: {
          type: 'consultation-scheduled',
          title: 'New Consultation Scheduled',
          message: `${fullName} scheduled a consultation for ${serviceType}`,
          data: JSON.stringify({
            consultationId: consultation.id,
            email,
            serviceType,
            preferredDate,
            preferredTime,
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

// GET all consultations
export async function GET() {
  try {
    const consultations = await prisma.scheduleConsultation.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(consultations)
  } catch (error) {
    console.error('Fetch consultations error:', error)
    return NextResponse.json({ error: 'Failed to fetch consultations' }, { status: 500 })
  }
}

// DELETE consultation
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const deleted = await prisma.scheduleConsultation.delete({
      where: { id: params.id },
    })
    return NextResponse.json({ success: true, deleted })
  } catch (error) {
    console.error('Delete consultation error:', error)
    return NextResponse.json({ success: false, error: 'Failed to delete consultation' }, { status: 500 })
  }
}