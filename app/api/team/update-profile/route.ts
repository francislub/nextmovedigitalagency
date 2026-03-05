import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json({ error: 'Team member ID is required' }, { status: 400 })
    }

    const updated = await prisma.teamMember.update({
      where: { id },
      data: {
        name: updateData.name,
        image: updateData.image,
        description: updateData.description,
        activeEmail: updateData.activeEmail,
        activePhone: updateData.activePhone,
        githubLink: updateData.githubLink,
        twitterLink: updateData.twitterLink,
        linkedinLink: updateData.linkedinLink,
        instagramLink: updateData.instagramLink,
        websiteLink: updateData.websiteLink,
      },
      include: {
        roles: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
      },
    })

    return NextResponse.json({ message: 'Profile updated successfully', user: updated })
  } catch (error) {
    console.error('[v0] Profile update error:', error)
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
  }
}
