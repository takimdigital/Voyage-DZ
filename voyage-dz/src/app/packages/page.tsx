import { PackageCard } from "@/components/package-card";
import { db } from "@/lib/db";
import { Package, Prisma } from "@prisma/client";
import { FilterBar } from "@/components/filter-bar";
import { Pagination } from "@/components/pagination";
import { Suspense } from "react";
import { PackageCardSkeleton } from "@/components/package-card-skeleton";

const PACKAGES_PER_PAGE = 6;

interface PackagesPageProps {
  searchParams: {
    destination?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
    page?: string;
    search?: string;
    agencyId?: string;
  };
}

async function getPackages(searchParams: PackagesPageProps["searchParams"]) {
  const { destination, minPrice, maxPrice, sort, page = "1", search, agencyId } = searchParams;
  const [sortField, sortOrder] = sort?.split("-") || ["createdAt", "desc"];
  const currentPage = parseInt(page, 10);

  const where = {
    destination: destination ? { equals: destination } : undefined,
    agencyId: agencyId ? { equals: agencyId } : undefined,
    price: {
      gte: minPrice ? parseFloat(minPrice) : undefined,
      lte: maxPrice ? parseFloat(maxPrice) : undefined,
    },
    OR: search
      ? [
          { title: { contains: search, mode: Prisma.QueryMode.insensitive } },
          { destination: { contains: search, mode: Prisma.QueryMode.insensitive } },
          { description: { contains: search, mode: Prisma.QueryMode.insensitive } },
        ]
      : undefined,
  };

  const totalPackages = await db.package.count({ where });
  const totalPages = Math.ceil(totalPackages / PACKAGES_PER_PAGE);

  const packages: Package[] = await db.package.findMany({
    where,
    orderBy: {
      [sortField]: sortOrder,
    },
    skip: (currentPage - 1) * PACKAGES_PER_PAGE,
    take: PACKAGES_PER_PAGE,
  });

  return { packages, totalPages };
}

async function getDestinations() {
  const destinations = await db.package.findMany({
    select: { destination: true },
    distinct: ["destination"],
  });
  return destinations.map((d) => d.destination);
}

async function getAgencies() {
  const agencies = await db.agency.findMany({
    select: { id: true, name: true },
    orderBy: { name: 'asc' },
  });
  return agencies;
}

export default async function PackagesPage({ searchParams }: PackagesPageProps) {
  const destinations = await getDestinations();
  const agencies = await getAgencies();

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">
          Explore Travel Packages
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Find your next adventure from our curated list of travel packages.
        </p>
      </header>

      <FilterBar destinations={destinations} agencies={agencies} />

      <Suspense fallback={<PackageGridSkeleton />}>
        <PackagesGrid searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function PackagesGrid({ searchParams }: PackagesPageProps) {
  const { packages, totalPages } = await getPackages(searchParams);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.length > 0 ? (
          packages.map((pkg) => <PackageCard key={pkg.id} pkg={pkg} />)
        ) : (
          <p className="col-span-3 text-center">No packages found matching your criteria.</p>
        )}
      </div>
      <div className="mt-12">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}

function PackageGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(PACKAGES_PER_PAGE)].map((_, i) => (
        <PackageCardSkeleton key={i} />
      ))}
    </div>
  );
}
