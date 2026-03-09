import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json()

    if (!['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      )
    }

    const consultation = await prisma.scheduleConsultation.update({
      where: { id: params.id },
      data: { status },
    })

    return NextResponse.json({
      success: true,
      consultation,
    })
  } catch (error) {
    console.error('[v0] Update consultation error:', error)
    return NextResponse.json(
      { error: 'Failed to update consultation' },
      { status: 500 }
    )
  }
}

// DELETE /api/consultation/:id
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    if (!id) return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 })

    await prisma.scheduleConsultation.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete consultation error:', error)
    return NextResponse.json({ success: false, error: 'Failed to delete consultation' }, { status: 500 })
  }
}

// GET /api/consultation/:id (optional for viewing details)
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const consultation = await prisma.scheduleConsultation.findUnique({
      where: { id: params.id },
    })

    if (!consultation) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    return NextResponse.json(consultation)
  } catch (error) {
    console.error('Fetch consultation error:', error)
    return NextResponse.json({ error: 'Failed to fetch consultation' }, { status: 500 })
  }
}