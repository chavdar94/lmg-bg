import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
