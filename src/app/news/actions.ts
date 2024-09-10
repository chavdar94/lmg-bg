"use server";

import db from "@/lib/client";
import { getOrSetCache } from "@/lib/serverUtils";
import { convertBufferToDataUrl } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type PostsProps = {
  skip: number;
  take: number;
  page: number;
};

export const getAllPosts = async ({ skip, take, page }: PostsProps) => {
  const posts = await db.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    skip,
    take,
  });

  const transformedPosts = posts.map((post) => {
    const image = convertBufferToDataUrl(post.mainImage, "image/jpeg");
    return {
      ...post,
      mainImage: image,
    };
  });

  return transformedPosts;
};

export const getSinglePost = async (id: string) => {
  const post = await db.post.findUnique({
    where: {
      id: id,
    },
  });

  if (!post) {
    redirect("/news");
  }

  const image = convertBufferToDataUrl(post.mainImage, "image/jpeg");
  const transforemdPost = {
    ...post,
    mainImage: image,
  };

  return transforemdPost;
};

export const deletePost = async (id: string) => {
  await db.post.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/news");
  redirect("/news");
};

export const editPost = async (id: string, formData: FormData) => {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const imageFile = formData.get("image") as File;
  const author = formData.get("author") as string;

  if (!imageFile) {
    throw new Error("Image file is required.");
  }

  const imageBytes = await imageFile.arrayBuffer();
  const post = await db.post.update({
    where: { id },
    data: {
      title,
      content,
      author,
      mainImage: Buffer.from(imageBytes),
    },
  });
  revalidatePath(`/news/${post.id}`);
  redirect(`/news/${post.id}`);
};
