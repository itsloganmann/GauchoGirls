"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-10 h-10" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 hover:scale-105 hover:shadow-lg group"
      aria-label="Toggle theme"
    >
      <div className="relative">
        {theme === "dark" ? (
          <Sun className="h-5 w-5 text-yellow-500 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
        ) : (
          <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-12" />
        )}
      </div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
    </button>
  );
} 