import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const pkg = await db.package.findUnique({
      where: {
        id: parseInt(params.id, 10),
      },
      include: {
        agency: true,
      },
    });

    if (!pkg) {
      return new NextResponse('Package not found', { status: 404 });
    }

    return NextResponse.json(pkg);
  } catch (error) {
    console.error('[PACKAGE_GET]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
