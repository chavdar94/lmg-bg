"use server";

import db from "./client";
import { BriefProduct, CartProduct, OrderBy } from "@/definitions/types";
import { toProperties } from "./utils";

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
    filterStatus === "В наличност" ? { product_status: "В наличност" } : {};

  if (query && query !== "all") {
    filters.name = {
      contains: query,
      mode: "insensitive",
    };
  }

  const combinedFilters = {
    ...filters,
    ...filterCondition,
    slug,
  };

  const rawData = await db.products.findMany({
    where: combinedFilters,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: orderBy,
  });

  const data = rawData.map((product) => ({
    ...product,
    properties: toProperties(product.properties),
  }));

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

  const uniqueCategories = new Set<string>();
  allProducts.forEach((product) => {
    if (product.category && !uniqueCategories.has(product.category)) {
      uniqueCategories.add(product.category);
    }
  });

  return {
    data,
    productsCount,
    uniqueCategories,
  };
};
