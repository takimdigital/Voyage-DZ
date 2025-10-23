import { PackageCard } from "@/components/package-card";
import { db } from "@/lib/db";
import { Package } from "@prisma/client";
import { FilterBar } from "@/components/filter-bar";
import { Pagination } from "@/components/pagination";
import { Suspense } from "react";
import { PackageCardSkeleton } from "@/components/package-card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

const PACKAGES_PER_PAGE = 6;

interface PackagesPageProps {
  searchParams: {
    destination?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
    page?: string;
  };
}

async function getPackages(searchParams: PackagesPageProps["searchParams"]) {
  const { destination, minPrice, maxPrice, sort, page = "1" } = searchParams;
  const [sortField, sortOrder] = sort?.split("-") || ["createdAt", "desc"];
  const currentPage = parseInt(page, 10);

  const where = {
    destination: destination ? { equals: destination } : undefined,
    price: {
      gte: minPrice ? parseFloat(minPrice) : undefined,
      lte: maxPrice ? parseFloat(maxPrice) : undefined,
    },
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

export default async function PackagesPage({ searchParams }: PackagesPageProps) {
  const destinations = await getDestinations();

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

      <Suspense fallback={<FilterBarSkeleton />}>
        <FilterBar destinations={destinations} />
      </Suspense>

      <Suspense fallback={<PackageGridSkeleton />}>
        <PackagesGrid searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

function FilterBarSkeleton() {
  return (
    <div className="bg-card p-4 rounded-lg mb-8 flex flex-col md:flex-row items-center gap-6">
      <Skeleton className="h-10 md:w-[200px]" />
      <Skeleton className="h-10 w-full md:w-[300px]" />
      <Skeleton className="h-10 md:w-[180px]" />
      <Skeleton className="h-10 w-24" />
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
