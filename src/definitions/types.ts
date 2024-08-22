// import { UsedProduct } from "@prisma/client";
import { JsonValue, JsonArray } from "@prisma/client/runtime/library";

export type Product = {
  id: string;
  name: string | null;
  product_status: string | null;
  haspromo: number | null;
  price: number | null;
  currency: string | null;
  main_picture_url: string | null;
  manufacturer: string | null;
  category: string | null;
  subcategory: string | null;
  partnum: string | null;
  vendor_url: string | null;
  properties: JsonArray | JsonValue;
  created_at: Date;
  slug: string;
};

export type Products = Product[];

export type BriefProduct = {
  id: string;
  name: string | null;
  price: number | null;
  main_picture_url: string | { data: Buffer };
  slug: string;
  category: string;
};

export type CartProduct = BriefProduct & {
  main_picture_url: string | { data: Buffer };
  quantity?: number;
};

export type UsedProduct = {
  id: string;
  name: string | null;
  price: number | null;
  main_picture_url: string | Buffer;
  category: string | null;
  subcategory: string | null;
  created_at: Date;
  slug: string;
};

export type UsedCartProduct = UsedProduct & { quantity?: number };

export type Currency = "USD" | "EUR" | "BGN";

export type ProductCardType = Product & { quantity?: number };
