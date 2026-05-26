import { PrismaClient } from '../src/generated/client/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import bcrypt from 'bcryptjs';

async function main() {
  console.log('Initializing database connection...');
  const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL || 'file:./dev.db' });
  const prisma = new PrismaClient({ adapter });

  console.log('Cleaning up existing database records...');
  await prisma.quoteItem.deleteMany({});
  await prisma.quote.deleteMany({});
  await prisma.customerDrifter.deleteMany({});
  await prisma.part.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('Seeding Users...');
  const adminPasswordHash = bcrypt.hashSync('admin123', 10);
  const customerPasswordHash = bcrypt.hashSync('customer123', 10);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@fedmining.com',
      passwordHash: adminPasswordHash,
      companyName: 'FED Mining Solutions',
      contactPerson: 'Admin User',
      phone: '+90 506 120 87 06',
      role: 'admin'
    }
  });

  const customer = await prisma.user.create({
    data: {
      email: 'customer@miningco.com',
      passwordHash: customerPasswordHash,
      companyName: 'Denizli Madencilik A.Ş.',
      contactPerson: 'Ahmet Yılmaz',
      phone: '+90 532 999 88 77',
      role: 'user'
    }
  });

  console.log('Seeding Parts Catalog (100+ items)...');

  const categories = [
    { name: 'Piston', tags: ['Piston', 'Strike Piston', 'Hammer Piston'] },
    { name: 'Seal Kit', tags: ['Seal Kit', 'Shank Seal Kit', 'Front Seal Kit', 'Rear Seal Kit'] },
    { name: 'Bushing', tags: ['Chuck Bushing', 'Rotation Bushing', 'Front Bushing', 'Guide Sleeve'] },
    { name: 'Valve', tags: ['Distributor Valve', 'Flushing Valve', 'Regulating Valve', 'Control Valve'] },
    { name: 'Accumulator', tags: ['HP Accumulator', 'LP Accumulator', 'Diaphragm', 'Accumulator Cover'] },
    { name: 'Shank Adapter', tags: ['Shank Adapter T38', 'Shank Adapter T45', 'Shank Adapter T51'] },
    { name: 'Gear & Shaft', tags: ['Rotation Gear', 'Driver Gear', 'Pinion Shaft', 'Splined Shaft'] },
    { name: 'Hardware', tags: ['Side Bolt', 'Tension Bar', 'Flushing Tube', 'Mating Piece', 'Housing Bolt'] }
  ];

  const sandvikDrifters = ['HL500', 'HL600', 'HL700', 'HL800', 'HL1000', 'HL1500', 'HLX5', 'RD520', 'RD525', 'RD314'];
  const epirocDrifters = ['COP1132', 'COP1238', 'COP1638', 'COP1838', 'COP1840', 'COP2150', 'COP2550', 'COP2160', 'COP2560', 'MD20', 'COP3060', 'COP4050'];

  const parts = [];

  // Generate Sandvik Parts
  let sandvikIndex = 1;
  for (const cat of categories) {
    for (const tag of cat.tags) {
      const variations = [
        { suffix: 'Standard', drifters: [sandvikDrifters[6], sandvikDrifters[2]] },
        { suffix: 'Heavy Duty', drifters: [sandvikDrifters[4], sandvikDrifters[5]] },
        { suffix: 'Compact', drifters: [sandvikDrifters[9], sandvikDrifters[7]] }
      ];

      for (const [vIdx, variation] of variations.entries()) {
        const partNum = `550-${Math.floor(100 + sandvikIndex * 3.7)}-${Math.floor(10 + vIdx * 9)}`;
        const oemNum = `SAND-${154000 + sandvikIndex * 17 + vIdx}`;
        parts.push({
          partNumber: partNum,
          name: `${tag} - ${variation.suffix}`,
          brand: 'Sandvik',
          category: cat.name,
          oemReference: oemNum,
          compatibleDrifters: variation.drifters.join(', '),
          description: `High-quality compatible ${tag.toLowerCase()} for Sandvik drifters. Induction hardened for durability and 400-hour operational life.`,
          imageUrl: `/images/placeholder-part.png`
        });
        sandvikIndex++;
      }
    }
  }

  // Generate Epiroc Parts
  let epirocIndex = 1;
  for (const cat of categories) {
    for (const tag of cat.tags) {
      const variations = [
        { suffix: 'Type A', drifters: [epirocDrifters[3], epirocDrifters[4]] },
        { suffix: 'Type B', drifters: [epirocDrifters[7], epirocDrifters[8]] },
        { suffix: 'Type C', drifters: [epirocDrifters[0], epirocDrifters[1]] }
      ];

      for (const [vIdx, variation] of variations.entries()) {
        const partNum = `3115-${Math.floor(2000 + epirocIndex * 4.3)}-${Math.floor(10 + vIdx * 13)}`;
        const oemNum = `EPI-${831000 + epirocIndex * 23 + vIdx}`;
        parts.push({
          partNumber: partNum,
          name: `${tag} - ${variation.suffix}`,
          brand: 'Epiroc',
          category: cat.name,
          oemReference: oemNum,
          compatibleDrifters: variation.drifters.join(', '),
          description: `High-durability compatible ${tag.toLowerCase()} for Epiroc COP series rock drills. Tested with original test rigs, 400-hour maintenance cycle.`,
          imageUrl: `/images/placeholder-part.png`
        });
        epirocIndex++;
      }
    }
  }

  console.log(`Total generated parts: ${parts.length}`);

  for (const part of parts) {
    await prisma.part.create({
      data: part
    });
  }

  console.log('Seeding Customer Active Drifters for Ahmet Yılmaz...');
  await prisma.customerDrifter.create({
    data: {
      userId: customer.id,
      drifterModel: 'COP1838',
      serialNumber: 'EP-1838-2024-99',
      currentHours: 382.5,
      averageWeeklyHours: 42.0,
      lastOverhaulHours: 0.0,
      lastUpdatedAt: new Date()
    }
  });

  await prisma.customerDrifter.create({
    data: {
      userId: customer.id,
      drifterModel: 'HLX5',
      serialNumber: 'SD-HLX5-2025-104',
      currentHours: 120.0,
      averageWeeklyHours: 35.0,
      lastOverhaulHours: 0.0,
      lastUpdatedAt: new Date()
    }
  });

  console.log('Seeding Quote Requests...');
  const sampleQuote = await prisma.quote.create({
    data: {
      userId: customer.id,
      name: 'Ahmet Yılmaz',
      email: 'customer@miningco.com',
      phone: '+90 532 999 88 77',
      message: 'Need urgent quote for HLX5 Seal Kits and COP1838 Pistons.',
      status: 'pending'
    }
  });

  const dbParts = await prisma.part.findMany({ take: 2 });
  if (dbParts.length >= 2) {
    await prisma.quoteItem.create({
      data: {
        quoteId: sampleQuote.id,
        partId: dbParts[0].id,
        quantity: 3
      }
    });
    await prisma.quoteItem.create({
      data: {
        quoteId: sampleQuote.id,
        partId: dbParts[1].id,
        quantity: 2
      }
    });
  }

  console.log('Database seeding completed successfully!');
  await prisma.$disconnect();
}

main()
  .catch((e) => {
    console.error('Error during database seeding:', e);
    process.exit(1);
  });
