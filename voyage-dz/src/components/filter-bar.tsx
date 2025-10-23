"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface FilterBarProps {
  destinations: string[];
  agencies: { id: string; name: string }[];
}

export function FilterBar({ destinations, agencies }: FilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [priceRange, setPriceRange] = useState<[number, number]>([
    parseInt(searchParams.get("minPrice") || "0", 10),
    parseInt(searchParams.get("maxPrice") || "5000", 10),
  ]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");

  const createQueryString = useCallback(
    (paramsToUpdate: { name: string; value: string }[]) => {
      const params = new URLSearchParams(searchParams.toString());
      paramsToUpdate.forEach(({ name, value }) => {
        if (value) {
          params.set(name, value);
        } else {
          params.delete(name);
        }
      });
      return params.toString();
    },
    [searchParams]
  );

  const handleSliderChange = (value: number[]) => {
    setPriceRange(value as [number, number]);
  };

  const handlePriceChange = (value: [number, number]) => {
    const queryString = createQueryString([
      { name: "minPrice", value: String(value[0]) },
      { name: "maxPrice", value: String(value[1]) },
    ]);
    router.push(pathname + "?" + queryString);
  };

  const handleFilterChange = (name: string, value: string) => {
    router.push(pathname + "?" + createQueryString([{ name, value }]));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    handleFilterChange("search", searchQuery);
  };

  return (
    <div className="bg-card p-4 rounded-lg mb-8 flex flex-col md:flex-row items-center gap-6">
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <Input
          placeholder="Search packages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button type="submit">Search</Button>
      </form>
      <Select onValueChange={(value) => handleFilterChange("destination", value)} defaultValue={searchParams.get("destination") || ""}>
        <SelectTrigger className="md:w-[200px]">
          <SelectValue placeholder="Filter by destination" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Destinations</SelectItem>
          {destinations.map((dest) => (
            <SelectItem key={dest} value={dest}>{dest}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select onValueChange={(value) => handleFilterChange("agencyId", value)} defaultValue={searchParams.get("agencyId") || ""}>
        <SelectTrigger className="md:w-[200px]">
          <SelectValue placeholder="Filter by agency" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Agencies</SelectItem>
          {agencies.map((agency) => (
            <SelectItem key={agency.id} value={agency.id}>{agency.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="w-full md:w-[300px]">
        <Label className="mb-2 block">Price Range: ${priceRange[0]} - ${priceRange[1]}</Label>
        <Slider
          min={0}
          max={5000}
          step={100}
          value={priceRange}
          onValueChange={handleSliderChange}
          onValueCommit={handlePriceChange}
        />
      </div>
      <Select onValueChange={(value) => handleFilterChange("sort", value)} defaultValue={searchParams.get("sort") || "createdAt-desc"}>
        <SelectTrigger className="md:w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="createdAt-desc">Newest</SelectItem>
          <SelectItem value="price-asc">Price: Low to High</SelectItem>
          <SelectItem value="price-desc">Price: High to Low</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={() => router.push(pathname)} variant="outline">Clear Filters</Button>
    </div>
  );
}
