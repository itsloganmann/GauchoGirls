import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import Link from "next/link";
import { Search, TrendingUp, Shield, Sparkles, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900/10">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative section overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10" />
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
          
          <div className="container-hero space-y-12 animate-fade-in">
            {/* Main Heading */}
            <div className="space-y-6">
              <div className="text-6xl sm:text-8xl font-bold tracking-tight">
                <div className="block text-6xl sm:text-7xl mb-4 animate-scale-in">🦝🌴</div>
                <h1 className="gradient-text animate-slide-up">GauchoGirls</h1>
              </div>
              
              <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed animate-slide-up delay-200">
                Anonymously rate your experience with Isla Vista women
              </p>
              
              <p className="text-sm text-gray-500 dark:text-gray-400 animate-slide-up delay-300">
                Like RateMyProfessor, but for IV guys to rate IV girls
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center pt-8 animate-slide-up delay-500">
              <Link href="/leaderboard" className="btn-primary px-10 py-4 text-lg gap-3 hover-glow group">
                <TrendingUp className="h-6 w-6 group-hover:scale-110 transition-transform" />
                <span>View Leaderboard</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Search Form */}
            <div className="pt-16 max-w-2xl mx-auto animate-slide-up delay-700">
              <form action="/search" method="GET" className="group">
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                  <input
                    id="name-input"
                    name="q"
                    type="text"
                    required
                    placeholder="Search for someone special..."
                    className="input pl-16 pr-6 py-5 text-lg w-full bg-white/80 dark:bg-gray-900/80 border-white/50 dark:border-gray-700/50 focus:bg-white dark:focus:bg-gray-900 shadow-lg focus:shadow-xl"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section border-t border-gray-200/50 dark:border-gray-800/50 bg-white/50 dark:bg-gray-900/20">
          <div className="container-page">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Why Choose GauchoGirls?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                The most trusted platform for honest, anonymous reviews in Isla Vista
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="card-hover text-center space-y-6 p-8 group animate-slide-up">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 text-white group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Shield className="h-8 w-8" />
                </div>
                <div className="space-y-3">
                  <h3 className="font-bold text-xl text-gray-900 dark:text-white">100% Anonymous</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Your identity is never shared. Rate freely and honestly with complete privacy protection.
                  </p>
                </div>
              </div>
              
              {/* Feature 2 */}
              <div className="card-hover text-center space-y-6 p-8 group animate-slide-up delay-200">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-pink-600 text-white group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Sparkles className="h-8 w-8" />
                </div>
                <div className="space-y-3">
                  <h3 className="font-bold text-xl text-gray-900 dark:text-white">Real Reviews</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    See what others really think with verified ratings and authentic experiences.
                  </p>
                </div>
              </div>
              
              {/* Feature 3 */}
              <div className="card-hover text-center space-y-6 p-8 group animate-slide-up delay-400 sm:col-span-2 lg:col-span-1">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <TrendingUp className="h-8 w-8" />
                </div>
                <div className="space-y-3">
                  <h3 className="font-bold text-xl text-gray-900 dark:text-white">Live Rankings</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Discover top-rated profiles updated in real-time with dynamic leaderboards.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="section bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 text-white">
          <div className="container-page text-center">
            <div className="grid sm:grid-cols-3 gap-8 animate-fade-in">
              <div className="space-y-2">
                <div className="text-4xl sm:text-5xl font-bold">1000+</div>
                <div className="text-purple-100">Active Profiles</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl sm:text-5xl font-bold">5000+</div>
                <div className="text-purple-100">Reviews Posted</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl sm:text-5xl font-bold">100%</div>
                <div className="text-purple-100">Anonymous</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
