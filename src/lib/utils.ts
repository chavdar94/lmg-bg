import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { currencies } from "./constants";
import { Currency } from "@/definitions/types";
import { fetchBNBExchangeRates } from "./parseXmlToJSON";

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
