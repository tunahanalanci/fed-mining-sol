import { PrismaClient } from '../generated/client/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

declare global {
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

const dbUrl = process.env.DATABASE_URL || 'file:./dev.db';

if (process.env.NODE_ENV === 'production') {
  const adapter = new PrismaBetterSqlite3({ url: dbUrl });
  prisma = new PrismaClient({ adapter });
} else {
  if (!global.prisma) {
    const adapter = new PrismaBetterSqlite3({ url: dbUrl });
    global.prisma = new PrismaClient({ adapter });
  }
  prisma = global.prisma;
}

export { prisma };
