import type { auth } from "@/lib/auth";
import { betterFetch } from "@better-fetch/fetch";
import { NextResponse, type NextRequest } from "next/server";

type Session = typeof auth.$Infer.Session;

export default async function authMiddleware(request: NextRequest) {
    const { data: session } = await betterFetch<Session>(
        "/api/auth/get-session",
        {
            baseURL: request.nextUrl.origin,
            headers: {
                cookie: request.headers.get("cookie") || "",
            },
        },
    );

    // If no session, redirect to login page with the original requested URL as a query parameter
    if (!session) {
        const redirectUrl = encodeURIComponent(request.url);
        return NextResponse.redirect(new URL(`/login?redirectTo=${redirectUrl}`, request.url));
    }

    // If the user is not an admin and tries to access an admin page, redirect to dashboard
    if (session.user.role !== "admin" && request.nextUrl.pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/admin/:path*"],
};
