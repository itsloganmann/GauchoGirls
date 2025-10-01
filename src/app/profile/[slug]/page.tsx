"use client";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { Star, Share2, TrendingUp, Calendar } from "lucide-react";
import { toast } from "react-hot-toast";
import ReviewForm from "@/components/ReviewForm";
import RatingDistribution from "@/components/RatingDistribution";

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

  const handleShare = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    navigator.clipboard.writeText(url).then(() => {
      toast.success("Link copied to clipboard!");
    });
  };

  const ratingDistribution = useMemo(() => {
    if (!reviews.length) return [0, 0, 0, 0, 0];
    const dist = [0, 0, 0, 0, 0];
    reviews.forEach((r) => {
      if (r.rating >= 1 && r.rating <= 5) {
        dist[r.rating - 1]++;
      }
    });
    return dist;
  }, [reviews]);

  if (loading) return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 animate-pulse">
            <Star className="h-8 w-8 text-white" />
          </div>
          <p className="text-lg font-medium opacity-70">Loading profile...</p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 container-page px-4 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">{displayName}</h1>
              {profile && (
                <div className="flex items-center gap-4 text-sm opacity-70">
                  <span className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    {profile.review_count} reviews
                  </span>
                </div>
              )}
            </div>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Share2 className="h-4 w-4" />
              Share
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        {profile ? (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Rating Card */}
            <div className="card p-6">
              <h3 className="text-sm font-medium opacity-70 mb-4">Overall Rating</h3>
              <div className="flex items-end gap-3 mb-6">
                <div className="text-5xl font-bold">{Number(profile.avg_rating).toFixed(1)}</div>
                <div className="flex pb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-6 w-6 ${i < Math.round(profile.avg_rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm opacity-70">{profile.review_count} total reviews</p>
            </div>

            {/* Rating Distribution */}
            <div className="card p-6">
              <h3 className="text-sm font-medium opacity-70 mb-4">Rating Distribution</h3>
              <RatingDistribution distribution={ratingDistribution} />
            </div>
          </div>
        ) : (
          <div className="card p-8 text-center mb-8">
            <p className="text-lg mb-2">No reviews yet</p>
            <p className="text-sm opacity-70">Be the first to rate {displayName}!</p>
          </div>
        )}

        {/* Review Form */}
        <div className="card p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Submit a Review</h2>
          <ReviewForm
            defaultName={displayName}
            onSubmitted={async () => {
              await refresh();
            }}
          />
        </div>

        {/* Reviews List */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Recent Reviews</h2>
          {reviews.length === 0 ? (
            <p className="text-center py-12 opacity-70">No reviews yet</p>
          ) : (
            <div className="space-y-4">
              {reviews.map((r) => (
                <div key={r.id} className="card p-6">
                  <div className="flex items-center gap-2 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < r.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                    <span className="text-sm opacity-70 ml-2">
                      <Calendar className="h-3 w-3 inline mr-1" />
                      {new Date(r.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  {r.comment && <p className="opacity-90">{r.comment}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
