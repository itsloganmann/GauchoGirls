import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Fetch profile stats
    const { data: stats, error: statsErr } = await supabase
      .from("profile_stats")
      .select("*")
      .eq("slug", slug)
      .single();

    if (statsErr || !stats) {
      return NextResponse.json(
        { error: "profile_not_found" },
        { status: 404 }
      );
    }

    // Fetch reviews for this profile
    const { data: reviews, error: reviewsErr } = await supabase
      .from("reviews")
      .select("id, rating, comment, created_at")
      .eq("profile_id", stats.profile_id)
      .order("created_at", { ascending: false })
      .limit(50);

    if (reviewsErr) {
      console.error("Reviews fetch error:", reviewsErr);
      return NextResponse.json(
        { error: "reviews_fetch_failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      stats,
      reviews: reviews || [],
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "unexpected_error" },
      { status: 500 }
    );
  }
}

// Disable static optimization for fresh data
export const dynamic = "force-dynamic";
