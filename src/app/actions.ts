import { Products } from "@/definitions/types";
import db from "@/lib/client";
import { Prisma } from "@prisma/client";

function toProperties(value: Prisma.JsonValue): Record<string, string> | null {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  const result: Record<string, string> = {};
  for (const [key, val] of Object.entries(value)) {
    if (typeof val === "string") {
      result[key] = val;
    }
  }
  return result;
}

export const getLatestProducts = async (): Promise<Products> => {
  const products = await db.products.findMany({
    orderBy: { created_at: "desc" },
    where: {
      product_status: "В наличност",
      gallery: {
        isEmpty: false,
      },
    },
    take: 8,
  });

  return products.map((product) => ({
    ...product,
    properties: toProperties(product.properties),
  }));
};
