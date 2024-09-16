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
import { Checkbox } from "../ui/checkbox";
import Image from "next/image";
import { X } from "lucide-react";

type Props = {
  categories: { category: string | null; slug: string }[];
};

const UsedProductForm = ({ categories }: Props) => {
  const [loading, setLoading] = useState(false);

  const [isOnFocus, setIsOnFocus] = useState(false); // State for "on-focus" product
  const [mainPictureFile, setMainPictureFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);

  const handleMainPictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setMainPictureFile(file);
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setGalleryFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    // Append the main picture file if selected
    if (mainPictureFile) {
      formData.append("main_picture_url", mainPictureFile);
    }
    galleryFiles.forEach((file) => {
      formData.append("gallery_urls", file);
    });

    // Append the "on-focus" value
    formData.append("on_focus", isOnFocus.toString());

    try {
      await createUsedProduct(formData);
    } catch (error) {
      console.error("Error creating product:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeGalleryImage = (index: number) => {
    const newGalleryFiles = [...galleryFiles];
    newGalleryFiles.splice(index, 1);
    setGalleryFiles(newGalleryFiles);
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

        <Label htmlFor="category">Категория:</Label>
        <Select name="category">
          <SelectTrigger className="w-full rounded-none">
            <SelectValue placeholder="Избери категория" />
          </SelectTrigger>
          <SelectContent className="rounded-none z-50">
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

        {/* Main picture input */}
        <Label htmlFor="main_picture_url">Основна снимка:</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={handleMainPictureChange}
        />
        {mainPictureFile && (
          <div className="mt-2">
            <Image
              width={200}
              height={200}
              src={URL.createObjectURL(mainPictureFile)}
              alt="Main Picture Preview"
              className="h-48 w-auto object-cover"
            />
          </div>
        )}

        {/* Gallery input */}
        <Label htmlFor="gallery_urls">Галерия:</Label>
        <Input
          type="file"
          accept="image/*"
          multiple
          onChange={handleGalleryChange}
        />

        {/* Preview gallery images with remove buttons */}
        <div className="grid grid-cols-4 gap-4 mt-2">
          {galleryFiles.map((file, index) => (
            <div key={index} className="relative">
              <Image
                width={200}
                height={200}
                src={URL.createObjectURL(file)}
                alt="Gallery Image Preview"
                className="h-48 w-full object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                onClick={() => removeGalleryImage(index)}
                className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full"
              >
                <X size={30} />
              </Button>
            </div>
          ))}
        </div>

        {/* Checkbox for On-Focus Product */}
        <div className="flex items-center gap-2 w-full">
          <Label htmlFor="on_focus">На фокус:</Label>
          <Checkbox id="on_focus" onClick={() => setIsOnFocus(!isOnFocus)} />
        </div>

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
