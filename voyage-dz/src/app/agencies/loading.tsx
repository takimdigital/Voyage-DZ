import { Skeleton } from "@/components/ui/skeleton";

function AgencyCardSkeleton() {
    return (
        <div className="bg-card p-4 rounded-lg">
            <Skeleton className="h-10 w-1/2 mb-2" />
            <Skeleton className="h-4 w-1/4 mb-4" />
            <Skeleton className="h-8 w-full" />
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                    <AgencyCardSkeleton key={i} />
                ))}
            </div>
        </div>
    )
}