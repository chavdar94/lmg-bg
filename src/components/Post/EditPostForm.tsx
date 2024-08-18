"use client";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Spinner } from "../ui/spinner";
import { editPost } from "@/app/news/actions";

type PostType = {
  id: string;
  title: string;
  content: string;
  mainImage: string;
  author?: string;
  createdAt: Date;
};

const EditPostForm = (post: PostType) => {
  const [formData, setFormData] = useState({
    title: post.title,
    content: post.content,
    author: post.author ?? "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    try {
      await editPost(post.id, formData);
    } catch (error) {
      console.error("Error updating post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <div className="flex items-center gap-1">
            <p className="text-red-500">*</p>
            <Label htmlFor="title">Заглавие:</Label>
          </div>
          <Input
            value={formData.title}
            onChange={handleChange}
            id="title"
            name="title"
            placeholder="Заглавие"
          />
        </div>
        <Label htmlFor="author">Автор:</Label>
        <Input
          value={formData.author}
          onChange={handleChange}
          id="author"
          name="author"
          placeholder="Автор"
        />
        <div>
          <div className="flex items-center gap-1">
            <p className="text-red-500">*</p>
            <Label htmlFor="content">Съдържание:</Label>
          </div>
          <Textarea
            value={formData.content}
            onChange={handleChange}
            id="content"
            name="content"
          />
        </div>
        <div>
          <div className="flex items-center gap-1">
            <p className="text-red-500">*</p>
            <Label htmlFor="image">Изображение:</Label>
          </div>
          <Input id="image" name="image" type="file" accept="image/*" />
        </div>
        <Button disabled={loading} type="submit">
          Обнови{" "}
          {loading && (
            <Spinner className="text-slate-100 ml-4" size={"small"} />
          )}
        </Button>
      </form>
    </>
  );
};

export default EditPostForm;
