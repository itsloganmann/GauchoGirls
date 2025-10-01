import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-2xl px-4 py-16">
        <div className="space-y-6 text-center">
          <h1 className="text-4xl font-bold">🦝🌴 GauchoGirls</h1>
          
          <p className="text-lg">
            anonymously rate your experience with isla vista women
          </p>
          
          <p className="text-sm text-gray-600">
            (like RateMyProfessor but for iv guys to rate iv girls)
          </p>

          <div className="pt-4">
            <Link
              href="/leaderboard"
              className="inline-block text-blue-600 underline hover:no-underline font-semibold"
            >
              view anonymously
            </Link>
          </div>

          <form action="/search" method="GET" className="pt-8 space-y-4 max-w-md mx-auto">
            <div className="text-left">
              <label htmlFor="name-input" className="block text-sm mb-2">
                Please enter a name.
              </label>
              <input
                id="name-input"
                name="q"
                type="text"
                required
                placeholder="e.g., Jane Doe"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors font-medium"
            >
              Search
            </button>
          </form>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
