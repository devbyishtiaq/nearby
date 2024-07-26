import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export async function middleware(request: NextRequest) {
  let currentPath = request.nextUrl.pathname;
  const authPages = ["/login", "/register", "/forgot-password", "/support"];

  const activateEmailRegex = /^\/activate-email\/[^\/]+$/;
  const changePasswordRegex = /^\/change-password\/[^\/]+$/;

  const locale = request.nextUrl.locale;

  if (
    !activateEmailRegex.test(currentPath) &&
    !authPages.includes(currentPath) &&
    !changePasswordRegex.test(currentPath)
  ) {
    let jwt: any = null;
    let isPaid: any = null;
    try {
      const userToken = request.cookies.get("token");
      jwt = userToken?.value;

      const _isPaid = request.cookies.get("isPaid");
      isPaid = _isPaid ? _isPaid.value === "true" : false;
    } catch {
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }

    try {
      const secret = new TextEncoder().encode(process.env.TOKEN_SECRET);

      if (!jwt) {
        return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
      }

      try {
        await jose.jwtVerify(jwt, secret);
        if (!isPaid && currentPath !== "/my-tariff") {
          return NextResponse.redirect(new URL(`/${locale}/my-tariff`, request.url));
        } else {
          return NextResponse.next();
        }
      } catch {
        return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
      }
    } catch {
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }
  } else if (currentPath === "/login") {
    try {
      const userToken = request.cookies.get("token");
      const jwt = userToken?.value || "";
      const secret = new TextEncoder().encode(process.env.TOKEN_SECRET);
      await jose.jwtVerify(jwt, secret);
      return NextResponse.redirect(new URL(`/${locale}/home`, request.url));
    } catch {
      console.log("There is a problem with the token.");
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/sign-document",
    "/register",
    "/legislative-base",
    "/account-settings",
    "/ai-ka",
    "/analysis-of-documents",
    "/creation-and-signing",
    "/document-designer",
    "/government-body-responses",
    "/home",
    "/judicial-acts",
    "/legislative-base",
    "/marketplace",
    "/my-documents",
    "/my-planner",
    "/my-tariff",
    "/nearby-courses",
    "/payment-details",
    "/ready-made-document",
    "/search-specialist",
    "/course-documents",
  ],
};
