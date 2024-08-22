import CreatePostForm from "@/components/Post/CreatePostForm";

const Admin = async () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-5 uppercase">Добави новина:</h1>
      <CreatePostForm />
    </div>
  );
};

export default Admin;
