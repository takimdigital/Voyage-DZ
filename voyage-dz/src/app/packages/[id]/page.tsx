import { db } from "@/lib/db";
import { Package, Agency } from "@prisma/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type PackageWithAgency = Package & { agency: Agency };

async function getPackage(id: number): Promise<PackageWithAgency | null> {
  const pkg = await db.package.findUnique({
    where: { id },
    include: { agency: true },
  });
  return pkg;
}

export default async function PackageDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const pkg = await getPackage(parseInt(params.id, 10));

  if (!pkg) {
    notFound();
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      {/* Image Gallery Placeholder */}
      <div className="relative h-96 w-full mb-8">
        <Image
          src={pkg.imageUrls[0] || "/placeholder.svg"}
          alt={pkg.title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-4">{pkg.title}</h1>
          <p className="text-lg text-muted-foreground mb-8">{pkg.destination}</p>

          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4">
              <p>{pkg.description}</p>
            </TabsContent>
            <TabsContent value="itinerary" className="mt-4">
              <p>Itinerary details coming soon.</p>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Agency Information</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-xl font-semibold">{pkg.agency.name}</h3>
              <p className="text-muted-foreground">{pkg.agency.city}</p>
              <p className="mt-4">{pkg.agency.phone}</p>
              <p>{pkg.agency.email}</p>
              <Button className="mt-4 w-full">Contact Agency</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
