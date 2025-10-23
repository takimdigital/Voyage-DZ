import { getServerSession } from 'next-auth';
import { db } from '@/lib/db';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { columns } from './columns';
import { DataTable } from './data-table';
import { Button } from '@/components/ui/button';
import { PackageModal } from '@/components/package-modal';

async function getPackagesForAgency(userId: string) {
  const agency = await db.agency.findUnique({
    where: { userId },
    include: {
      packages: {
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });
  return agency?.packages || [];
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || session.user.role !== 'agency') {
    redirect('/login');
  }

  const packages = await getPackagesForAgency(session.user.id);

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Package Management</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Here you can view, add, edit, and delete your travel packages.
          </p>
        </div>
        <PackageModal>
          <Button>Add New Package</Button>
        </PackageModal>
      </div>
      <DataTable columns={columns} data={packages} />
    </div>
  );
}
