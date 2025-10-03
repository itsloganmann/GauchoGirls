"use client";

import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Star, Trophy, TrendingUp, Clock, Filter, Users, Award } from "lucide-react";

type Profile = {
  slug: string;
  name: string;
  avg_rating: number;
  review_count: number;
};

type SortType = "rating" | "count" | "recent";

export default function LeaderboardPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortType>("rating");
  const [minReviews, setMinReviews] = useState(1);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await fetch("/api/leaderboard");
      if (res.ok) {
        const json = await res.json();
        setProfiles(json.data || []);
      }
      setLoading(false);
    }
    load();
  }, []);

  const sortedProfiles = [...profiles]
    .filter(p => p.review_count >= minReviews)
    .sort((a, b) => {
      if (sortBy === "rating") return b.avg_rating - a.avg_rating;
      if (sortBy === "count") return b.review_count - a.review_count;
      return 0; // "recent" would need last_review_at field
    });

  const getRankIcon = (index: number) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return `#${index + 1}`;
  };

  const getRankStyle = (index: number) => {
    if (index === 0) return "bg-gradient-to-br from-yellow-400 to-yellow-600 text-white ring-4 ring-yellow-400/30";
    if (index === 1) return "bg-gradient-to-br from-gray-400 to-gray-600 text-white ring-4 ring-gray-400/30";
    if (index === 2) return "bg-gradient-to-br from-orange-400 to-orange-600 text-white ring-4 ring-orange-400/30";
    return "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400";
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900/10">
      <SiteHeader />
      <main className="flex-1 container-page px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-yellow-400 to-yellow-600 text-white mb-6 shadow-xl">
            <Trophy className="h-10 w-10" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            🏆 Leaderboard
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover the top-rated profiles in Isla Vista
          </p>
        </div>

        {/* Controls */}
        <div className="mb-8 animate-slide-up">
          <div className="card p-6 space-y-6">
            {/* Sort Tabs */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Filter className="h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort by</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSortBy("rating")}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                    sortBy === "rating"
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  <Trophy className="h-4 w-4" />
                  Top Rated
                </button>
                <button
                  onClick={() => setSortBy("count")}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                    sortBy === "count"
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  <TrendingUp className="h-4 w-4" />
                  Most Reviewed
                </button>
              </div>
            </div>

            {/* Minimum Reviews Filter */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Minimum reviews</span>
              </div>
              <select
                value={minReviews}
                onChange={(e) => setMinReviews(Number(e.target.value))}
                className="input max-w-xs"
              >
                <option value={1}>1+ reviews</option>
                <option value={3}>3+ reviews</option>
                <option value={5}>5+ reviews</option>
                <option value={10}>10+ reviews</option>
              </select>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        {loading ? (
          <div className="text-center py-20 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 animate-pulse mb-6 shadow-xl">
              <Trophy className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Loading Leaderboard</h3>
            <p className="text-gray-600 dark:text-gray-400">Fetching the latest rankings...</p>
          </div>
        ) : sortedProfiles.length === 0 ? (
          <div className="card text-center py-16 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 mb-4">
              <Users className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Profiles Found</h3>
            <p className="text-gray-600 dark:text-gray-400">Try adjusting your filters to see more results.</p>
          </div>
        ) : (
          <div className="space-y-4 animate-slide-up">
            {sortedProfiles.map((profile, index) => (
              <Link
                key={profile.slug}
                href={`/profile/${profile.slug}`}
                className={`card-hover block p-6 group ${
                  index < 3 ? "ring-2 ring-purple-200/50 dark:ring-purple-800/30" : ""
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    {/* Rank Badge */}
                    <div className={`flex items-center justify-center w-14 h-14 rounded-2xl font-bold text-lg transition-all duration-300 group-hover:scale-110 ${getRankStyle(index)}`}>
                      {index < 3 ? (
                        <span className="text-2xl">{getRankIcon(index)}</span>
                      ) : (
                        <span>#{index + 1}</span>
                      )}
                    </div>

                    {/* Profile Info */}
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {profile.name}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {profile.review_count} reviews
                        </span>
                        {index < 3 && (
                          <span className="flex items-center gap-1 text-purple-600 dark:text-purple-400">
                            <Award className="h-4 w-4" />
                            Top {index + 1}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {[...Array(5)].map((_, starIdx) => (
                        <Star
                          key={starIdx}
                          className={`h-5 w-5 transition-colors ${
                            starIdx < Math.round(profile.avg_rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300 dark:text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {Number(profile.avg_rating).toFixed(1)}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        out of 5
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Stats Summary */}
        {!loading && sortedProfiles.length > 0 && (
          <div className="mt-12 card p-6 animate-fade-in">
            <div className="grid sm:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {sortedProfiles.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Profiles Shown
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {sortedProfiles.reduce((sum, p) => sum + p.review_count, 0)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Total Reviews
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {sortedProfiles.length > 0 ? (
                    (sortedProfiles.reduce((sum, p) => sum + p.avg_rating, 0) / sortedProfiles.length).toFixed(1)
                  ) : "0.0"}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Average Rating
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
