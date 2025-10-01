import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { reviewSchema } from "@/lib/validation";
import { toSlug } from "@/lib/slug";
import { hash } from "@/lib/hash";
import { verifyTurnstile } from "@/lib/turnstile";

export async function POST(req: NextRequest) {
  try {
    // Parse and validate request body
    const body = await req.json();
    const parsed = reviewSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "invalid_input", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { name, rating, comment, token } = parsed.data;

    // Extract remote IP for rate limiting and CAPTCHA verification
    const remoteIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "0.0.0.0";

    // Verify Turnstile CAPTCHA
    const captchaValid = await verifyTurnstile(token, remoteIp);
    if (!captchaValid) {
      return NextResponse.json(
        { error: "captcha_failed" },
        { status: 400 }
      );
    }

    // Initialize Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Create slug from name
    const slug = toSlug(name);

    if (!slug) {
      return NextResponse.json(
        { error: "invalid_name" },
        { status: 400 }
      );
    }

    // Upsert profile (idempotent on slug)
    const { data: profile, error: profileErr } = await supabase
      .from("profiles")
      .upsert({ name, slug }, { onConflict: "slug", ignoreDuplicates: false })
      .select("*")
      .single();

    if (profileErr || !profile) {
      console.error("Profile upsert error:", profileErr);
      return NextResponse.json(
        { error: "profile_creation_failed" },
        { status: 500 }
      );
    }

    // Hash IP and User-Agent for privacy
    const ip_hash = hash(remoteIp);
    const ua_hash = hash(req.headers.get("user-agent") || "unknown");

    // Insert review - will fail if daily limit exceeded (unique constraint)
    const { error: reviewErr } = await supabase.from("reviews").insert({
      profile_id: profile.id,
      rating,
      comment: comment || null,
      ip_hash,
      ua_hash,
      turnstile_ok: true, // Required by RLS policy
    });

    if (reviewErr) {
      console.error("Review insert error:", reviewErr);
      
      // Check if it's a unique constraint violation (rate limit)
      if (reviewErr.code === "23505") {
        return NextResponse.json(
          { error: "rate_limited", message: "You can only submit one review per person per day" },
          { status: 429 }
        );
      }

      return NextResponse.json(
        { error: "review_creation_failed" },
        { status: 500 }
      );
    }

    // Success
    return NextResponse.json(
      { success: true, slug },
      { status: 201 }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "unexpected_error" },
      { status: 500 }
    );
  }
}
