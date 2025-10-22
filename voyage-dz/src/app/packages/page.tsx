import { PackageCard } from "@/components/package-card";
import { db } from "@/lib/db";
import { Package } from "@prisma/client";

export default async function PackagesPage() {
  const packages: Package[] = await db.package.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>
    </div>
  );
}
