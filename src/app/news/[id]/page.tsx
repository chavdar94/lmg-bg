import { getSinglePost } from "../actions";
import Image from "next/image";
import { validateRequest } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import DeleteButton from "@/components/Post/DeleteButton";
import Link from "next/link";

type Props = {
  params: {
    id: string;
  };
};

const PostDetails = async ({ params }: Props) => {
  const post = await getSinglePost(params.id);
  const { user } = await validateRequest();

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-3xl font-semibold">{post?.title}</h1>
        <p className="text-xs">
          от <span className="text-sm font-bold">{post?.author}</span> -{" "}
          {post?.createdAt.toLocaleDateString()}
        </p>
      </div>
      <Image
        width={500}
        height={500}
        className="w-auto h-96 object-contain self-start"
        src={post.mainImage}
        alt={post?.title!}
      />
      <hr />
      <p>{post?.content}</p>
      {user?.isAdmin && (
        <div className="flex gap-4">
          <DeleteButton id={params.id} />
          <Link href={`/news/${params.id}/edit`}>
            <Button className="w-full md:w-36">Редактирай</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
