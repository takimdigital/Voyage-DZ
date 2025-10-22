import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const agencies = await db.agency.findMany({
      include: {
        packages: true,
      },
    });
    return NextResponse.json(agencies);
  } catch (error) {
    console.error('[AGENCIES_GET]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
