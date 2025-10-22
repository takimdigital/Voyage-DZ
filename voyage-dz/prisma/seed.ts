import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear the database
  await prisma.package.deleteMany({});
  await prisma.agency.deleteMany({});
  await prisma.user.deleteMany({});

  // Create Agencies
  const agency1 = await prisma.agency.create({
    data: {
      name: 'Sahara Adventures',
      description: 'Explore the vast beauty of the Algerian Sahara.',
      phone: '123-456-7890',
      email: 'contact@sahara-adventures.com',
      city: 'Djanet',
      logoUrl: 'https://example.com/logo1.png',
    },
  });

  const agency2 = await prisma.agency.create({
    data: {
      name: 'Mediterranean Tours',
      description: 'Discover the stunning coastline of Algeria.',
      phone: '098-765-4321',
      email: 'info@med-tours.com',
      city: 'Algiers',
      logoUrl: 'https://example.com/logo2.png',
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

  // Create Users (for agency dashboard access)
  await prisma.user.create({
    data: {
      email: 'agency1@example.com',
      password: 'password123', // In a real app, this would be hashed
      role: 'agency',
    },
  });

  await prisma.user.create({
    data: {
      email: 'agency2@example.com',
      password: 'password456', // In a real app, this would be hashed
      role: 'agency',
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
