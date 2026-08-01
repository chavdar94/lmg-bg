import { Products } from "@/definitions/types";
import db from "@/lib/client";
import { toProperties } from "@/lib/utils";

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
