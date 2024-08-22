"use client";

import { useEffect, useState } from "react";
import { createService, getService } from "../actions";
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
  id: string;
  categories: {
    id: string;
    title: string;
  }[];
};

const ServiceUpdateForm = ({ categories, id }: Props) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    price: 0,
    categoryId: "",
  });

  useEffect(() => {
    const getSelectedService = async () => {
      const service = await getService(id);

      if (!service) return;

      setFormData(service);
    };

    getSelectedService();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      await createService(formData);
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Label htmlFor="name">Име:</Label>
        <Input
          value={formData.title}
          id="title"
          title="title"
          placeholder="Име"
          name="title"
          onChange={handleChange}
        />

        <Label htmlFor="price">Цена:</Label>
        <Input
          value={formData.price}
          id="price"
          name="price"
          type="number"
          placeholder="Цена"
          onChange={handleChange}
        />

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
          Промени{" "}
          {loading && (
            <Spinner className="text-slate-100 ml-4" size={"small"} />
          )}
        </Button>
      </form>
    </>
  );
};
export default ServiceUpdateForm;
