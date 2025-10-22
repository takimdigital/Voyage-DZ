import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface PackageCardProps {
  pkg: Package;
}

export function PackageCard({ pkg }: PackageCardProps) {
  return (
    <Link href={`/packages/${pkg.id}`}>
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <div className="relative h-48 w-full">
            <Image
              src={pkg.imageUrls[0] || "/placeholder.svg"}
              alt={pkg.title}
              fill
              className="rounded-t-lg object-cover"
            />
          </div>
        </CardHeader>
        <CardContent>
          <CardTitle className="text-lg font-semibold">{pkg.title}</CardTitle>
          <p className="text-sm text-muted-foreground">{pkg.destination}</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-lg font-bold">${pkg.price}</p>
          <p className="text-sm text-muted-foreground">{pkg.duration}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
