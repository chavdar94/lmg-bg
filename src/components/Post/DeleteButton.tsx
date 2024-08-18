"use client";

import { deletePost } from "@/app/news/actions";
import { Button } from "../ui/button";
import { useState } from "react";
import { Spinner } from "../ui/spinner";

type Props = {
  id: string;
};
const DeleteButton = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const handleDeletePost = async () => {
    setLoading(true);
    await deletePost(props.id);
    setLoading(false);
  };

  return (
    <Button
      disabled={loading}
      onClick={handleDeletePost}
      className="w-full md:w-36 flex gap-2"
    >
      Изтрий{" "}
      {loading && <Spinner className="text-slate-100 ml-4" size={"small"} />}
    </Button>
  );
};
export default DeleteButton;
