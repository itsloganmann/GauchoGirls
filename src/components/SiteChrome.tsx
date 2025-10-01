"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function SiteHeader() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-black/30 border-b border-gray-200 dark:border-gray-800">
      <div className="container-page px-4 py-3 flex items-center gap-4">
        <Link href="/" className="text-xl font-bold hover:opacity-80 transition-opacity flex-shrink-0">
          🦝🌴 GauchoGirls
        </Link>
        
        <form onSubmit={handleSearch} className="flex-1 max-w-md hidden sm:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search name..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors text-sm"
            />
          </div>
        </form>

        <nav className="flex items-center gap-3">
          <Link href="/leaderboard" className="text-sm font-medium hover:opacity-80 transition-opacity hidden sm:inline">
            🏆 Leaderboard
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="container-page px-4 py-6">
        <nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm mb-4">
          <Link href="/tos" className="hover:text-purple-600 transition-colors">
            TOS
          </Link>
          <Link href="/privacy" className="hover:text-purple-600 transition-colors">
            Privacy
          </Link>
          <Link href="/legal" className="hover:text-purple-600 transition-colors">
            Legal
          </Link>
          <Link href="/contact" className="hover:text-purple-600 transition-colors">
            Contact
          </Link>
        </nav>
        <p className="text-sm opacity-70">
          GauchoGirls is <em>not</em> affiliated with UCSB
        </p>
      </div>
    </footer>
  );
}
