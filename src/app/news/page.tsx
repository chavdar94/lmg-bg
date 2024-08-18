import React from "react";
import { getAllPosts } from "./actions";
import Post from "@/components/Post/Post";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import PaginationContainer from "@/components/Pagination/PaginationContainer";
import { PAGE_SIZE_NEWS } from "@/lib/constants";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const News = async ({ searchParams }: Props) => {
  const page = Number(searchParams?.page) || 1;
  const skip = (page - 1) * PAGE_SIZE_NEWS;
  const take = PAGE_SIZE_NEWS;
  const { transformedPosts, postsCount } = await getAllPosts({ skip, take });

  const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const totalPages = Math.ceil(postsCount / 3);

  return (
    <>
      <div className="flex flex-col gap-4">
        {transformedPosts.length === 0 && (
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

        {transformedPosts.map((post: any) => (
          <Post
            key={post.id}
            {...post}
            truncatedText={truncateText(post.content, 30)}
          />
        ))}

        {postsCount > 3 && (
          <PaginationContainer
            currentPage={page}
            totalPages={totalPages}
            route={"/news"}
          />
        )}
      </div>
    </>
  );
};

export default News;
