import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(request) {
    const token = request.cookies.get("helpToken")?.value;
    const { pathname } = request.nextUrl;

    let payloadData = null;

    // ✅ Safe JWT verify
    try {
        if (token) {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            const { payload } = await jwtVerify(token, secret);
            payloadData = payload;
        }
    } catch (err) {
        payloadData = null;
    }

    // ✅ User protect
    if (pathname.startsWith("/user")) {
        if (!token || payloadData?.role !== "user") {
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }
    }

    if (pathname === '/auth/login') {
        if (token && payloadData?.role === 'user') {
            return NextResponse.redirect(new URL("/user", request.url));
        }
    }

    // ✅ Provider protect
    if (pathname.startsWith("/expert")) {
        if (!token || payloadData?.role !== "provider") {
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }
    }

    if (pathname === '/auth/login') {
        if (token && payloadData?.role === 'provider') {
            return NextResponse.redirect(new URL("/expert", request.url));
        }
    }

    // ✅ Admin protect
    if (pathname.startsWith("/admin")) {
        if (!token || payloadData?.role !== "admin") {
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }
    }

    if (pathname === '/auth/login') {
        if (token && payloadData?.role === 'admin') {
            return NextResponse.redirect(new URL("/admin", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/auth/login", "/user/:path*", "/expert/:path*", "/admin/:path*"],
};