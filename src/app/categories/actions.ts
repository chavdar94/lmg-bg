import db from "@/lib/client";
import { cache } from "react";

export const getCategories = cache(async () => {
  const categories = await db.products.findMany({
    distinct: ["category"],
    select: {
      category: true,
      slug: true,
    },
    orderBy: {
      category: "asc",
    },
  });

  return categories;
});
