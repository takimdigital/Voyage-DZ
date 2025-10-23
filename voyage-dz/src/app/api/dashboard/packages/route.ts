import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { db } from '@/lib/db';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || session.user.role !== 'agency') {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, destination, description, price, duration, startDate, endDate, imageUrls } = body;

    if (!title || !destination || !description || !price || !duration) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const agency = await db.agency.findUnique({
      where: { userId: session.user.id },
    });

    if (!agency) {
      return new NextResponse('Agency not found for the current user', { status: 404 });
    }

    const newPackage = await db.package.create({
      data: {
        title,
        destination,
        description,
        price: parseFloat(price),
        duration,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        imageUrls: imageUrls || [],
        agency: {
          connect: { id: agency.id },
        },
      },
    });

    return NextResponse.json(newPackage);
  } catch (error) {
    console.error('[DASHBOARD_PACKAGES_POST]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
