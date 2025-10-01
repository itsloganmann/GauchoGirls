import { createClient } from "@supabase/supabase-js";

/**
 * Create a Supabase client for browser/client-side usage
 */
export function createBrowserClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables");
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}

/**
 * Database types for our application
 */
export interface Profile {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface Review {
  id: string;
  profile_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  ip_hash: string;
  ua_hash: string | null;
  turnstile_ok: boolean;
  review_date: string;
}

export interface ProfileStats {
  profile_id: string;
  name: string;
  slug: string;
  review_count: number;
  avg_rating: number;
  last_review_at: string | null;
}
