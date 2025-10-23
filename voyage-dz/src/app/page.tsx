import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import { Search, Phone, Plane } from "lucide-react";
import { PopularPackages } from "@/components/popular-packages";
import { PackageCardSkeleton } from "@/components/package-card-skeleton";
import { HeroSection } from "@/components/hero-section";
import { FeaturedDestinations } from "@/components/featured-destinations";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <HeroSection />
        <FeaturedDestinations />

        {/* Popular Packages Grid */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">
              Popular Packages
            </h2>
            <Suspense fallback={<PackageCardSkeletonGrid />}>
              <PopularPackages />
            </Suspense>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  How It Works
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Discover, contact, and travel in 3 simple steps.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-12 sm:grid-cols-3 sm:gap-16">
              <div className="grid gap-1 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                  <Search className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">1. Discover</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Browse through hundreds of travel packages from agencies all over Algeria.
                </p>
              </div>
              <div className="grid gap-1 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                  <Phone className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">2. Contact</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Contact the travel agency directly to book your trip and ask any questions.
                </p>
              </div>
              <div className="grid gap-1 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                  <Plane className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">3. Travel</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Enjoy your trip! Voyage DZ makes it easy to find your next adventure.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Agency Signup CTA */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Vous êtes une agence ? Publiez vos offres
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Join our platform and reach thousands of travelers.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <Link href="/register">
                <Button>Sign Up Now</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function PackageCardSkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <PackageCardSkeleton />
      <PackageCardSkeleton />
      <PackageCardSkeleton />
      <PackageCardSkeleton />
      <PackageCardSkeleton />
      <PackageCardSkeleton />
    </div>
  );
}
