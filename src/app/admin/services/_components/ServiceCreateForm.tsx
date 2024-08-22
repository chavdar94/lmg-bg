"use client";

import { useState } from "react";
import { createService } from "../actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  categories: {
    id: string;
    title: string;
  }[];
};

const ServiceCreateForm = ({ categories }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    const formData = new FormData(e.currentTarget);

    const mutadetFormData = {
      title: e.currentTarget.title,
      price: Number(e.currentTarget.price),
      categoryId: e.currentTarget.category,
    };

    try {
      await createService(mutadetFormData);
    } catch (error) {
      console.error("Error creating service:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Label htmlFor="name">Име:</Label>
        <Input id="title" title="title" placeholder="Име" />

        <Label htmlFor="price">Цена:</Label>
        <Input id="price" name="price" type="number" placeholder="Цена" />

        <Label htmlFor="category">Категория:</Label>
        <Select name="category">
          <SelectTrigger className="w-full rounded-none">
            <SelectValue placeholder="Избери категория" />
          </SelectTrigger>
          <SelectContent
            className="rounded-none z-50"
            ref={(ref) => {
              if (!ref) return;
              ref.ontouchstart = (e) => {
                e.preventDefault();
              };
            }}
          >
            <SelectGroup>
              {categories.map((category) => (
                <SelectItem
                  className="rounded-none cursor-pointer"
                  key={category.id}
                  value={category.id}
                >
                  {category.title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

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
export default ServiceCreateForm;
