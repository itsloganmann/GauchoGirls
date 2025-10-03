"use client";

import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function SiteHeader() {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/10 dark:border-gray-800/50">
      <div className="container-page px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-2xl font-bold hover:opacity-80 transition-all duration-300 ease-out hover:scale-105 flex-shrink-0"
          >
            <span className="gradient-text">🦝🌴 GauchoGirls</span>
          </Link>
          
          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md mx-8 hidden lg:block">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for someone..."
                className="input pl-12 pr-4 py-3 text-sm bg-white/70 dark:bg-gray-900/70 border-white/20 dark:border-gray-700/50 focus:bg-white dark:focus:bg-gray-900"
              />
            </div>
          </form>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link 
              href="/leaderboard" 
              className="text-sm font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 flex items-center gap-2 hover-lift"
            >
              🏆 <span>Leaderboard</span>
            </Link>
            <ThemeToggle />
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/10 dark:bg-gray-800/50 border border-white/20 dark:border-gray-700/50 hover:bg-white/20 dark:hover:bg-gray-700/50 transition-all duration-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-white/10 dark:border-gray-800/50 animate-fade-in">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for someone..."
                  className="input pl-12 pr-4 py-3 text-sm w-full"
                />
              </div>
            </form>
            <Link 
              href="/leaderboard" 
              className="flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-white/10 dark:hover:bg-gray-800/50 transition-colors duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              🏆 <span className="font-medium">Leaderboard</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-gray-200/50 dark:border-gray-800/50 mt-auto bg-gray-50/50 dark:bg-gray-900/20">
      <div className="container-page px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Brand */}
          <div>
            <Link href="/" className="text-xl font-bold gradient-text hover:opacity-80 transition-opacity">
              🦝🌴 GauchoGirls
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 max-w-md">
              Anonymously rate your experience with Isla Vista women. Like RateMyProfessor, but for IV guys to rate IV girls.
            </p>
          </div>

          {/* Links */}
          <div>
            <nav className="flex flex-wrap gap-6 text-sm">
              <Link 
                href="/tos" 
                className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 hover-lift"
              >
                Terms of Service
              </Link>
              <Link 
                href="/privacy" 
                className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 hover-lift"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/legal" 
                className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 hover-lift"
              >
                Legal
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 hover-lift"
              >
                Contact
              </Link>
            </nav>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-4">
              GauchoGirls is <em>not</em> affiliated with UCSB
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
