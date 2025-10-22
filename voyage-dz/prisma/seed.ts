import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Clear the database
  await prisma.package.deleteMany({});
  await prisma.agency.deleteMany({});
  await prisma.user.deleteMany({});

  // Create Users (for agency dashboard access)
  const hashedPassword1 = await bcrypt.hash('password123', 12);
  const user1 = await prisma.user.create({
    data: {
      email: 'agency1@example.com',
      password: hashedPassword1,
      role: 'agency',
    },
  });

  const hashedPassword2 = await bcrypt.hash('password456', 12);
  const user2 = await prisma.user.create({
    data: {
      email: 'agency2@example.com',
      password: hashedPassword2,
      role: 'agency',
    },
  });

  // Create Agencies
  const agency1 = await prisma.agency.create({
    data: {
      name: 'Sahara Adventures',
      description: 'Explore the vast beauty of the Algerian Sahara.',
      phone: '123-456-7890',
      email: 'agency1@example.com',
      city: 'Djanet',
      logoUrl: 'https://example.com/logo1.png',
      userId: user1.id,
    },
  });

  const agency2 = await prisma.agency.create({
    data: {
      name: 'Mediterranean Tours',
      description: 'Discover the stunning coastline of Algeria.',
      phone: '098-765-4321',
      email: 'agency2@example.com',
      city: 'Algiers',
      logoUrl: 'https://example.com/logo2.png',
      userId: user2.id,
    },
  });

  // Create Packages
  await prisma.package.create({
    data: {
      title: 'Tassili n\'Ajjer Expedition',
      destination: 'Djanet',
      description: 'A 10-day 4x4 expedition through the stunning landscapes of Tassili n\'Ajjer National Park.',
      price: 1200.0,
      duration: '10 Days',
      startDate: new Date('2024-11-01'),
      endDate: new Date('2024-11-10'),
      imageUrls: ['https://example.com/tassili1.jpg', 'https://example.com/tassili2.jpg'],
      agencyId: agency1.id,
    },
  });

  await prisma.package.create({
    data: {
      title: 'Algiers City Break',
      destination: 'Algiers',
      description: 'A 3-day tour of the historic Casbah and modern Algiers.',
      price: 400.0,
      duration: '3 Days',
      startDate: new Date('2024-10-15'),
      endDate: new Date('2024-10-18'),
      imageUrls: ['https://example.com/algiers1.jpg', 'https://example.com/algiers2.jpg'],
      agencyId: agency2.id,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
