import { NextRequest, NextResponse } from "next/server";
import { toSlug } from "@/lib/slug";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("q") || "";

  const slug = toSlug(query);

  if (!slug) {
    // Redirect to home if invalid name
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Redirect to profile page
  return NextResponse.redirect(new URL(`/profile/${slug}`, req.url));
}
