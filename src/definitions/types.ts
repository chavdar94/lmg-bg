// type JsonValue = string | number | boolean | JsonObject | JsonValue[];

import { JsonValue } from "@prisma/client/runtime/library";

// interface JsonObject {
//   [key: string]: JsonValue;
// }

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
  properties: JsonValue;
  created_at: Date;
};

export type Products = Product[];
