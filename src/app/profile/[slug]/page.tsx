"use client";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { Star, Share2, TrendingUp, Calendar, User, MessageCircle } from "lucide-react";
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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900/10">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-6 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 animate-pulse shadow-xl">
            <User className="h-10 w-10 text-white" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Loading Profile</h3>
            <p className="text-gray-600 dark:text-gray-400">Fetching the latest information...</p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900/10">
      <SiteHeader />
      <main className="flex-1 container-page px-6 py-12">
        {/* Profile Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white mb-6 shadow-xl">
            <User className="h-12 w-12" />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
              {displayName}
            </h1>
            
            {profile && (
              <div className="flex items-center justify-center gap-6 text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  {profile.review_count} reviews
                </span>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 hover-lift"
                >
                  <Share2 className="h-4 w-4" />
                  Share Profile
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        {profile ? (
          <div className="grid lg:grid-cols-2 gap-8 mb-12 animate-slide-up">
            {/* Overall Rating Card */}
            <div className="card p-8 text-center space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Overall Rating
                </h3>
                <div className="text-6xl font-bold text-gray-900 dark:text-white">
                  {Number(profile.avg_rating).toFixed(1)}
                </div>
              </div>
              
              <div className="flex justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-8 w-8 ${
                      i < Math.round(profile.avg_rating) 
                        ? "fill-yellow-400 text-yellow-400" 
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                ))}
              </div>
              
              <div className="space-y-1">
                <p className="text-lg font-medium text-gray-900 dark:text-white">
                  {profile.review_count} total reviews
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Based on authentic experiences
                </p>
              </div>
            </div>

            {/* Rating Distribution Card */}
            <div className="card p-8 space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Rating Breakdown
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  How others have rated this profile
                </p>
              </div>
              <RatingDistribution distribution={ratingDistribution} />
            </div>
          </div>
        ) : (
          <div className="card p-12 text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 mb-6">
              <MessageCircle className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No Reviews Yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              Be the first to share your experience with {displayName}! Your honest review helps others make informed decisions.
            </p>
          </div>
        )}

        {/* Review Form */}
        <div className="card p-8 mb-12 animate-slide-up">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Share Your Experience
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Your anonymous review helps others in the Isla Vista community. Be honest, respectful, and constructive.
            </p>
          </div>
          
          <ReviewForm
            defaultName={displayName}
            onSubmitted={async () => {
              await refresh();
            }}
          />
        </div>

        {/* Reviews List */}
        <div className="animate-slide-up">
          <div className="flex items-center gap-3 mb-8">
            <MessageCircle className="h-6 w-6 text-gray-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Recent Reviews
            </h2>
            {reviews.length > 0 && (
              <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium">
                {reviews.length}
              </span>
            )}
          </div>
          
          {reviews.length === 0 ? (
            <div className="card p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 mb-4">
                <MessageCircle className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No Reviews Yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Reviews will appear here once submitted and verified.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review, index) => (
                <div 
                  key={review.id} 
                  className="card p-6 hover-lift"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {/* Rating Stars */}
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < review.rating 
                                ? "fill-yellow-400 text-yellow-400" 
                                : "text-gray-300 dark:text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                      
                      {/* Rating Badge */}
                      <span className="px-2 py-1 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 text-sm font-medium">
                        {review.rating}/5
                      </span>
                    </div>
                    
                    {/* Date */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="h-4 w-4" />
                      {new Date(review.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                  
                  {/* Comment */}
                  {review.comment && (
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        &ldquo;{review.comment}&rdquo;
                      </p>
                    </div>
                  )}
                  
                  {!review.comment && (
                    <p className="text-gray-500 dark:text-gray-400 italic">
                      No additional comment provided.
                    </p>
                  )}
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
