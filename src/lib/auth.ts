import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'fed_mining_secret_key_12345_67890';

export interface AuthUser {
  id: string;
  email: string;
  role: string;
  companyName: string;
}

export function signToken(user: AuthUser): string {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      companyName: user.companyName,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyToken(token: string): AuthUser | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthUser;
  } catch (error) {
    return null;
  }
}

export function verifyAuth(request: NextRequest): AuthUser | null {
  const sessionCookie = request.cookies.get('fed_session');
  if (!sessionCookie) return null;
  return verifyToken(sessionCookie.value);
}
