"use server";

import db from "@/lib/client";
import { slugify } from "@/lib/utils";
import { redirect } from "next/navigation";

export const createPost = async (formData: FormData) => {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const imageFile = formData.get("image") as File;
  const author = formData.get("author") as string;

  if (!imageFile) {
    throw new Error("Image file is required.");
  }

  const imageBytes = await imageFile.arrayBuffer();

  try {
    const newPost = await db.post.create({
      data: {
        title,
        author,
        content,
        mainImage: Buffer.from(imageBytes),
      },
    });

    redirect(`/news/${newPost.id}`);
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const createUsedProduct = async (formData: FormData) => {
  const slug = slugify(formData.get("category") as string);

  const product = await db.usedProduct.create({
    data: {
      name: formData.get("name") as string,
      price_with_vat: parseFloat(formData.get("price") as string),
      manufacturer: formData.get("manufacturer") as string,
      category: formData.get("category") as string,
      subcategory: formData.get("subcategory") as string,
      vendor_url: formData.get("vendor_url") as string,
      properties: formData.get("properties") as string,
      main_picture_url: formData.get("main_picture_url") as string,
      product_status: formData.get("product_status") as string,
      slug,
      gallery_urls: formData.get("gallery_urls") as string,
      on_focus: formData.get("on_focus") === "on",
    },
  });

  return redirect("/used");
};

export const updateUsedProduct = async (id: string, formData: FormData) => {
  const slug = slugify(formData.get("category") as string);

  await db.usedProduct.update({
    where: {
      id,
    },
    data: {
      name: formData.get("name") as string,
      price_with_vat: parseFloat(formData.get("price_with_vat") as string),
      manufacturer: formData.get("manufacturer") as string,
      category: formData.get("category") as string,
      subcategory: formData.get("subcategory") as string,
      vendor_url: formData.get("vendor_url") as string,
      properties: formData.get("properties") as string,
      main_picture_url: formData.get("main_picture_url") as string,
      product_status: formData.get("product_status") as string,
      slug,
      gallery_urls: formData.get("gallery_urls") as string,
      on_focus: formData.get("on_focus") === "on",
    },
  });

  return redirect(`/categories/${slug}/${id}`);
};
