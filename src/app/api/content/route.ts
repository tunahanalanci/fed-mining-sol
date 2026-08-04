import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

const contentFilePath = path.join(process.cwd(), 'src/data/siteContent.json');

async function isAdmin() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('fed_session')?.value;
  if (!sessionToken) return false;
  try {
    const payload = verifyToken(sessionToken);
    return payload && payload.role === 'admin';
  } catch {
    return false;
  }
}

export async function GET() {
  try {
    if (!fs.existsSync(contentFilePath)) {
      return NextResponse.json({ error: 'Content file not found.' }, { status: 404 });
    }
    const fileContent = fs.readFileSync(contentFilePath, 'utf8');
    return NextResponse.json(JSON.parse(fileContent));
  } catch (error: any) {
    console.error('Error reading content:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 403 });
    }
    
    const body = await request.json();
    
    // Write back to JSON file
    fs.writeFileSync(contentFilePath, JSON.stringify(body, null, 2), 'utf8');
    
    return NextResponse.json({ success: true, message: 'Content updated successfully.' });
  } catch (error: any) {
    console.error('Error writing content:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
