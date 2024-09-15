"use client";

import { useState, useRef } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { updateUsedProduct } from "@/app/admin/actions";
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
import { UploadButton } from "@/lib/uploadthing";
import Image from "next/image";
import { X } from "lucide-react";
import { UsedProduct } from "@prisma/client";

type Props = {
  product: UsedProduct;
  categories: { category: string | null; slug: string }[];
};

const UsedProductUpdateForm = ({ product, categories }: Props) => {
  const [loading, setLoading] = useState(false);

  const [isOnFocus, setIsOnFocus] = useState(product.on_focus); // State for "on-focus" product
  const [mainPictureUrl, setMainPictureUrl] = useState<string | null>(
    product.main_picture_url
  );
  const [galleryImageUrls, setGalleryImageUrls] = useState<string[]>(
    (product.gallery_urls as string[]) || []
  );
  const [formData, setFormData] = useState(product);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.append("main_picture_url", mainPictureUrl!);
    // Append gallery images
    const urlArray = galleryImageUrls.map((file) => file);
    const urlArrayJson = JSON.stringify(urlArray);
    formData.append("gallery_urls", urlArrayJson);

    // Append the "on-focus" value
    formData.append("on_focus", isOnFocus.toString());

    try {
      await updateUsedProduct(product.id, formData);
    } catch (error) {
      console.error("Error creating product:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeGalleryImage = (index: number) => {
    const newGalleryImageUrls = [...galleryImageUrls];
    newGalleryImageUrls.splice(index, 1);
    setGalleryImageUrls(newGalleryImageUrls);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Label htmlFor="name">Име:</Label>
        <Input
          id="name"
          name="name"
          placeholder="Име"
          value={formData.name!}
          onChange={handleChange}
        />

        <Label htmlFor="price_with_vat">Цена:</Label>
        <Input
          id="price_with_vat"
          name="price_with_vat"
          type="number"
          placeholder="Цена"
          value={formData.price_with_vat!}
          onChange={handleChange}
        />

        <Label htmlFor="product_status">Статус:</Label>
        <Input
          id="product_status"
          name="product_status"
          placeholder="Статус на продукта"
          value={formData.product_status!}
          onChange={handleChange}
        />

        <Label htmlFor="manufacturer">Производител:</Label>
        <Input
          id="manufacturer"
          name="manufacturer"
          placeholder="Производител"
          value={formData.manufacturer!}
          onChange={handleChange}
        />

        <Label htmlFor="category">Категория:</Label>
        <Select
          name="category"
          onValueChange={handleSelectChange}
          value={formData.category!}
        >
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
          value={formData.subcategory!}
          onChange={handleChange}
        />

        <Label htmlFor="vendor_url">Линк към производител:</Label>
        <Input
          id="vendor_url"
          name="vendor_url"
          placeholder="Линк към прозводител"
          value={formData.vendor_url!}
          onChange={handleChange}
        />

        <Label htmlFor="properties">Описание:</Label>
        <Textarea
          id="properties"
          name="properties"
          placeholder="Описание на продукта"
          value={formData.properties!}
          onChange={handleChange}
        />

        {/* Main picture input */}
        <Label htmlFor="main_picture_url">Основна снимка:</Label>
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            setMainPictureUrl(res[0].url);
          }}
          onUploadError={(error: Error) => {
            console.error(`ERROR! ${error.message}`);
          }}
        />
        {mainPictureUrl && (
          <div className="mt-2">
            <Image
              width={200}
              height={200}
              src={mainPictureUrl}
              alt="Main Picture Preview"
              className="h-48 w-auto object-cover"
            />
          </div>
        )}

        {/* Gallery input */}
        <Label htmlFor="gallery_urls">Галерия:</Label>
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            setGalleryImageUrls([...galleryImageUrls, res[0].url]);
          }}
          onUploadError={(error: Error) => {
            console.error(`ERROR! ${error.message}`);
          }}
        />

        {/* Preview gallery images with remove buttons */}
        <div className="grid grid-cols-4 gap-4 mt-2">
          {galleryImageUrls.map((url, index) => (
            <div key={url} className="relative">
              <Image
                width={200}
                height={200}
                src={url}
                alt="Gallery Image Preview"
                className="h-48 w-full object-cover"
              />
              <Button
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
          <Checkbox
            id="on_focus"
            checked={isOnFocus}
            onClick={() => setIsOnFocus(!isOnFocus)}
          />
        </div>

        <Button disabled={loading} type="submit">
          Редактирай{" "}
          {loading && (
            <Spinner className="text-slate-100 ml-4" size={"small"} />
          )}
        </Button>
      </form>
    </>
  );
};

export default UsedProductUpdateForm;
