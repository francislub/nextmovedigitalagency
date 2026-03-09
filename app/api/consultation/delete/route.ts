import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { id } = body

    if (!id) {
      return NextResponse.json({ success: false, error: 'Consultation ID is required' }, { status: 400 })
    }

    await prisma.scheduleConsultation.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete consultation error:', error)
    return NextResponse.json({ success: false, error: 'Failed to delete consultation' }, { status: 500 })
  }
}