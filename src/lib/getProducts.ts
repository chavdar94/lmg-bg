"use server";

import db from "./client";
import { CartProduct } from "@/definitions/types";

type ProductsParams = {
  category: string;
  skip: number;
  limit: number;
};

export async function getProducts({
  category,
  skip,
  limit,
}: ProductsParams): Promise<[CartProduct[], number]> {
  const [fetchedProducts, fetchedTotalProducts] = await Promise.all([
    db.products.findMany({
      where: {
        category: {
          contains: category,
          mode: "insensitive",
        },
      },
      skip: skip,
      take: limit,
    }),
    db.products.count({
      where: {
        category: {
          contains: category,
          mode: "insensitive",
        },
      },
    }),
  ]);
  return [fetchedProducts, fetchedTotalProducts];
}
