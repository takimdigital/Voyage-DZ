import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import { Search, Phone, Plane, Star, Shield, Heart } from "lucide-react";
import { PopularPackages } from "@/components/popular-packages";
import { PackageCardSkeleton } from "@/components/package-card-skeleton";
import { HeroSection } from "@/components/hero-section";
import { FeaturedDestinations } from "@/components/featured-destinations";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />

      {/* Why Choose Us Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-5xl mb-12">
            Why Book Through Voyage DZ?
          </h2>
          <div className="mx-auto grid max-w-5xl items-start gap-12 sm:grid-cols-3 sm:gap-16">
            <div className="grid gap-1 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">Authentic Local Experiences</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Connect directly with local agencies to find unique trips you won&apos;t find anywhere else.
              </p>
            </div>
            <div className="grid gap-1 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">Trusted & Vetted Agencies</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                We partner with reputable, certified travel agencies to ensure your peace of mind.
              </p>
            </div>
            <div className="grid gap-1 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                <Star className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">Simplified Discovery</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Easily compare prices, itineraries, and reviews all in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FeaturedDestinations />

      {/* Popular Packages Grid */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">
            Trending Adventures
          </h2>
          <Suspense fallback={<PackageCardSkeletonGrid />}>
            <PopularPackages />
          </Suspense>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
            What Our Travelers Say
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 border rounded-lg">
              <div className="flex items-center gap-4 mb-4">
                <Avatar><AvatarImage src="/placeholder-user.jpg" /><AvatarFallback>FS</AvatarFallback></Avatar>
                <div>
                  <p className="font-semibold">Fatima S.</p>
                  <div className="flex text-primary"><Star /><Star /><Star /><Star /><Star /></div>
                </div>
              </div>
              <p className="text-gray-600">&quot;Booking through Voyage DZ was seamless. I found an amazing Sahara tour that I couldn&apos;t find anywhere else. Highly recommended!&quot;</p>
            </div>
            <div className="p-6 border rounded-lg">
              <div className="flex items-center gap-4 mb-4">
                <Avatar><AvatarImage src="/placeholder-user.jpg" /><AvatarFallback>AK</AvatarFallback></Avatar>
                <div>
                  <p className="font-semibold">Ahmed K.</p>
                  <div className="flex text-primary"><Star /><Star /><Star /><Star /><Star /></div>
                </div>
              </div>
              <p className="text-gray-600">&quot;A fantastic platform for discovering local Algerian travel agencies. The direct contact is a huge plus.&quot;</p>
            </div>
            <div className="p-6 border rounded-lg">
              <div className="flex items-center gap-4 mb-4">
                <Avatar><AvatarImage src="/placeholder-user.jpg" /><AvatarFallback>LN</AvatarFallback></Avatar>
                <div>
                  <p className="font-semibold">Leila N.</p>
                  <div className="flex text-primary"><Star /><Star /><Star /><Star /><Star /></div>
                </div>
              </div>
              <p className="text-gray-600">&quot;I love how easy it is to compare different trips. The website is beautiful and user-friendly.&quot;</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
            Your Journey in 3 Simple Steps
          </h2>
          <div className="mx-auto grid max-w-5xl items-start gap-12 sm:grid-cols-3 sm:gap-16">
              <div className="grid gap-1 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                  <Search className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">1. Explore</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Browse hundreds of curated travel packages from the best local agencies.
                </p>
              </div>
              <div className="grid gap-1 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                  <Phone className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">2. Connect</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Contact agencies directly to customize your trip and get the best deal. No middlemen.
                </p>
              </div>
              <div className="grid gap-1 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                  <Plane className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">3. Adventure</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Book your trip and get ready for an unforgettable Algerian experience.
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
              Are you a Travel Agency?
            </h2>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Showcase your offers to thousands of travelers across the country. Join our network of trusted partners.
            </p>
          </div>
          <div className="mx-auto w-full max-w-sm space-y-2">
            <Link href="/register">
              <Button>Join Now</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function PackageCardSkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => <PackageCardSkeleton key={i} />)}
    </div>
  );
}
