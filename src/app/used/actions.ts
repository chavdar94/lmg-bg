"use server";

import db from "@/lib/client";
import { USED_PRODUCTS_ADMIN_PER_PAGE } from "@/lib/constants";
import { getOrSetCache } from "@/lib/serverUtils";
import { convertBufferToDataUrl, formatError } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const getUsedProducts = async (page: number) => {
  const productsPromise = db.usedProduct.findMany({
    skip: (page - 1) * USED_PRODUCTS_ADMIN_PER_PAGE,
    take: USED_PRODUCTS_ADMIN_PER_PAGE,
    orderBy: {
      created_at: "desc",
    },
  });

  const countPromise = db.usedProduct.count();

  const [products, count] = await Promise.all([productsPromise, countPromise]);

  return { products, count };
};

export const getUsedProduct = async (id: string) => {
  return await db.usedProduct.findUnique({
    where: { id },
  });
};

export const deleteUsedProduct = async (id: string) => {
  try {
    const productExists = await db.usedProduct.findUnique({
      where: {
        id,
      },
    });
    if (!productExists) throw new Error("Product not found");
    await db.usedProduct.delete({ where: { id } });
    revalidatePath("/admin/products");
    return {
      success: true,
      message: "Успешно изтрит продукт",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
};
