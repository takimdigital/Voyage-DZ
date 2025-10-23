import { db } from "@/lib/db";
import { Package, Agency } from "@prisma/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SocialShareButtons } from "@/components/social-share-buttons";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type PackageWithAgency = Package & { agency: Agency };

async function getPackage(id: string): Promise<PackageWithAgency | null> {
  const pkg = await db.package.findUnique({
    where: { id },
    include: { agency: true },
  });
  return pkg;
}

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pkg = await getPackage(params.id);

  if (!pkg) {
    return {
      title: "Package Not Found | Voyage DZ",
    };
  }

  const title = `${pkg.title} | Voyage DZ`;
  const description = pkg.description.substring(0, 160);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: pkg.imageUrls[0] || "/placeholder.svg",
          width: 1200,
          height: 630,
          alt: pkg.title,
        },
      ],
    },
  };
}

export default async function PackageDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const pkg = await getPackage(params.id);

  if (!pkg) {
    notFound();
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <Carousel className="w-full max-w-4xl mx-auto mb-8">
        <CarouselContent>
          {pkg.imageUrls.map((url, index) => (
            <CarouselItem key={index}>
              <div className="relative h-96 w-full">
                <Image
                  src={url}
                  alt={`${pkg.title} image ${index + 1}`}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-4">{pkg.title}</h1>
          <p className="text-lg text-muted-foreground mb-8">{pkg.destination}</p>

          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4 prose">
              <p>{pkg.description}</p>
            </TabsContent>
            <TabsContent value="itinerary" className="mt-4">
              <p>Itinerary details coming soon.</p>
            </TabsContent>
          </Tabs>
          <SocialShareButtons title={pkg.title} />
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Agency Information</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-xl font-semibold">{pkg.agency.name}</h3>
              <p className="text-muted-foreground">{pkg.agency.city}</p>
              <div className="mt-4 space-y-2">
                <a href={`tel:${pkg.agency.phone}`} className="block">
                  <Button className="w-full">Call Agency</Button>
                </a>
                <a href={`mailto:${pkg.agency.email}`} className="block">
                  <Button className="w-full" variant="outline">Email Agency</Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
