import { db } from "@/lib/db";
import { Agency, Package } from "@prisma/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { PackageCard } from "@/components/package-card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin } from "lucide-react";

type AgencyWithPackages = Agency & { packages: Package[] };

async function getAgency(id: string): Promise<AgencyWithPackages | null> {
  const agency = await db.agency.findUnique({
    where: { id },
    include: { packages: { orderBy: { createdAt: 'desc' } } },
  });
  return agency;
}

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const agency = await getAgency(params.id);

  if (!agency) {
    return { title: "Agency Not Found | Voyage DZ" };
  }

  const title = `${agency.name} - Travel Agency in ${agency.city} | Voyage DZ`;
  const description = agency.description?.substring(0, 160) || `Find the best travel packages from ${agency.name}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: agency.logoUrl || "/placeholder.svg", width: 800, height: 600, alt: agency.name }],
    },
  };
}


export default async function AgencyProfilePage({ params }: { params: { id: string } }) {
  const agency = await getAgency(params.id);

  if (!agency) {
    notFound();
  }

  return (
    <div className="bg-white dark:bg-gray-950">
      {/* Banner and Header */}
      <section className="relative h-64 w-full">
        <Image
          src="/placeholder.svg" // Agencies should be able to upload a cover photo
          alt={`${agency.name} cover photo`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </section>

      <div className="container mx-auto px-4 md:px-6 -mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar (Contact Info) */}
          <div className="lg:col-span-1">
            <div className="bg-card dark:bg-gray-900 p-6 rounded-lg shadow-lg relative">
              <div className="relative h-32 w-32 mx-auto -mt-16 mb-4 rounded-full overflow-hidden border-4 border-white dark:border-gray-900">
                <Image
                  src={agency.logoUrl || "/placeholder.svg"}
                  alt={agency.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-center">
                <h1 className="text-3xl font-bold">{agency.name}</h1>
                <p className="text-lg text-muted-foreground mt-1 flex items-center justify-center gap-2"><MapPin className="h-5 w-5"/>{agency.city}</p>
              </div>
              <div className="mt-6 space-y-2">
                <a href={`tel:${agency.phone}`} className="block">
                  <Button className="w-full flex items-center gap-2"><Phone className="h-5 w-5" /> Call Agency</Button>
                </a>
                <a href={`mailto:${agency.email}`} className="block">
                  <Button className="w-full flex items-center gap-2" variant="outline"><Mail className="h-5 w-5" /> Email Agency</Button>
                </a>
              </div>
            </div>
          </div>

          {/* Right Content (About & Packages) */}
          <div className="lg:col-span-2">
            <div className="bg-card dark:bg-gray-900 p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">About {agency.name}</h2>
              <div className="prose dark:prose-invert max-w-none mb-12">
                <p>{agency.description || "No description provided."}</p>
              </div>

              <h2 className="text-2xl font-bold mb-8">Packages from this Agency</h2>
              {agency.packages.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {agency.packages.map((pkg: Package) => (
                    <PackageCard key={pkg.id} pkg={pkg} />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">This agency has not listed any packages yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
