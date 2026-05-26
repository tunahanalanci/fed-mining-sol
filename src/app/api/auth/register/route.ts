import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { signToken } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { email, password, companyName, contactPerson, phone } = await request.json();

    if (!email || !password || !companyName || !contactPerson) {
      return NextResponse.json(
        { error: 'Required fields missing: email, password, companyName, contactPerson' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'A customer account with this email already exists.' },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = bcrypt.hashSync(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        passwordHash,
        companyName,
        contactPerson,
        phone: phone || null,
        role: 'user' // Default role is user
      }
    });

    // Sign session token
    const token = signToken({
      id: user.id,
      email: user.email,
      role: user.role,
      companyName: user.companyName
    });

    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        companyName: user.companyName,
        contactPerson: user.contactPerson,
        role: user.role
      }
    });

    // Set cookie
    response.cookies.set('fed_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return response;
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
