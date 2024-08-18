import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import CreatePostForm from "@/components/Post/CreatePostForm";

const Admin = async () => {
  const { user } = await validateRequest();
  if (!user?.isAdmin) {
    return redirect("/");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5 uppercase">Добави новина:</h1>
      <CreatePostForm />
    </div>
  );
};

export default Admin;
