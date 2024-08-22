import db from "@/lib/client";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  try {
    const session = await db.session.findUnique({
      where: { id: token },
    });

    if (!session) {
      return Response.json(
        { error: "Failed to validate token" },
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const userId = session?.userId;

    const user = await db.user.findUnique({
      where: { id: userId },
      select: { isAdmin: true },
    });

    return Response.json(user, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return Response.json(
      { error: "Failed to validate token" },
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
