import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const authUser = verifyAuth(request);

    if (!authUser) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    // Fetch fresh user details from db
    const user = await prisma.user.findUnique({
      where: { id: authUser.id }
    });

    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        companyName: user.companyName,
        contactPerson: user.contactPerson,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Session retrieval error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
