"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

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
    <section className="relative w-full h-[60vh] md:h-[80vh]">
      <Image
        src="/placeholder.svg" // Replace with a high-quality, inspiring image of Algeria
        alt="Hero background image of an Algerian landscape"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 container px-4 md:px-6 h-full flex flex-col justify-center items-center text-center text-white">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
          Your Algerian Adventure Awaits
        </h1>
        <p className="max-w-[700px] text-lg md:text-xl mt-4">
          From the vibrant streets of Algiers to the timeless sands of the Sahara. Discover authentic travel experiences, curated by the best local agencies.
        </p>
        <div className="w-full max-w-md mt-6">
          <form onSubmit={handleSearch} className="flex space-x-2">
            <Input
              className="max-w-lg flex-1 text-black"
              placeholder="e.g., Oran, Sahara, Djanet"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button type="submit">Find My Trip</Button>
          </form>
        </div>
      </div>
    </section>
  );
}
