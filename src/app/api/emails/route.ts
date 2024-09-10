import { CartProduct } from "@/definitions/types";
import { Resend } from "resend";
import EmailOrder from "@/email/email-order";

const resend = new Resend(process.env.RESEND_API_KEY);

type RequestBody = {
  items: CartProduct[];
  email: string;
  fullName?: string;
  phone: string;
};

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json();

    const { items, email, fullName, phone } = body;

    const { data, error } = await resend.emails.send({
      from: "Sales <lmg-bg@chavdart.eu>",
      to: process.env.TO_EMAIL as string,
      reply_to: email as string,
      subject: "Нова поръчка",
      react: EmailOrder({ items, email, fullName, phone }),
    });
    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data, { status: 200 });
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}
