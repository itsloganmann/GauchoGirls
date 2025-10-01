import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import Link from "next/link";
import { Search, TrendingUp, Shield, Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative section">
          <div className="absolute inset-0 -z-10 opacity-25">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20" />
          </div>
          
          <div className="container-hero space-y-8">
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight">
              <span className="block">🦝🌴</span>
              <span className="gradient-text">GauchoGirls</span>
            </h1>
            
            <p className="text-xl sm:text-2xl opacity-90 max-w-2xl mx-auto">
              Anonymously rate your experience with Isla Vista women
            </p>
            
            <p className="text-sm opacity-70">
              Like RateMyProfessor, but for IV guys to rate IV girls
            </p>

            <div className="flex justify-center pt-4">
              <Link href="/leaderboard" className="btn-primary px-8 py-4 gap-2">
                <TrendingUp className="h-5 w-5" />
                View Leaderboard
              </Link>
            </div>

            {/* Search Form */}
            <form action="/search" method="GET" className="pt-12 max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="name-input"
                  name="q"
                  type="text"
                  required
                  placeholder="Search for a name..."
                  className="input pl-12 text-lg"
                />
              </div>
            </form>
          </div>
        </section>

        {/* Features */}
        <section className="section border-t border-gray-200 dark:border-gray-800">
          <div className="container-page">
            <div className="grid sm:grid-cols-3 gap-8">
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold">100% Anonymous</h3>
                <p className="text-sm opacity-70">Your identity is never shared. Rate freely and honestly.</p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-pink-100 dark:bg-pink-900/30">
                  <Sparkles className="h-6 w-6 text-pink-600" />
                </div>
                <h3 className="font-semibold">Real Reviews</h3>
                <p className="text-sm opacity-70">See what others really think with verified ratings.</p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold">Live Rankings</h3>
                <p className="text-sm opacity-70">Discover top-rated profiles updated in real-time.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
