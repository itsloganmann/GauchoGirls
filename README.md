# 🦝🌴 GauchoGirls

Anonymously rate your experience with Isla Vista women - like RateMyProfessor but for IV guys to rate IV girls.

## Features

- **Anonymous Reviews**: Submit reviews without creating an account
- **Rating System**: 1-5 star ratings with optional comments
- **Leaderboard**: See top-rated profiles
- **Rate Limiting**: One review per person per day (by IP)
- **Bot Protection**: Cloudflare Turnstile CAPTCHA integration
- **Privacy-First**: IP addresses are hashed, never stored in plain text

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Supabase (PostgreSQL)
- **Security**: Row Level Security (RLS), Turnstile CAPTCHA
- **Testing**: Vitest (unit), Playwright (E2E)
- **Hosting**: Vercel (free tier)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account (free tier)
- Cloudflare account for Turnstile (free)
- Vercel account for deployment (free)

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy `.env.local.example` to `.env.local` and fill in your credentials:
   ```bash
   cp .env.local.example .env.local
   ```

4. Set up your Supabase database by running the SQL in `supabase-schema.sql` in your Supabase SQL Editor

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

### Running Tests

```bash
# Unit tests
npm run test

# E2E tests
npx playwright test

# Type checking
npm run build
```

## Deployment

See `SETUP.md` for detailed step-by-step deployment instructions.

## License

MIT

## Disclaimer

GauchoGirls is NOT affiliated with UCSB.
