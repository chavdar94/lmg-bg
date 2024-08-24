import db from "@/lib/client";
import { getOrSetCache } from "@/lib/serverUtils";

export const getLatestProducts = async () => {
  return await getOrSetCache(
    "latestProducts",
    async () =>
      await db.products.findMany({
        orderBy: { created_at: "desc" },
        take: 8,
      })
  );
};
