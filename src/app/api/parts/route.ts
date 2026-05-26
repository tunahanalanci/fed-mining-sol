import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

// GET: Fetch list of parts with search and filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q') || '';
    const brand = searchParams.get('brand') || '';
    const category = searchParams.get('category') || '';
    const compatibility = searchParams.get('compatibility') || '';
    const sort = searchParams.get('sort') || ''; // 'asc' | 'desc'
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '12', 10);

    const skip = (page - 1) * limit;

    // Build Prisma query condition
    const where: any = {};

    // Filter by Brand
    if (brand && brand !== 'All') {
      where.brand = brand;
    }

    // Filter by Category
    if (category && category !== 'All') {
      where.category = category;
    }

    // Filter by Drifter Compatibility
    if (compatibility && compatibility !== 'All') {
      where.compatibleDrifters = {
        contains: compatibility
      };
    }

    // Full text search query
    if (q) {
      where.OR = [
        { name: { contains: q } },
        { partNumber: { contains: q } },
        { oemReference: { contains: q } },
        { category: { contains: q } },
        { compatibleDrifters: { contains: q } }
      ];
    }

    // Order condition
    let orderBy: any = { createdAt: 'desc' };
    if (sort === 'name-asc') orderBy = { name: 'asc' };
    if (sort === 'name-desc') orderBy = { name: 'desc' };
    if (sort === 'partNumber-asc') orderBy = { partNumber: 'asc' };

    // Fetch in parallel
    const [parts, totalCount] = await Promise.all([
      prisma.part.findMany({
        where,
        orderBy,
        skip,
        take: limit
      }),
      prisma.part.count({ where })
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      parts,
      pagination: {
        totalCount,
        page,
        limit,
        totalPages
      }
    });
  } catch (error) {
    console.error('Parts fetch error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST: Add new part (Admin only)
export async function POST(request: NextRequest) {
  try {
    const authUser = verifyAuth(request);
    if (!authUser || authUser.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 403 });
    }

    const { partNumber, name, brand, category, oemReference, compatibleDrifters, description } = await request.json();

    if (!partNumber || !name || !brand || !category || !compatibleDrifters) {
      return NextResponse.json(
        { error: 'Required fields missing: partNumber, name, brand, category, compatibleDrifters' },
        { status: 400 }
      );
    }

    // Check unique partNumber
    const existingPart = await prisma.part.findUnique({
      where: { partNumber }
    });

    if (existingPart) {
      return NextResponse.json({ error: 'A part with this Part Number already exists.' }, { status: 409 });
    }

    const part = await prisma.part.create({
      data: {
        partNumber,
        name,
        brand,
        category,
        oemReference: oemReference || null,
        compatibleDrifters,
        description: description || null,
        imageUrl: '/images/placeholder-part.png' // Default placeholder
      }
    });

    return NextResponse.json({ part }, { status: 201 });
  } catch (error) {
    console.error('Part creation error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
