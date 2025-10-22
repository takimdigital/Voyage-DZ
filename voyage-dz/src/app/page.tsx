import { PackageCard } from "@/components/package-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/lib/db";
import { Package } from "@prisma/client";
import Link from "next/link";

export default async function Home() {
  const popularPackages: Package[] = await db.package.findMany({
    take: 6,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Découvrez les meilleures offres de voyage en Algérie
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Trouvez le voyage de vos rêves avec Voyage DZ.
                  </p>
                </div>
                <div className="w-full max-w-sm space-y-2">
                  <form className="flex space-x-2">
                    <Input
                      className="max-w-lg flex-1"
                      placeholder="Enter a destination"
                      type="text"
                    />
                    <Button type="submit">Search</Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Packages Grid */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">
              Popular Packages
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularPackages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                How It Works
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Discover, contact, and travel in 3 simple steps.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center space-y-2">
                  <div className="p-2 bg-gray-200 rounded-full">
                    <p>1. Discover</p>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="p-2 bg-gray-200 rounded-full">
                    <p>2. Contact</p>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="p-2 bg-gray-200 rounded-full">
                    <p>3. Travel</p>
                  </div>
                </div>
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
