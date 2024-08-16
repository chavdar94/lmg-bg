"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { productsFilter } from "@/lib/constants";
import {
  Select,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";

export function FiltersContainer() {
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const router = useRouter();

  const handleFilterChange = (value: string) => {
    setSelectedFilter(value);

    const url = new URL(window.location.href);
    url.searchParams.set("filter", value);
    router.push(url.toString());
  };

  return (
    <div className="flex w-2/3 md:w-full flex-wrap md:flex-nowrap gap-4">
      <Select
        onValueChange={(value) => {
          handleFilterChange(value);
        }}
      >
        <SelectTrigger className="w-full md:w-1/3 rounded-none">
          <SelectValue placeholder="Избери категория" />
        </SelectTrigger>
        <SelectContent className="rounded-none">
          <SelectGroup>
            {productsFilter.map((filter) => (
              <SelectItem
                className="rounded-none cursor-pointer"
                key={filter.key}
                value={filter.key}
              >
                {filter.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
