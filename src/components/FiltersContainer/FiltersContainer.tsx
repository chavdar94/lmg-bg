"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { productsFilter } from "@/lib/constants";
import {
  Select,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { updateQuery } from "@/lib/utils";

export function FiltersContainer() {
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const currentFilter = searchParams.get("filter");
    if (currentFilter) {
      setSelectedFilter(currentFilter);
    }
  }, [searchParams]);

  const handleFilterChange = (value: string) => {
    setSelectedFilter(value);
    updateQuery("filter", value, router, false);
  };

  return (
    <div className="flex flex-wrap md:flex-nowrap gap-4">
      <Select
        value={selectedFilter}
        onValueChange={(value) => {
          handleFilterChange(value);
        }}
      >
        <SelectTrigger className="w-full md:w-1/3 rounded-none">
          <SelectValue placeholder="Избери категория" />
        </SelectTrigger>
        <SelectContent
          className="rounded-none z-50"
          ref={(ref) => {
            if (!ref) return;
            ref.ontouchstart = (e) => {
              e.preventDefault();
            };
          }}
        >
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
