"use client";

import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Star, Trophy, TrendingUp, Clock } from "lucide-react";

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

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-5xl px-4 py-8 w-full">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">🏆 Leaderboard</h1>
          <p className="opacity-70">Discover the top-rated profiles</p>
        </div>

        {/* Tabs & Filters */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setSortBy("rating")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                sortBy === "rating"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : "border hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <Trophy className="h-4 w-4" />
              Top Rated
            </button>
            <button
              onClick={() => setSortBy("count")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                sortBy === "count"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : "border hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <TrendingUp className="h-4 w-4" />
              Most Reviewed
            </button>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <label className="opacity-70">Minimum reviews:</label>
            <select
              value={minReviews}
              onChange={(e) => setMinReviews(Number(e.target.value))}
              className="px-3 py-1 rounded-lg border bg-white dark:bg-gray-900"
            >
              <option value={1}>1+</option>
              <option value={3}>3+</option>
              <option value={5}>5+</option>
              <option value={10}>10+</option>
            </select>
          </div>
        </div>

        {/* Leaderboard List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-pulse text-lg">Loading...</div>
          </div>
        ) : sortedProfiles.length === 0 ? (
          <div className="text-center py-12 border rounded-xl">
            <p className="opacity-70">No profiles match your filters</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedProfiles.map((p, i) => (
              <Link
                key={p.slug}
                href={`/profile/${p.slug}`}
                className="block border rounded-xl p-4 hover:border-purple-500 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                      i === 0 ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30" :
                      i === 1 ? "bg-gray-100 text-gray-600 dark:bg-gray-800" :
                      i === 2 ? "bg-orange-100 text-orange-600 dark:bg-orange-900/30" :
                      "bg-gray-50 text-gray-500 dark:bg-gray-900"
                    }`}>
                      #{i + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold group-hover:text-purple-600 transition-colors">
                        {p.name}
                      </h3>
                      <p className="text-sm opacity-70">{p.review_count} reviews</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, starIdx) => (
                        <Star
                          key={starIdx}
                          className={`h-4 w-4 ${
                            starIdx < Math.round(p.avg_rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold text-lg">{Number(p.avg_rating).toFixed(1)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
