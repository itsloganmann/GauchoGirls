-- GauchoGirls Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table: stores unique people by normalized slug
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index on slug for fast lookups
CREATE INDEX IF NOT EXISTS idx_profiles_slug ON public.profiles(slug);

-- Reviews table: stores ratings and comments
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ip_hash TEXT NOT NULL,
  ua_hash TEXT,
  turnstile_ok BOOLEAN NOT NULL DEFAULT FALSE,
  review_date DATE GENERATED ALWAYS AS ((created_at AT TIME ZONE 'UTC')::DATE) STORED
);

-- Create unique index to enforce one review per IP per profile per day
CREATE UNIQUE INDEX IF NOT EXISTS idx_reviews_unique_daily 
  ON public.reviews(profile_id, ip_hash, review_date);

-- Create index for faster profile reviews lookup
CREATE INDEX IF NOT EXISTS idx_reviews_profile_id ON public.reviews(profile_id);

-- Create materialized view for aggregated profile statistics
CREATE OR REPLACE VIEW public.profile_stats AS
SELECT
  p.id AS profile_id,
  p.name,
  p.slug,
  COUNT(r.id)::INTEGER AS review_count,
  COALESCE(AVG(r.rating), 0)::NUMERIC(4,2) AS avg_rating,
  MAX(r.created_at) AS last_review_at
FROM public.profiles p
LEFT JOIN public.reviews r ON r.profile_id = p.id
GROUP BY p.id, p.name, p.slug;

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Profiles
-- Allow anyone to view profiles
CREATE POLICY "profiles_select_all" ON public.profiles
  FOR SELECT USING (true);

-- Allow anyone to insert new profiles
CREATE POLICY "profiles_insert" ON public.profiles
  FOR INSERT WITH CHECK (true);

-- Prevent updates and deletes by anonymous users
CREATE POLICY "profiles_no_update" ON public.profiles
  FOR UPDATE USING (false);

CREATE POLICY "profiles_no_delete" ON public.profiles
  FOR DELETE USING (false);

-- RLS Policies for Reviews
-- Allow anyone to view reviews
CREATE POLICY "reviews_select_all" ON public.reviews
  FOR SELECT USING (true);

-- Allow inserts only if turnstile_ok is true
CREATE POLICY "reviews_insert_with_turnstile" ON public.reviews
  FOR INSERT WITH CHECK (turnstile_ok = true);

-- Prevent updates and deletes by anonymous users
CREATE POLICY "reviews_no_update" ON public.reviews
  FOR UPDATE USING (false);

CREATE POLICY "reviews_no_delete" ON public.reviews
  FOR DELETE USING (false);
