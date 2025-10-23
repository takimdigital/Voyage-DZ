import { PackageCard } from "@/components/package-card";
import { db } from "@/lib/db";
import { Package } from "@prisma/client";

export async function PopularPackages() {
  const popularPackages: Package[] = await db.package.findMany({
    take: 6,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {popularPackages.map((pkg) => (
        <PackageCard key={pkg.id} pkg={pkg} />
      ))}
    </div>
  );
}
