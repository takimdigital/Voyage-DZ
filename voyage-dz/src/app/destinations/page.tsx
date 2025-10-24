import { db } from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Explore Destinations in Algeria | Voyage DZ',
  description: 'Discover the most beautiful and exciting travel destinations across Algeria. From the Mediterranean coast to the Sahara desert, find your next adventure.',
};

export default async function DestinationsPage() {
  const destinations = await db.package.findMany({
    select: { destination: true, imageUrls: true },
    distinct: ["destination"],
  });

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Explore Algerian Destinations</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Discover the diverse landscapes and rich culture of Algeria.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations.map((dest) => (
          <Link key={dest.destination} href={`/packages?destination=${dest.destination}`}>
            <div className="group block">
              <div className="relative h-80 w-full mb-4">
                <Image
                  src={dest.imageUrls[0] || "/placeholder.svg"}
                  alt={dest.destination}
                  fill
                  className="rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h2 className="text-white text-3xl font-bold">
                    {dest.destination}
                  </h2>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
