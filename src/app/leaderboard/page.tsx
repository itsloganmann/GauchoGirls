import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import Link from "next/link";

async function fetchLeaderboard() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/leaderboard`, { cache: "no-store" });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data || [];
}

export default async function LeaderboardPage() {
  const profiles = await fetchLeaderboard();

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-3xl px-4 py-12 w-full">
        <h2 className="text-3xl font-bold mb-8">🏆 Leaderboard</h2>
        {profiles.length === 0 ? (
          <p className="text-gray-600 text-center py-12">No profiles yet!</p>
        ) : (
          <ul className="space-y-3">
            {profiles.map((p: { slug: string; name: string; avg_rating: number; review_count: number }, i: number) => (
              <li key={p.slug} className="flex justify-between border rounded px-4 py-3">
                <Link href={`/profile/${p.slug}`} className="underline">#{i+1} {p.name}</Link>
                <span>⭐ {Number(p.avg_rating).toFixed(2)} ({p.review_count})</span>
              </li>
            ))}
          </ul>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}

export const dynamic = "force-dynamic";
