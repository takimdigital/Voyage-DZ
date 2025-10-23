import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { db } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";

export async function FeaturedDestinations() {
  const destinations = await db.package.findMany({
    select: { destination: true, imageUrls: true },
    distinct: ["destination"],
    take: 5,
  });

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">
          Featured Destinations
        </h2>
        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {destinations.map((dest) => (
              <CarouselItem key={dest.destination} className="md:basis-1/2 lg:basis-1/3">
                <Link href={`/packages?destination=${dest.destination}`}>
                  <div className="relative h-64 w-full">
                    <Image
                      src={dest.imageUrls[0] || "/placeholder.svg"}
                      alt={dest.destination}
                      fill
                      className="rounded-lg object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <h3 className="text-white text-2xl font-bold">
                        {dest.destination}
                      </h3>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
