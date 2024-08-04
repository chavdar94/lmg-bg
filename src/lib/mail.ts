import { CartProduct } from "@/definitions/types";

export async function sendMail({
  items,
  email,
}: {
  items: CartProduct[];
  email: string;
}) {
  const response = await fetch("https://lmg-bg.vercel.app/api/emails", {
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
