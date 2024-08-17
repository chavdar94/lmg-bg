import { Resend } from "resend";

type ContactRequestBody = {
  name: string;
  email: string;
  message: string;
};

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body: ContactRequestBody = await request.json();

    const { email, message, name } = body;

    const { data, error } = await resend.emails.send({
      from: `${name} <onboarding@resend.dev>`,
      to: process.env.TO_EMAIL as string,
      reply_to: email as string,
      subject: "Съобщение от клиент",
      text: message,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data, { status: 200 });
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}
