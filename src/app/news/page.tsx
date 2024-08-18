import React from "react";
import { getAllPosts } from "./actions";
import Post from "@/components/Post/Post";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

type PostType = {
  id: string;
  title: string;
  content: string;
  mainImage: string;
  author?: string;
  createdAt: Date;
};

const News = async () => {
  const posts = await getAllPosts();

  const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  return (
    <div className="flex flex-col gap-4">
      {posts.length === 0 && (
        <div className="flex flex-col justify-center m-auto">
          <p className="text-2xl text-semibold">Няма новини за показване.</p>
          <Link
            className={buttonVariants({ className: "w-36 m-auto" })}
            href={"/"}
          >
            Начало
          </Link>
        </div>
      )}
      {posts.map((post: any) => (
        <Post
          key={post.id}
          {...post}
          truncatedText={truncateText(post.content, 40)}
        />
      ))}
    </div>
  );
};

export default News;
