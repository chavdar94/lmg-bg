import db from "@/lib/client";
import { PAGE_SIZE } from "@/lib/constants";
import { getOrSetCache } from "@/lib/serverUtils";

export const getCategories = async () => {
  return getOrSetCache("categories", async () => {
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
};

type OrderBy = {
  price?: "asc" | "desc";
  name?: "asc" | "desc";
};

export const getProductsByCategory = async (
  slug: string,
  orderBy: OrderBy,
  page: number
) => {
  return getOrSetCache(
    `products-${slug}`,
    async () =>
      await db.products.findMany({
        where: {
          slug: slug,
        },
        orderBy,
        skip: page * PAGE_SIZE,
        take: PAGE_SIZE,
      })
  );
};

export const getProductsCount = async (slug: string) => {
  return getOrSetCache(
    "productsCount",
    async () =>
      await db.products.count({
        where: {
          slug: slug,
        },
      })
  );
};

export const getProduct = async (productId: string) => {
  return getOrSetCache(`product-${productId}`, async () => {
    const product = await db.products.findUnique({
      where: { id: productId },
    });

    return product;
  });
};
