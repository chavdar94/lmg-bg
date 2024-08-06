"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { productsFilter } from "@/lib/constants";
import { Select, SelectItem } from "@nextui-org/react";

export function FiltersContainer() {
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const router = useRouter();

  const handleFilterChange = (value: string) => {
    setSelectedFilter(value);

    // Update the URL with the selected filter
    const url = new URL(window.location.href);
    url.searchParams.set("filter", value);
    router.push(url.toString());
  };

  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select
        label="Сортирай по:"
        className="max-w-xs"
        value={selectedFilter}
        onChange={(e) => handleFilterChange(e.target.value)}
      >
        {productsFilter.map((filter) => (
          <SelectItem key={filter.key} value={filter.key}>
            {filter.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
