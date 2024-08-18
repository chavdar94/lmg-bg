import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import EditPostForm from "@/components/Post/EditPostForm";
import { getSinglePost } from "../../actions";

type Props = {
  params: {
    id: string;
  };
};

const EditPost = async ({ params }: Props) => {
  const { user } = await validateRequest();
  if (!user?.isAdmin) {
    return redirect("/");
  }

  const post = await getSinglePost(params.id);
  if (!post)
    return (
      <h1 className="text-center text-3xl text-bold text-red-500">
        Няма такава новина...
      </h1>
    );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5 uppercase">Редактирай новина:</h1>
      <EditPostForm
        id={post.id}
        title={post.title}
        content={post.content}
        mainImage={post.mainImage}
        author={post.author ?? ""}
        createdAt={post.createdAt}
      />
    </div>
  );
};

export default EditPost;
