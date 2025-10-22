import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Agency } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface AgencyCardProps {
  agency: Agency;
}

export function AgencyCard({ agency }: AgencyCardProps) {
  return (
    <Link href={`/agency/${agency.id}`}>
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <div className="relative h-48 w-full">
            <Image
              src={agency.logoUrl || "/placeholder.svg"}
              alt={agency.name}
              fill
              className="rounded-t-lg object-cover"
            />
          </div>
        </CardHeader>
        <CardContent>
          <CardTitle className="text-lg font-semibold">{agency.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{agency.city}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
