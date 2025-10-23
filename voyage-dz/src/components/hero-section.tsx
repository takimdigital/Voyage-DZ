"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function HeroSection() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query) {
      router.push(`/packages?search=${query}`);
    }
  };

  return (
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
              <form onSubmit={handleSearch} className="flex space-x-2">
                <Input
                  className="max-w-lg flex-1"
                  placeholder="Enter a destination"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <Button type="submit">Search</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
