import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const authCookie = req.cookies.get("auth_session");

  // If there is no authentication cookie, redirect to the home page
  if (!authCookie) {
    return NextResponse.redirect(process.env.NEXT_URL!);
  }

  const token = authCookie.value;

  try {
    const response = await fetch("http://localhost:3000/api/validate-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    // If the response is not OK, redirect to the home page
    if (!response.ok) {
      return NextResponse.redirect(process.env.NEXT_URL!);
    }

    const data = await response.json();

    // If the user is not an admin, redirect to the home page
    if (!data.isAdmin) {
      return NextResponse.redirect(process.env.NEXT_URL!);
    }

    // If everything is okay, allow the request to proceed
    return NextResponse.next();
  } catch (error) {
    console.error("Failed to validate token:", error);

    // In case of an error, redirect to the home page
    return NextResponse.redirect(process.env.NEXT_URL!);
  }
}

export const config = {
  matcher: "/admin/:path*",
};
