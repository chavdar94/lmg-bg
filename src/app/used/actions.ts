"use server";

import db from "@/lib/client";
import { getOrSetCache } from "@/lib/serverUtils";
import { convertBufferToDataUrl } from "@/lib/utils";

export const getUsedProducts = async () => {
  return getOrSetCache("usedProducts", async () => {
    const products = await db.usedProduct.findMany();
    const transformedProducts = products.map((product) => {
      return {
        ...product,
        main_picture_url: convertBufferToDataUrl(
          product.main_picture_url!,
          "image/jpeg"
        ),
      };
    });

    return transformedProducts;
  });
};

export const getUsedProduct = async (id: string) => {
  return getOrSetCache(`usedProduct-${id}`, async () => {
    const product = await db.usedProduct.findUnique({
      where: { id },
    });

    if (!product?.main_picture_url) {
      return;
    }

    return {
      ...product,
      main_picture_url: convertBufferToDataUrl(
        product?.main_picture_url!,
        "image/jpeg"
      ),
    };
  });
};
