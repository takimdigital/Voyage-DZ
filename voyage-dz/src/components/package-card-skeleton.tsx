import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PackageCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-48 w-full" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-4" />
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );
}
