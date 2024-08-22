"use server";

import { CartProduct } from "@/definitions/types";
const baseUrl = process.env.NEXT_PUBLIC_EMAIL_URL;
const baseContactUrl = process.env.NEXT_PUBLIC_CONTACT_EMAIL_URL;

export async function sendMail({
  items,
  email,
}: {
  items: CartProduct[];
  email: string;
}) {
  const response = await fetch(baseUrl as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ items, email }),
  });

  if (!response.ok) {
    throw new Error("Failed to send email");
  }

  return await response.json();
}

export async function sendContactMail(
  name: string,
  email: string,
  message: string
) {
  const response = await fetch(baseContactUrl as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, message }),
  });

  if (!response.ok) {
    throw new Error("Failed to send email");
  }

  return await response.json();
}
