// import { UsedProduct } from "@prisma/client";
import { UsedProduct } from "@prisma/client";
import { JsonValue, JsonArray } from "@prisma/client/runtime/library";

export type Product = {
  id: string;
  name: string | null;
  product_status: string | null;
  price: number | null;
  currency: string | null;
  gallery: string[] | null;
  manufacturer: string | null;
  properties: Record<string, string> | null;
  created_at: Date | null;
  slug: string;
  price_eur: number | null;
  price_bgn?: number | null;
};

export type Products = Product[];

export type BriefProduct = {
  id: string;
  name: string | null;
  price: number | null;
  gallery: string[];
  slug: string;
  category: string;
  price_eur: number | null;
  price_bgn?: number | null;
};

export type CartProduct = BriefProduct & {
  gallery: string[] | { data: Buffer };
  quantity?: number;
};

// export type UsedProduct = {
//   id: string;
//   name: string | null;
//   main_picture_url: string | null;
//   category: string | null;
//   subcategory: string | null;
//   created_at: Date;
//   slug: string;
//   price_with_vat: number | null;
//   gallery_urls: string[] | null;
// };

export type UsedCartProduct = UsedProduct & { quantity?: number };

export type Currency = "USD" | "EUR" | "BGN";

export type ProductCardType = Product & {
  quantity?: number;
};

export type OrderBy = {
  price?: "asc" | "desc";
  name?: "asc" | "desc";
};

export type ProductWithGallery = Product & { gallery: JsonValue | null };
