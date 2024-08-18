"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { createPost } from "@/app/admin/actions";
import { Spinner } from "../ui/spinner";

const CreatePostForm = () => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Creating post...");

    setLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      await createPost(formData);
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Label htmlFor="title">Заглавие:</Label>
        <Input id="author" name="title" placeholder="Заглавие" />
        <Label htmlFor="author">Автор:</Label>
        <Input id="author" name="author" placeholder="Автор" />
        <Label htmlFor="content">Съдържание:</Label>
        <Textarea id="content" name="content" />
        <Label htmlFor="image">Изображение:</Label>
        <Input id="image" name="image" type="file" />
        <Button disabled={loading} type="submit">
          Създай{" "}
          {loading && (
            <Spinner className="text-slate-100 ml-4" size={"small"} />
          )}
        </Button>
      </form>
    </>
  );
};
export default CreatePostForm;
