import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { currencies, redisExpire } from "./constants";
import { Currency } from "@/definitions/types";
import { fetchBNBExchangeRates } from "./parseXmlToJSON";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { redis } from "./redis";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  price: number | string,
  options: {
    currency?: "USD" | "EUR" | "BGN";
    notation?: Intl.NumberFormatOptions["notation"];
    IntlFormat?: "en-US" | "bg-BG";
  } = {}
) {
  const { currency = "BGN", notation = "standard" } = options;
  const numericPrice = typeof price === "string" ? parseFloat(price) : price;

  return new Intl.NumberFormat(options.IntlFormat || "en-US", {
    style: "currency",
    currency,
    notation,
    maximumFractionDigits: 2,
  }).format(numericPrice);
}

export async function calculateCurrency(price: number, currency: Currency) {
  if (!currencies[currency]) {
    await fetchBNBExchangeRates();
  }
  const newPrice = price * Number(currencies[currency]);

  const priceWithVat = newPrice * 1.2;

  return priceWithVat;
}

export const convertBufferToDataUrl = (
  buffer: Buffer,
  mimeType: string
): string => {
  const base64 = buffer.toString("base64");
  return `data:${mimeType};base64,${base64}`;
};

export const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};

export const updateQuery = (
  key: string,
  value: string,
  router: AppRouterInstance,
  categoryChange?: boolean
) => {
  const params = new URLSearchParams(
    categoryChange ? "" : window.location.search
  );
  if (value) {
    params.set(key, value);
  } else {
    params.delete(key);
  }
  router.push(`${window.location.pathname}?${params.toString()}`);
};

export const title = (str: string) => {
  return str.replace(/\b\w/g, function (match) {
    return match.toUpperCase();
  });
};
