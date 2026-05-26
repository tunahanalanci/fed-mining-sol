import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

// GET: Retrieve a single part details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const part = await prisma.part.findUnique({
      where: { id: resolvedParams.id }
    });

    if (!part) {
      return NextResponse.json({ error: 'Part not found' }, { status: 404 });
    }

    return NextResponse.json({ part });
  } catch (error) {
    console.error('Fetch part error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// PUT: Update part details (Admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const authUser = verifyAuth(request);
    if (!authUser || authUser.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { partNumber, name, brand, category, oemReference, compatibleDrifters, description } = await request.json();

    const part = await prisma.part.findUnique({
      where: { id: resolvedParams.id }
    });

    if (!part) {
      return NextResponse.json({ error: 'Part not found' }, { status: 404 });
    }

    const updatedPart = await prisma.part.update({
      where: { id: resolvedParams.id },
      data: {
        partNumber: partNumber ?? part.partNumber,
        name: name ?? part.name,
        brand: brand ?? part.brand,
        category: category ?? part.category,
        oemReference: oemReference !== undefined ? oemReference : part.oemReference,
        compatibleDrifters: compatibleDrifters ?? part.compatibleDrifters,
        description: description !== undefined ? description : part.description
      }
    });

    return NextResponse.json({ part: updatedPart });
  } catch (error) {
    console.error('Update part error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE: Delete a part (Admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const authUser = verifyAuth(request);
    if (!authUser || authUser.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const part = await prisma.part.findUnique({
      where: { id: resolvedParams.id }
    });

    if (!part) {
      return NextResponse.json({ error: 'Part not found' }, { status: 404 });
    }

    await prisma.part.delete({
      where: { id: resolvedParams.id }
    });

    return NextResponse.json({ success: true, message: 'Part deleted successfully' });
  } catch (error) {
    console.error('Delete part error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
