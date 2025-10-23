import { PackageCard } from "@/components/package-card";
import { db } from "@/lib/db";
import { Package } from "@prisma/client";
import { FilterBar } from "@/components/filter-bar";

interface PackagesPageProps {
  searchParams: {
    destination?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
  };
}

async function getPackages(searchParams: PackagesPageProps["searchParams"]) {
  const { destination, minPrice, maxPrice, sort } = searchParams;
  const [sortField, sortOrder] = sort?.split("-") || ["createdAt", "desc"];

  const packages: Package[] = await db.package.findMany({
    where: {
      destination: destination ? { equals: destination } : undefined,
      price: {
        gte: minPrice ? parseFloat(minPrice) : undefined,
        lte: maxPrice ? parseFloat(maxPrice) : undefined,
      },
    },
    orderBy: {
      [sortField]: sortOrder,
    },
  });
  return packages;
}

async function getDestinations() {
  const destinations = await db.package.findMany({
    select: { destination: true },
    distinct: ["destination"],
  });
  return destinations.map((d) => d.destination);
}

export default async function PackagesPage({ searchParams }: PackagesPageProps) {
  const packages = await getPackages(searchParams);
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

      <FilterBar destinations={destinations} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.length > 0 ? (
          packages.map((pkg) => <PackageCard key={pkg.id} pkg={pkg} />)
        ) : (
          <p>No packages found matching your criteria.</p>
        )}
      </div>
    </div>
  );
}
