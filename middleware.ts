import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;
  const role = req.auth?.user?.role;

  // Public routes - herkes erisebilir
  const publicRoutes = ["/", "/paketler"];
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Auth routes - giris yapmis kullanicilar redirect edilir
  const authRoutes = ["/giris", "/admin-giris"];
  if (authRoutes.includes(pathname)) {
    if (isLoggedIn) {
      const redirectUrl =
        role === "admin" ? "/yonetim" : "/panel";
      return NextResponse.redirect(new URL(redirectUrl, req.nextUrl));
    }
    return NextResponse.next();
  }

  // Client routes - sadece client rolu
  const clientRoutes = ["/panel", "/antrenman", "/beslenme", "/profil"];
  const isClientRoute = clientRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  if (isClientRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/giris", req.nextUrl));
    }
    if (role !== "client") {
      return NextResponse.redirect(new URL("/yonetim", req.nextUrl));
    }
    return NextResponse.next();
  }

  // Admin routes - sadece admin rolu
  const isAdminRoute = pathname.startsWith("/yonetim");
  if (isAdminRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/admin-giris", req.nextUrl));
    }
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/panel", req.nextUrl));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)",
  ],
};
