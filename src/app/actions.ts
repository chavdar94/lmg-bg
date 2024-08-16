import db from "@/lib/client";
import { cache } from "react";

export const getLatestProducts = cache(async () => {
  return await db.products.findMany({
    orderBy: { created_at: "desc" },
    take: 8,
  });
});
