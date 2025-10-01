"use client";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import ReviewForm from "@/components/ReviewForm";

export default function ProfilePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [profile, setProfile] = useState<{ name: string; avg_rating: number; review_count: number } | null>(null);
  const [reviews, setReviews] = useState<Array<{ id: string; rating: number; comment: string | null; created_at: string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/profile/${slug}`);
      if (res.ok) {
        const data = await res.json();
        setProfile(data.stats);
        setReviews(data.reviews);
      } else {
        setProfile(null);
        setReviews([]);
      }
      setLoading(false);
    }
    load();
  }, [slug]);

  const displayName = useMemo(() => {
    if (profile?.name) return profile.name;
    // Derive a title-cased name from slug if profile doesn't exist yet
    return slug
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(" ");
  }, [profile, slug]);

  const refresh = async () => {
    setLoading(true);
    const res = await fetch(`/api/profile/${slug}`);
    if (res.ok) {
      const data = await res.json();
      setProfile(data.stats);
      setReviews(data.reviews);
    }
    setLoading(false);
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">{displayName}</h1>
        {profile ? (
          <p className="text-xl mb-8">⭐ {Number(profile.avg_rating).toFixed(2)} ({profile.review_count} reviews)</p>
        ) : (
          <p className="text-sm text-gray-600 mb-8">No reviews yet. Be the first to rate {displayName}!</p>
        )}

        <div className="border rounded p-6 bg-gray-50 mb-8">
          <h2 className="text-xl font-semibold mb-4">Submit a Review</h2>
          <ReviewForm
            defaultName={displayName}
            onSubmitted={async () => {
              await refresh();
            }}
          />
        </div>

        <h2 className="text-xl font-semibold mb-4">Recent Reviews</h2>
        {reviews.length === 0 ? <p>No reviews yet</p> : (
          <ul className="space-y-3">
            {reviews.map((r) => (
              <li key={r.id} className="border rounded px-4 py-3">
                <div>⭐ {r.rating}</div>
                {r.comment && <p className="text-sm">{r.comment}</p>}
              </li>
            ))}
          </ul>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
