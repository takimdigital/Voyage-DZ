import { db } from "@/lib/db";
import { Agency, Package } from "@prisma/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PackageCard } from "@/components/package-card";

type AgencyWithPackages = Agency & { packages: Package[] };

async function getAgency(id: number): Promise<AgencyWithPackages | null> {
  const agency = await db.agency.findUnique({
    where: { id },
    include: { packages: true },
  });
  return agency;
}

export default async function AgencyProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const agency = await getAgency(parseInt(params.id, 10));

  if (!agency) {
    notFound();
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      {/* Agency Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
        <div className="relative h-48 w-48 rounded-lg overflow-hidden">
          <Image
            src={agency.logoUrl || "/placeholder.svg"}
            alt={agency.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold">{agency.name}</h1>
          <p className="text-lg text-muted-foreground mt-2">{agency.city}</p>
          <p className="mt-4">{agency.description}</p>
        </div>
      </div>

      {/* Contact Info */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Phone:</strong> {agency.phone}
          </p>
          <p>
            <strong>Email:</strong> {agency.email}
          </p>
        </CardContent>
      </Card>

      {/* Packages */}
      <div>
        <h2 className="text-3xl font-bold mb-8">Packages from {agency.name}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {agency.packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </div>
    </div>
  );
}
