import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

// PUT: Update quote status (Admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const authUser = verifyAuth(request);
    if (!authUser || authUser.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 403 });
    }

    const { status } = await request.json();

    if (!status || !['pending', 'contacted', 'completed'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be pending, contacted, or completed.' },
        { status: 400 }
      );
    }

    const quote = await prisma.quote.findUnique({
      where: { id: resolvedParams.id }
    });

    if (!quote) {
      return NextResponse.json({ error: 'Quote request not found' }, { status: 404 });
    }

    const updatedQuote = await prisma.quote.update({
      where: { id: resolvedParams.id },
      data: { status }
    });

    return NextResponse.json({ quote: updatedQuote });
  } catch (error) {
    console.error('Update quote error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// PATCH: Update quote status (alias for admin panel compatibility)
export const PATCH = PUT;

// DELETE: Delete a quote request (Admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const authUser = verifyAuth(request);
    if (!authUser || authUser.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 403 });
    }

    const quote = await prisma.quote.findUnique({
      where: { id: resolvedParams.id }
    });

    if (!quote) {
      return NextResponse.json({ error: 'Quote request not found' }, { status: 404 });
    }

    await prisma.quote.delete({
      where: { id: resolvedParams.id }
    });

    return NextResponse.json({ success: true, message: 'Quote request deleted successfully' });
  } catch (error) {
    console.error('Delete quote error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
