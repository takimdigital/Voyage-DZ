"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function FilterBar({ destinations }: { destinations: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleFilterChange = (name: string, value: string) => {
    router.push(pathname + "?" + createQueryString(name, value));
  };

  return (
    <div className="bg-card p-4 rounded-lg mb-8 flex flex-col md:flex-row items-center gap-4">
      <Select onValueChange={(value) => handleFilterChange("destination", value)}>
        <SelectTrigger className="md:w-[180px]">
          <SelectValue placeholder="Filter by destination" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Destinations</SelectItem>
          {destinations.map((dest) => (
            <SelectItem key={dest} value={dest}>{dest}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex items-center gap-2">
        <Input
          type="number"
          placeholder="Min price"
          onChange={(e) => handleFilterChange("minPrice", e.target.value)}
          defaultValue={searchParams.get("minPrice") || ""}
        />
        <Input
          type="number"
          placeholder="Max price"
          onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
          defaultValue={searchParams.get("maxPrice") || ""}
        />
      </div>
      <Select onValueChange={(value) => handleFilterChange("sort", value)}>
        <SelectTrigger className="md:w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="createdAt-desc">Newest</SelectItem>
          <SelectItem value="price-asc">Price: Low to High</SelectItem>
          <SelectItem value="price-desc">Price: High to Low</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={() => router.push(pathname)}>Clear Filters</Button>
    </div>
  );
}
