// app/api/team/route.ts
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const team = await prisma.teamMember.findMany({
    include: { roles: true }
  })
  return NextResponse.json(team)
}