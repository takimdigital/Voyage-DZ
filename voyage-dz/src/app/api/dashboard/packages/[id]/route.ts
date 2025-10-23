import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { db } from '@/lib/db';
import { authOptions } from '@/lib/auth';

// PUT handler for updating a package
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || session.user.role !== 'agency') {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, destination, description, price, duration, startDate, endDate, imageUrls } = body;
    const { id } = params;

    const agency = await db.agency.findUnique({
      where: { userId: session.user.id },
    });

    if (!agency) {
      return new NextResponse('Agency not found', { status: 404 });
    }

    const packageToUpdate = await db.package.findUnique({
      where: { id },
    });

    if (!packageToUpdate || packageToUpdate.agencyId !== agency.id) {
      return new NextResponse('Package not found or you do not have permission to edit it', { status: 403 });
    }

    const updatedPackage = await db.package.update({
      where: { id },
      data: {
        title,
        destination,
        description,
        price: price ? parseFloat(price) : undefined,
        duration,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        imageUrls,
      },
    });

    return NextResponse.json(updatedPackage);
  } catch (error) {
    console.error('[DASHBOARD_PACKAGE_PUT]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// DELETE handler for deleting a package
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || session.user.role !== 'agency') {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const { id } = params;

    const agency = await db.agency.findUnique({
      where: { userId: session.user.id },
    });

    if (!agency) {
      return new NextResponse('Agency not found', { status: 404 });
    }

    const packageToDelete = await db.package.findUnique({
      where: { id },
    });

    if (!packageToDelete || packageToDelete.agencyId !== agency.id) {
      return new NextResponse('Package not found or you do not have permission to delete it', { status: 403 });
    }

    await db.package.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 }); // No Content
  } catch (error) {
    console.error('[DASHBOARD_PACKAGE_DELETE]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
