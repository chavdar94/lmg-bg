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

    const url = new URL(window.location.href);
    url.searchParams.set("filter", value);
    router.push(url.toString());
  };

  return (
    <div className="flex w-2/3 md:w-full flex-wrap md:flex-nowrap gap-4">
      <Select
        label="Сортирай по:"
        className="max-w-xs"
        radius="none"
        value={selectedFilter}
        onChange={(e) => handleFilterChange(e.target.value)}
        size="sm"
        classNames={{
          popoverContent: "rounded-none",
        }}
      >
        {productsFilter.map((filter) => (
          <SelectItem
            className="hover:rounded-none"
            key={filter.key}
            value={filter.key}
          >
            {filter.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
