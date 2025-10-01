import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data, error } = await supabase
      .from("profile_stats")
      .select("*")
      .order("avg_rating", { ascending: false })
      .order("review_count", { ascending: false })
      .limit(100);

    if (error) {
      console.error("Leaderboard fetch error:", error);
      return NextResponse.json(
        { error: "leaderboard_fetch_failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: data || [] });
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
