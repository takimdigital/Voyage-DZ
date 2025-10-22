import { AgencyCard } from "@/components/agency-card";
import { db } from "@/lib/db";
import { Agency } from "@prisma/client";

export default async function AgenciesPage() {
  const agencies: Agency[] = await db.agency.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">
          Explore Travel Agencies
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Discover the best travel agencies in Algeria.
        </p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {agencies.map((agency) => (
          <AgencyCard key={agency.id} agency={agency} />
        ))}
      </div>
    </div>
  );
}
