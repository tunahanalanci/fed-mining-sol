import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ success: true });
  
  // Clear the session cookie by setting maxAge to 0
  response.cookies.set('fed_session', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0
  });

  return response;
}
