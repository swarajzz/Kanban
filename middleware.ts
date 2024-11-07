import { auth } from "@/app/_lib/auth";
export const middleware = auth;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

export const runtime = "experimental-edge";
