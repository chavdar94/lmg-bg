"use server";

import db from "@/lib/client";
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
