import { PackageCardSkeleton } from "@/components/package-card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

function FilterBarSkeleton() {
    return (
      <div className="bg-card p-4 rounded-lg mb-8 flex flex-col md:flex-row items-center gap-6">
        <Skeleton className="h-10 w-full md:w-auto md:flex-1" />
        <Skeleton className="h-10 md:w-[200px]" />
        <Skeleton className="h-10 w-full md:w-[300px]" />
        <Skeleton className="h-10 md:w-[180px]" />
        <Skeleton className="h-10 w-24" />
      </div>
    );
  }

function PackageGridSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
            <PackageCardSkeleton key={i} />
        ))}
        </div>
    );
}

export default function Loading() {
    return (
        <div className="container mx-auto py-12 px-4 md:px-6">
            <header className="mb-8">
                <Skeleton className="h-10 w-1/2" />
                <Skeleton className="h-4 w-3/4 mt-2" />
            </header>
            <FilterBarSkeleton />
            <PackageGridSkeleton />
        </div>
    )
}