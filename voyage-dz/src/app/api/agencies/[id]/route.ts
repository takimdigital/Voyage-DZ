import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const agency = await db.agency.findUnique({
      where: {
        id: parseInt(params.id, 10),
      },
      include: {
        packages: true,
      },
    });

    if (!agency) {
      return new NextResponse('Agency not found', { status: 404 });
    }

    return NextResponse.json(agency);
  } catch (error) {
    console.error('[AGENCY_GET]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
