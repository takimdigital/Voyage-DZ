import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const packages = await db.package.findMany({
      include: {
        agency: true,
      },
    });
    return NextResponse.json(packages);
  } catch (error) {
    console.error('[PACKAGES_GET]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
