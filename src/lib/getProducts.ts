"use server";

import db from "./client";
import { BriefProduct, CartProduct, OrderBy } from "@/definitions/types";

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
  return [fetchedProducts as BriefProduct[], fetchedTotalProducts];
}

export const getAllProducts = async ({
  query,
  limit = 12,
  page,
  orderBy,
  filterStatus,
  slug,
}: {
  query: string;
  limit?: number;
  page: number;
  orderBy?: OrderBy;
  filterStatus?: string;
  slug?: string;
}) => {
  const filters: any = {};

  const filterCondition =
    filterStatus === "Наличен" ? { product_status: "Наличен" } : {};

  if (query && query !== "all") {
    filters.name = {
      contains: query,
      mode: "insensitive", // Case-insensitive search
    };
  }

  const combinedFilters = {
    ...filters,
    ...filterCondition,
    slug,
  };

  const data = await db.products.findMany({
    where: combinedFilters,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: orderBy,
  });

  const productsCount = await db.products.count({
    where: combinedFilters,
  });

  const allProducts = await db.products.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
  });

  const uniqueCategories = new Set<string>(); // Assuming category ID is a number
  allProducts.forEach((product, id) => {
    if (product.category && !uniqueCategories.has(product.category)) {
      uniqueCategories.add(product.category);
    }
  });

  // Fetch unique category details based on the collected IDs

  return {
    data,
    productsCount,
    uniqueCategories,
  };
};
