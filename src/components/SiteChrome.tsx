import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-3xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold hover:opacity-80 transition-opacity">
          🦝🌴 GauchoGirls
        </Link>
        <nav className="space-x-4 text-sm">
          <Link href="/leaderboard" className="underline hover:no-underline">
            🏆 view leaderboard
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-auto">
      <div className="mx-auto max-w-3xl px-4 py-6">
        <nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm mb-4">
          <Link href="/tos" className="underline hover:no-underline">
            TOS
          </Link>
          <Link href="/privacy" className="underline hover:no-underline">
            PRIVACY
          </Link>
          <Link href="/legal" className="underline hover:no-underline">
            LEGAL
          </Link>
          <Link href="/contact" className="underline hover:no-underline">
            CONTACT
          </Link>
        </nav>
        <p className="text-sm text-gray-600">
          GauchoGirls is <em>not</em> affiliated with UCSB
        </p>
      </div>
    </footer>
  );
}
