"use client";

import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import {
  ArrowRight,
  HeartHandshake,
  Search,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const trendingProfiles = [
  {
    name: "Ajit Saro",
    subtitle: "Top rated",
    rating: "4.9",
    delta: "+3 spots",
  },
  {
    name: "Logan Mann",
    subtitle: "Most reviewed",
    rating: "4.8",
    delta: "+2 spots",
  },
  {
    name: "Camila Diaz",
    subtitle: "Surging",
    rating: "4.7",
    delta: "+5 spots",
  },
];

const highlights = [
  {
    icon: Shield,
    title: "Privacy is sacred",
    copy:
      "Identifying info is stripped and submissions are encrypted so your voice stays anonymous, always.",
  },
  {
    icon: Sparkles,
    title: "Signal over noise",
    copy: "Smart moderation keeps spam out and lifts the reviews that actually help the community decide.",
  },
  {
    icon: TrendingUp,
    title: "Dynamic rankings",
    copy: "Watch profiles rise and fall in real time with momentum badges, trend lines, and performance deltas.",
  },
];

const tickerQuotes = [
  "Bagel Café walk-of-shame escort — 4.8 ⭐",
  "Lagomarsino sunset picnic date — 5.0 ⭐",
  "DP block party designated driver — 4.9 ⭐",
  "Freebirds late-night wings run — 4.7 ⭐",
  "Library marathon study buddy — 4.6 ⭐",
  "Sands Beach sunrise surfer — 4.8 ⭐",
  "I.V. Food Co-Op snack savior — 5.0 ⭐",
  "Thrifted fit concierge — 4.7 ⭐",
  "Skateboard lesson under Storke Tower — 4.9 ⭐",
  "Emergency birthday cake decorator — 4.8 ⭐",
  "Holiday lights mission down DP — 4.6 ⭐",
  "CS assignment debugging hero — 5.0 ⭐",
];

const reviewPreview = {
  quote:
    "Met at Lagomarsino. Respectful, witty, and made sure everyone got home safe. Not just the pretty face everyone talks about.",
  context: "15 minutes ago",
};

const safetyHighlights = [
  "Secure DMCA takedowns",
  "Instant flagging",
  "Human + AI moderation",
  "24/7 monitoring",
];

const reviewChecklist = [
  "Earn badges when your review trends",
  "Edgy but respectful—keep it constructive",
  "Switch between light & midnight modes",
];

const trustChips = [
  { icon: Star, label: "4.9 community trust" },
  { icon: Search, label: "10k+ monthly lookups" },
  { icon: Shield, label: "Built for total anonymity" },
];

const marqueeTags = [
  "100% anonymous",
  "Community-abiding",
  "Invite-only moderation",
  "Encrypted submissions",
];

const topCreatorShoutouts = [
  "Skylar — \"Always the life of the party at Bagel Café.\"",
  "Mar — \"Held it down for game day Skribbl.\"",
  "Jules — \"Late night drive with aux on point.\"",
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <HighlightsSection />
        <TickerSection />
        <ReviewSection />
        <SafetySection />
      </main>
      <SiteFooter />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="section relative overflow-hidden">
      <div className="absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/15 via-purple-500/12 to-pink-500/12" />
        <motion.div
          className="absolute -top-20 -left-40 h-96 w-96 rounded-full blur-blob bg-gradient-to-br from-purple-500/40 via-pink-500/30 to-indigo-400/30"
          animate={{ scale: [1, 1.04, 0.96, 1], rotate: [0, 8, -6, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full blur-blob bg-gradient-to-tr from-sky-400/30 via-purple-400/20 to-pink-400/25"
          animate={{ scale: [1.05, 0.92, 1], rotate: [12, -10, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container-hero">
        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <LeftHeroColumn />
          <RightHeroColumn />
        </div>
      </div>
    </section>
  );
}

function LeftHeroColumn() {
  return (
    <div className="space-y-10 text-left">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="stat-chip bg-white/80 text-indigo-600 shadow-sm dark:bg-white/15 dark:text-indigo-100">
          🦝 Trusted by IV insiders
        </span>
      </motion.div>

      <div className="space-y-6">
        <motion.h1
          className="text-5xl font-extrabold leading-tight text-slate-900 drop-shadow-[0_16px_25px_rgba(63,45,167,0.08)] dark:text-white sm:text-6xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease: "easeOut" }}
        >
          Anonymous reviews with <span className="gradient-text">unapologetic honesty.</span>
        </motion.h1>
        <motion.p
          className="max-w-xl text-lg text-slate-600 dark:text-slate-300"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          GauchoGirls is Isla Vista&apos;s unofficial pulse check—discover who&apos;s trending, and add your story without ever compromising privacy.
        </motion.p>
      </div>

      <motion.div
        className="flex flex-wrap items-center gap-6"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <Link href="/leaderboard" className="btn-primary gap-2 text-base">
          <TrendingUp className="h-5 w-5" />
          Explore leaderboard
          <ArrowRight className="h-5 w-5" />
        </Link>
        <Link href="#share-review" className="btn-secondary gap-2 text-base">
          <Sparkles className="h-5 w-5" />
          Share a review
        </Link>
      </motion.div>

      <motion.div
        className="flex flex-wrap gap-4 pt-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.6 }}
      >
        {trustChips.map(({ icon: Icon, label }) => (
          <span key={label} className="stat-chip">
            <Icon className="h-4 w-4 text-indigo-500" />
            {label}
          </span>
        ))}
      </motion.div>

      <motion.form
        action="/search"
        method="GET"
        className="group relative max-w-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.6 }}
      >
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500/25 via-purple-500/25 to-pink-500/20 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100" />
        <div className="relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-indigo-300" />
          <input
            id="name-input"
            name="q"
            type="text"
            required
            placeholder="Search the IV social scene..."
            className="input py-5 pl-16 pr-5 text-lg font-medium text-slate-800 shadow-lg shadow-indigo-500/10 focus:bg-white focus:shadow-indigo-500/20 dark:text-slate-100 dark:shadow-black/40"
          />
        </div>
      </motion.form>
    </div>
  );
}

function RightHeroColumn() {
  return (
    <motion.div
      className="relative flex justify-center lg:justify-end"
      initial={{ opacity: 0, scale: 0.96, y: 26 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.75, ease: "easeOut" }}
    >
      <div className="neo-card w-full max-w-md overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-purple-400/40 blur-3xl" />
        <div className="relative z-10 px-10 pb-12 pt-14">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-indigo-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-indigo-600 dark:bg-white/5 dark:text-indigo-200">
              live snapshot
            </span>
            <span className="rounded-full bg-white/50 px-4 py-1 text-sm font-semibold text-slate-700 shadow-sm dark:bg-white/10 dark:text-white">
              Trending now
            </span>
          </div>

          <div className="mt-8 space-y-6">
            {trendingProfiles.map(({ name, subtitle, rating, delta }, idx) => (
              <motion.div
                key={name}
                className="rounded-2xl border border-white/30 bg-white/70 px-5 py-4 dark:border-white/10 dark:bg-white/5"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + idx * 0.08, duration: 0.5 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">{name}</p>
                      <span className="text-xs text-slate-500 dark:text-slate-300">{subtitle}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-lg font-bold text-slate-900 dark:text-white">{rating}</span>
                    <span className="text-xs text-purple-500">{delta}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-10 flex items-center gap-4 rounded-2xl bg-gradient-to-r from-indigo-500/15 via-purple-500/15 to-pink-500/15 px-6 py-5 text-sm text-slate-700 backdrop-blur dark:text-slate-200"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.48, duration: 0.6 }}
          >
            <HeartHandshake className="h-5 w-5 text-pink-500" />
            <p>
              Reviews are anonymously verified before publishing. We protect contributors and the community equally.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function HighlightsSection() {
  return (
    <section className="section">
      <div className="container-page">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl font-semibold text-slate-900 dark:text-white">
            Why GauchoGirls leads the IV grapevine
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Built by Isla Vista insiders, designed to guard your identity, and tuned for the stories that matter.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {highlights.map(({ icon: Icon, title, copy }, idx) => (
            <motion.div
              key={title}
              className="card-hover relative overflow-hidden p-8"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
            >
              <div className="absolute right-6 top-6 h-20 w-20 rounded-full bg-gradient-to-tr from-indigo-500/20 to-pink-500/10 blur-lg" />
              <div className="relative z-10 space-y-4">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{title}</h3>
                <p className="text-sm leading-6 text-slate-500 dark:text-slate-300">{copy}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TickerSection() {
  return (
    <section className="section bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white">
      <div className="container-page">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div className="max-w-2xl space-y-4">
              <h2 className="text-4xl font-semibold tracking-tight">Reviews in motion</h2>
              <p className="text-lg text-indigo-100">
                Fresh praise and tea flow nonstop. Our real-time ticker captures the vibe pulsing through Del Playa.
              </p>
            </div>

            <div className="relative overflow-hidden">
              <div className="marquee group border-y border-white/10 py-6 text-sm tracking-wide text-white/80">
                {tickerQuotes.concat(tickerQuotes).map((quote, idx) => (
                  <span key={`${quote}-${idx}`} className="flex items-center gap-3">
                    <Sparkles className="h-4 w-4 text-pink-300" />
                    {quote}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {marqueeTags.map((tag) => (
                <div
                  key={tag}
                  className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-sm font-semibold text-indigo-50 backdrop-blur"
                >
                  {tag}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="neo-card overflow-hidden bg-white/10 p-10 text-slate-900 shadow-2xl dark:text-white">
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/20 via-purple-500/10 to-transparent" />
              <div className="relative space-y-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-slate-900 shadow-md">
                    🏆
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-500">top creators</p>
                    <p className="text-sm font-medium text-slate-500">Profiles heating up this week</p>
                  </div>
                </div>

                <div className="space-y-5 text-sm text-slate-600 dark:text-slate-200">
                  {topCreatorShoutouts.map((quote, idx) => (
                    <motion.blockquote
                      key={quote}
                      className="rounded-2xl border border-white/30 bg-white/80 px-5 py-4 shadow-md dark:border-white/10 dark:bg-white/5"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 + idx * 0.12, duration: 0.5 }}
                    >
                      {quote}
                    </motion.blockquote>
                  ))}
                </div>

                <div className="rounded-2xl border border-white/30 bg-white/90 p-6 shadow-lg dark:border-white/10 dark:bg-white/10">
                  <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-300">5,420+</p>
                  <p className="text-sm font-medium text-indigo-500 dark:text-indigo-200">reviews shared anonymously</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ReviewSection() {
  return (
    <section className="section" id="share-review">
      <div className="container-page">
        <motion.div
          className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
        >
          <div className="space-y-6">
            <span className="stat-chip bg-indigo-50 text-indigo-700 shadow-sm dark:bg-indigo-500/10 dark:text-indigo-200">
              Leave a mark
            </span>
            <h2 className="text-4xl font-semibold text-slate-900 dark:text-white">
              Share your experience in under 60 seconds
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Craft a thoughtful review with floating labels, real-time validation, and an anonymous CAPTCHA so the community stays legit.
            </p>
            <div className="grid gap-4">
              {reviewChecklist.map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 shadow-sm dark:bg-indigo-500/20 dark:text-indigo-200">
                    ✓
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="neo-card overflow-hidden border border-white/20 bg-white/90 shadow-xl dark:border-white/10 dark:bg-white/5">
            <div className="absolute inset-x-0 -top-24 h-48 bg-gradient-to-r from-indigo-300/40 via-purple-300/40 to-pink-200/35 blur-3xl" />
            <div className="relative z-10 space-y-4 p-10">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-500 dark:text-indigo-200">
                review preview
              </span>
              <div className="rounded-2xl border border-indigo-100 bg-white/90 p-6 shadow-lg dark:border-white/10 dark:bg-white/5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Anonymous</p>
                    <p className="text-xs text-slate-500 dark:text-slate-300">{reviewPreview.context}</p>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star key={idx} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-200">“{reviewPreview.quote}”</p>
              </div>

              <div className="rounded-2xl border border-white/40 bg-white/90 p-6 shadow-lg dark:border-white/10 dark:bg-white/5">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-500 dark:text-indigo-200">
                  verification
                </p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-200">
                  Cloudflare Turnstile filters the bots. No logins, no drama—just protected anonymity.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SafetySection() {
  return (
    <section className="section pt-0">
      <div className="container-page">
        <motion.div
          className="neo-card overflow-hidden border border-white/10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
        >
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="relative">
              <Image
                src="/window.svg"
                alt="Isla Vista vibes"
                width={620}
                height={420}
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-6 left-6 rounded-2xl bg-white/80 px-5 py-3 text-xs font-medium text-slate-700 shadow-lg dark:bg-white/10 dark:text-white">
                Captured off Del Playa • 10:42pm
              </div>
            </div>
            <div className="space-y-6 px-10 py-12">
              <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">
                We&apos;re building the safest space for bold feedback
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-300">
                Every review goes through dedicated checks. You stay anonymous while profiles earn real clout. Zero tolerance for harassment.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {safetyHighlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm font-medium text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
