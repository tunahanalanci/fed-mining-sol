import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

// GET: Retrieve registered drifters for the logged-in client
export async function GET(request: NextRequest) {
  try {
    const authUser = verifyAuth(request);
    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const drifters = await prisma.customerDrifter.findMany({
      where: { userId: authUser.id },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ drifters });
  } catch (error) {
    console.error('Fetch customer drifters error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST: Register a new drifter for the logged-in client
export async function POST(request: NextRequest) {
  try {
    const authUser = verifyAuth(request);
    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { drifterModel, serialNumber, currentHours, averageWeeklyHours } = await request.json();

    if (!drifterModel || !serialNumber || currentHours === undefined || averageWeeklyHours === undefined) {
      return NextResponse.json(
        { error: 'Required fields missing: drifterModel, serialNumber, currentHours, averageWeeklyHours' },
        { status: 400 }
      );
    }

    const newDrifter = await prisma.customerDrifter.create({
      data: {
        userId: authUser.id,
        drifterModel,
        serialNumber,
        currentHours: parseFloat(currentHours),
        averageWeeklyHours: parseFloat(averageWeeklyHours),
        lastOverhaulHours: 0.0, // Initial state, not overhauled yet
        lastUpdatedAt: new Date()
      }
    });

    return NextResponse.json({ drifter: newDrifter }, { status: 201 });
  } catch (error) {
    console.error('Register customer drifter error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
