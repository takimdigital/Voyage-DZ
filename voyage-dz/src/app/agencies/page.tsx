import { AgencyCard } from "@/components/agency-card";
import { db } from "@/lib/db";
import { Agency } from "@prisma/client";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Browse Travel Agencies | Voyage DZ',
  description: 'Discover our network of trusted and certified local travel agencies across Algeria. Find the perfect partner for your next adventure.',
};

export default async function AgenciesPage() {
  const agencies: Agency[] = await db.agency.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Our Trusted Partner Agencies
        </h1>
        <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
          We partner with the best local agencies to bring you authentic and unforgettable travel experiences.
        </p>
      </header>

      {agencies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {agencies.map((agency) => (
            <AgencyCard key={agency.id} agency={agency} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold">No Agencies Found</h2>
          <p className="text-muted-foreground mt-2">
            We are currently building our network of partner agencies. Please check back soon!
          </p>
        </div>
      )}
    </div>
  );
}
