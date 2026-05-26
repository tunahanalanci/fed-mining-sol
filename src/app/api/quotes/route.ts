import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

// GET: Retrieve quotes (clients get their own, admins get all)
export async function GET(request: NextRequest) {
  try {
    const authUser = verifyAuth(request);
    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let quotes;
    if (authUser.role === 'admin') {
      quotes = await prisma.quote.findMany({
        include: {
          items: {
            include: { part: true }
          },
          user: {
            select: { companyName: true, contactPerson: true, email: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      });
    } else {
      quotes = await prisma.quote.findMany({
        where: { userId: authUser.id },
        include: {
          items: {
            include: { part: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      });
    }

    return NextResponse.json({ quotes });
  } catch (error) {
    console.error('Fetch quotes error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST: Submit a new quote request (supports logged-in users and guests)
export async function POST(request: NextRequest) {
  try {
    const authUser = verifyAuth(request);
    const body = await request.json();
    const { name, email, phone, message, items } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Required fields missing: name, email' },
        { status: 400 }
      );
    }

    const safeItems = Array.isArray(items) ? items : [];

    // Create quote inside transaction to ensure data integrity
    const quote = await prisma.$transaction(async (tx) => {
      // 1. Create quote header
      const newQuote = await tx.quote.create({
        data: {
          userId: authUser ? authUser.id : null,
          name,
          email: email.toLowerCase(),
          phone: phone || null,
          message: message || null,
          status: 'pending'
        }
      });

      // 2. Create quote items (if any)
      for (const item of safeItems) {
        if (!item.partId || !item.quantity || item.quantity <= 0) continue;
        await tx.quoteItem.create({
          data: {
            quoteId: newQuote.id,
            partId: item.partId,
            quantity: parseInt(item.quantity, 10)
          }
        });
      }

      return newQuote;
    });

    // Fetch the created quote with items to return to frontend
    const createdQuote = await prisma.quote.findUnique({
      where: { id: quote.id },
      include: {
        items: {
          include: { part: true }
        }
      }
    });

    return NextResponse.json({ quote: createdQuote }, { status: 201 });
  } catch (error: any) {
    console.error('Submit quote request error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
