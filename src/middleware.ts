// src/middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "./i18n.config";

import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher"; // <-- TAMBAHKAN IMPORT INI

function getLocale(request: NextRequest): string {
  // 1. Ambil header 'accept-language'
  const headers = {
    "accept-language": request.headers.get("accept-language") || "",
  };

  // 2. Dapatkan daftar bahasa dari Negotiator
  const languages = new Negotiator({ headers }).languages();

  // 3. Dapatkan daftar locale yang kita dukung
  // Pastikan i18n.locales adalah array string biasa
  const locales: string[] = [...i18n.locales];

  // 4. Gunakan 'match' yang sudah di-import
  // HAPUS @ts-expect-ignore (jika ada)
  return match(languages, locales, i18n.defaultLocale);
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url
      )
    );
  }
}

export const config = {
  matcher: [
    // Lewati semua path internal (dimulai dengan _)
    // Lewati semua file (misal .svg, .png, .ico)
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
