import { db } from "@/lib/db";
import { Agency, Package } from "@prisma/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PackageCard } from "@/components/package-card";
import { Button } from "@/components/ui/button";

type AgencyWithPackages = Agency & { packages: Package[] };

async function getAgency(id: string): Promise<AgencyWithPackages | null> {
  const agency = await db.agency.findUnique({
    where: { id },
    include: { packages: true },
  });
  return agency;
}

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const agency = await getAgency(params.id);

  if (!agency) {
    return {
      title: "Agency Not Found | Voyage DZ",
    };
  }

  const title = `${agency.name} - Travel Agency in ${agency.city} | Voyage DZ`;
  const description = agency.description?.substring(0, 160) || `Find the best travel packages from ${agency.name}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: agency.logoUrl || "/placeholder.svg",
          width: 800,
          height: 600,
          alt: agency.name,
        },
      ],
    },
  };
}


export default async function AgencyProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const agency = await getAgency(params.id);

  if (!agency) {
    notFound();
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="relative h-48 w-48 rounded-lg overflow-hidden mb-4">
            <Image
              src={agency.logoUrl || "/placeholder.svg"}
              alt={agency.name}
              fill
              className="object-cover"
            />
          </div>
          <h1 className="text-3xl font-bold">{agency.name}</h1>
          <p className="text-lg text-muted-foreground mt-2">{agency.city}</p>
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <a href={`tel:${agency.phone}`} className="block">
                <Button className="w-full">Call Agency</Button>
              </a>
              <a href={`mailto:${agency.email}`} className="block">
                <Button className="w-full" variant="outline">Email Agency</Button>
              </a>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
          <div className="prose lg:prose-xl mb-12">
            <p>{agency.description}</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-8">Packages from {agency.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {agency.packages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
