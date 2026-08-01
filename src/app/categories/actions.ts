import { OrderBy, Products } from "@/definitions/types";
import db from "@/lib/client";
import { PAGE_SIZE } from "@/lib/constants";
import { toProperties } from "@/lib/utils";

export const getCategories = async () => {
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
};

export const getProductsByCategory = async (
  slug: string,
  orderBy: OrderBy,
  page: number,
  filterStatus?: string,
): Promise<Products> => {
  const filterCondition =
    filterStatus === "В наличност" ? { product_status: "В наличност" } : {};

  const products = await db.products.findMany({
    where: {
      slug: slug,
      ...filterCondition,
    },
    orderBy,
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  return products.map((product) => ({
    ...product,
    properties: toProperties(product.properties),
  }));
};

export const getProductsCount = async (slug: string, filterStatus?: string) => {
  const filterCondition =
    filterStatus === "В наличност" ? { product_status: "В наличност" } : {};

  const count = await db.products.count({
    where: {
      slug: slug,
      ...filterCondition,
    },
  });
  return count;
};

export const getProduct = async (productId: string) => {
  // return getOrSetCache(`product-${productId}`, async () => {
  //   const product = await db.products.findUnique({
  //     where: { id: productId },
  //   });

  //   return product;
  // });
  return db.products.findUnique({ where: { id: productId } });
};
