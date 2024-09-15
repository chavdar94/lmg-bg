import { NextRequest, NextResponse } from "next/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// Define your custom authentication middleware function
export default async function middleware(req: NextRequest) {
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

    // If everything is okay, return null to indicate no redirection
    return null;
  } catch (error) {
    console.error("Failed to validate token:", error);

    // In case of an error, redirect to the home page
    return NextResponse.redirect(process.env.NEXT_URL!);
  }
}

// Integrate the auth middleware with the uploadthing middleware
export const uploadRouter = f({}).middleware(async ({ req }) => {
  const nextRequest = req as NextRequest; // Cast to NextRequest to use in authMiddleware
  const authResponse = await middleware(nextRequest);

  // If authResponse is not null, it means we need to redirect
  if (authResponse) {
    return { error: "Unauthorized" };
  }

  // If authorized, return a valid object that uploadthing expects
  return { status: 200 };
});

// Config for route matching
export const config = {
  matcher: "/admin/:path*",
};
