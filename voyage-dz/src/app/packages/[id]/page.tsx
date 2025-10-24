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
import Link from "next/link";
import { Clock, Calendar, DollarSign, Phone, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
    return { title: "Package Not Found | Voyage DZ" };
  }

  const title = `${pkg.title} | Voyage DZ`;
  const description = pkg.description.substring(0, 160);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: pkg.imageUrls[0] || "/placeholder.svg", width: 1200, height: 630, alt: pkg.title }],
    },
  };
}

export default async function PackageDetailPage({ params }: { params: { id: string } }) {
  const pkg = await getPackage(params.id);

  if (!pkg) {
    notFound();
  }

  return (
    <div className="bg-white dark:bg-gray-950">
      <div className="container mx-auto py-12 px-4 md:px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold">{pkg.title}</h1>
          <p className="text-lg text-muted-foreground mt-2">{pkg.destination}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Carousel className="w-full mb-8">
              <CarouselContent>
                {pkg.imageUrls.map((url: string, index: number) => (
                  <CarouselItem key={index}>
                    <div className="relative h-96 w-full">
                      <Image src={url} alt={`${pkg.title} image ${index + 1}`} fill className="rounded-lg object-cover" />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>

            {/* Key Details */}
            <div className="flex flex-wrap gap-4 mb-8">
              <Badge variant="secondary" className="flex items-center gap-2 text-lg"><DollarSign className="h-5 w-5" /> ${pkg.price}</Badge>
              <Badge variant="secondary" className="flex items-center gap-2 text-lg"><Clock className="h-5 w-5" /> {pkg.duration}</Badge>
              {pkg.startDate && <Badge variant="secondary" className="flex items-center gap-2 text-lg"><Calendar className="h-5 w-5" /> {new Date(pkg.startDate).toLocaleDateString()}</Badge>}
            </div>

            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-4 prose dark:prose-invert max-w-none">
                <p>{pkg.description}</p>
              </TabsContent>
              <TabsContent value="itinerary" className="mt-4 prose dark:prose-invert max-w-none">
                <p>Itinerary details coming soon. Please contact the agency for more information.</p>
              </TabsContent>
            </Tabs>
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2">Share this trip:</h3>
              <SocialShareButtons title={pkg.title} />
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:sticky top-24 self-start">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Book With a Trusted Agency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative h-16 w-16">
                    <Image src={pkg.agency.logoUrl || "/placeholder.svg"} alt={`${pkg.agency.name} logo`} fill className="rounded-full object-cover"/>
                  </div>
                  <div>
                    <Link href={`/agency/${pkg.agency.id}`}>
                      <h3 className="text-xl font-semibold hover:underline">{pkg.agency.name}</h3>
                    </Link>
                    <p className="text-muted-foreground">{pkg.agency.city}</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <a href={`tel:${pkg.agency.phone}`} className="block">
                    <Button className="w-full flex items-center gap-2"><Phone className="h-5 w-5" /> Call Agency</Button>
                  </a>
                  <a href={`mailto:${pkg.agency.email}`} className="block">
                    <Button className="w-full flex items-center gap-2" variant="outline"><Mail className="h-5 w-5" /> Email Agency</Button>
                  </a>
                </div>
                <p className="text-xs text-center text-muted-foreground mt-4">
                  Contact the agency directly for booking and inquiries.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
