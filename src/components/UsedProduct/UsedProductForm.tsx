"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { createUsedProduct } from "@/app/admin/actions";
import { Spinner } from "../ui/spinner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  categories: { category: string | null; slug: string }[];
};

const UsedProductForm = ({ categories }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    const formData = new FormData(e.currentTarget);
    console.log(formData);

    try {
      await createUsedProduct(formData);
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Label htmlFor="name">Име:</Label>
        <Input id="name" name="name" placeholder="Име" />

        <Label htmlFor="price">Цена:</Label>
        <Input id="price" name="price" type="number" placeholder="Цена" />

        <Label htmlFor="product_status">Статус:</Label>
        <Input
          id="product_status"
          name="product_status"
          placeholder="Статус на продукта"
        />

        <Label htmlFor="manufacturer">Производител:</Label>
        <Input
          id="manufacturer"
          name="manufacturer"
          placeholder="Производител"
        />

        {/* <Label htmlFor="category">Категория:</Label>
        <Input id="category" name="category" placeholder="Категория" /> */}
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
                  key={category.slug}
                  value={category.slug}
                >
                  {category.category}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Label htmlFor="subcategory">Под категория:</Label>
        <Input
          id="subcategory"
          name="subcategory"
          placeholder="Под категория"
        />

        <Label htmlFor="vendor_url">Линк към производител:</Label>
        <Input
          id="vendor_url"
          name="vendor_url"
          placeholder="Линк към прозводител"
        />

        <Label htmlFor="properties">Описание:</Label>
        <Textarea
          id="properties"
          name="properties"
          placeholder="Описание на продукта"
        />

        <Label htmlFor="main_picture_url">Изображение:</Label>
        <Input id="main_picture_url" name="main_picture_url" type="file" />

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
export default UsedProductForm;
