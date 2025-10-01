# 🚀 GauchoGirls Setup Guide

This guide will walk you through setting up and deploying GauchoGirls from scratch. No prior knowledge required!

## Table of Contents

1. [Create Supabase Account & Database](#1-create-supabase-account--database)
2. [Get Cloudflare Turnstile Keys](#2-get-cloudflare-turnstile-keys)
3. [Configure Environment Variables](#3-configure-environment-variables)
4. [Test Locally](#4-test-locally)
5. [Deploy to Vercel](#5-deploy-to-vercel)
6. [Final Verification](#6-final-verification)

---

## 1. Create Supabase Account & Database

Supabase provides a free PostgreSQL database with 500MB storage.

### Step 1.1: Sign Up for Supabase

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" → Sign up with GitHub (recommended)
3. Authorize Supabase to access your GitHub account

### Step 1.2: Create a New Project

1. Click "New Project"
2. Fill in:
   - **Name**: `gauchogirls`
   - **Database Password**: Generate a strong password (save it somewhere safe!)
   - **Region**: Choose closest to your users (e.g., `West US (North California)`)
   - **Pricing Plan**: Free
3. Click "Create new project"
4. Wait 2-3 minutes for the database to provision

### Step 1.3: Get Your Supabase Credentials

1. Once the project is ready, go to **Settings** (gear icon in sidebar) → **API**
2. Copy these two values (you'll need them later):
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

### Step 1.4: Run the Database Schema

1. Click **SQL Editor** in the left sidebar
2. Click "New query"
3. Open the file `supabase-schema.sql` in this project
4. Copy ALL the contents and paste into the Supabase SQL Editor
5. Click "Run" (or press Cmd/Ctrl + Enter)
6. You should see "Success. No rows returned" - this is correct!

### Step 1.5: Verify Tables Were Created

1. Click **Table Editor** in the left sidebar
2. You should see two tables: `profiles` and `reviews`
3. You should also see a view called `profile_stats`

✅ **Supabase is now set up!**

---

## 2. Get Cloudflare Turnstile Keys

Turnstile is a free CAPTCHA alternative that prevents bots from spamming reviews.

### Step 2.1: Sign Up for Cloudflare

1. Go to [https://dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)
2. Create a free account (just email + password)
3. Verify your email

### Step 2.2: Create a Turnstile Site

1. In the Cloudflare dashboard, click **Turnstile** in the left sidebar
   - If you don't see it, search for "Turnstile" in the top search bar
2. Click "Add site"
3. Fill in:
   - **Site name**: `GauchoGirls`
   - **Domain**: `localhost` (for testing) - we'll add your production domain later
   - **Widget Mode**: Managed
4. Click "Create"

### Step 2.3: Get Your Turnstile Keys

1. You'll see two keys:
   - **Site Key** (public, starts with `0x4...`)
   - **Secret Key** (private, long string)
2. Copy both keys - you'll need them next

### Step 2.4: Add Production Domain (After Deployment)

After you deploy to Vercel (Step 5), come back here and:
1. Click your Turnstile site → **Settings**
2. Under **Domains**, click "Add domain"
3. Add your Vercel domain (e.g., `gauchogirls.vercel.app`)
4. Save

✅ **Turnstile is configured!**

---

## 3. Configure Environment Variables

### Step 3.1: Create .env.local File

1. In the project root, copy the example file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Open `.env.local` in a text editor

3. Replace the placeholder values:

```bash
# From Supabase (Step 1.3)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# From Cloudflare Turnstile (Step 2.3)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAAA...
TURNSTILE_SECRET_KEY=0x4AAAAAAA...

# Leave this empty for now (add after Vercel deployment)
NEXT_PUBLIC_BASE_URL=
```

4. Save the file

✅ **Environment variables configured!**

---

## 4. Test Locally

Let's make sure everything works before deploying.

### Step 4.1: Install Dependencies

```bash
npm install
```

### Step 4.2: Run Tests

```bash
# Unit tests
npm run test

# Should show: "✓ 7 tests passed"
```

### Step 4.3: Start Development Server

```bash
npm run dev
```

You should see:
```
  ▲ Next.js 15.5.4
  - Local:        http://localhost:3000
```

### Step 4.4: Test the Site

1. Open [http://localhost:3000](http://localhost:3000) in your browser
2. You should see the GauchoGirls homepage
3. Click "🏆 view leaderboard" - should show empty leaderboard
4. Go back and search for a name (e.g., "Jane Doe")
5. You'll be redirected to `/profile/jane-doe`
6. The review form will show (CAPTCHA widget should load)

### Step 4.5: Test Review Submission (Optional)

**Note**: This will create a real database entry!

1. On a profile page, fill in:
   - Rating: 5
   - Comment: "Test review"
2. Complete the CAPTCHA
3. Click "Submit Review"
4. You should see success message
5. The review should appear below

### Step 4.6: Verify in Supabase

1. Go to your Supabase dashboard → **Table Editor**
2. Click `profiles` - you should see "jane-doe"
3. Click `reviews` - you should see your test review

✅ **Local testing complete!**

---

## 5. Deploy to Vercel

Vercel provides free hosting for Next.js apps with automatic deployments.

### Step 5.1: Push Code to GitHub

1. Initialize git (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - GauchoGirls"
   ```

2. Create a new repository on [GitHub](https://github.com/new):
   - Name: `gauchogirls`
   - Public or Private (your choice)
   - Don't initialize with README (we already have one)

3. Push your code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/gauchogirls.git
   git branch -M main
   git push -u origin main
   ```

### Step 5.2: Sign Up for Vercel

1. Go to [https://vercel.com/signup](https://vercel.com/signup)
2. Sign up with GitHub (same account as above)
3. Authorize Vercel

### Step 5.3: Import Your Project

1. Click "Add New..." → "Project"
2. Find your `gauchogirls` repository and click "Import"
3. **Framework Preset**: Next.js (should auto-detect)
4. **Root Directory**: `./` (default)

### Step 5.4: Add Environment Variables

Before deploying, click **Environment Variables** and add ALL of these:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase URL from Step 1.3 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key from Step 1.3 |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Your Turnstile site key from Step 2.3 |
| `TURNSTILE_SECRET_KEY` | Your Turnstile secret key from Step 2.3 |

⚠️ **Important**: Make sure to paste the correct values!

### Step 5.5: Deploy

1. Click "Deploy"
2. Wait 2-3 minutes for the build to complete
3. You'll see "🎉 Congratulations!" when done
4. Click "Visit" to see your live site!

### Step 5.6: Update Environment Variables

1. Copy your Vercel URL (e.g., `https://gauchogirls.vercel.app`)
2. In Vercel dashboard, go to **Settings** → **Environment Variables**
3. Add one more variable:
   - **Name**: `NEXT_PUBLIC_BASE_URL`
   - **Value**: Your full Vercel URL (e.g., `https://gauchogirls.vercel.app`)
4. Click "Save"
5. Go to **Deployments** tab → Click the three dots on the latest deployment → "Redeploy"

### Step 5.7: Update Turnstile Domain

1. Go back to Cloudflare Turnstile dashboard
2. Click your site → **Settings**
3. Under **Domains**, add your Vercel domain (e.g., `gauchogirls.vercel.app`)
4. Remove `localhost` if you want (or keep it for local testing)
5. Save

✅ **Deployment complete!**

---

## 6. Final Verification

### Step 6.1: Test Production Site

1. Visit your Vercel URL
2. Navigate to leaderboard (should be empty)
3. Search for a name
4. Submit a test review with CAPTCHA
5. Verify it appears on the profile and leaderboard

### Step 6.2: Check for Errors

1. In Vercel dashboard, click **Logs** → **Functions**
2. Refresh your site and submit a review
3. Check for any errors in the logs

### Step 6.3: Custom Domain (Optional)

If you have a custom domain (e.g., `gauchogirls.com`):

1. In Vercel: **Settings** → **Domains**
2. Add your domain and follow DNS instructions
3. Update `NEXT_PUBLIC_BASE_URL` to your custom domain
4. Update Turnstile domain to your custom domain
5. Redeploy

---

## 🎉 You're Done!

Your site is now live and fully functional! Here's what you have:

- ✅ Anonymous review submission
- ✅ CAPTCHA bot protection
- ✅ Rate limiting (1 review per person per day)
- ✅ Privacy-preserving (hashed IPs)
- ✅ Free hosting on Vercel
- ✅ Free database on Supabase

## Monitoring & Maintenance

### Check Usage

- **Supabase**: [Dashboard](https://supabase.com/dashboard) → Your project → Settings → Usage
- **Vercel**: [Dashboard](https://vercel.com/dashboard) → Your project → Analytics
- **Turnstile**: [Dashboard](https://dash.cloudflare.com) → Turnstile → Your site

### Free Tier Limits

- **Supabase**: 500MB database, 2GB bandwidth/month
- **Vercel**: 100GB bandwidth/month, 6000 build minutes
- **Turnstile**: Unlimited (completely free)

If you exceed limits, you'll get emails - but for a site like this, you likely won't.

## Troubleshooting

### "Profile not found" errors
- Check that your Supabase credentials are correct in Vercel environment variables
- Verify the database schema was run correctly

### CAPTCHA not showing
- Check that Turnstile domain includes your deployment URL
- Verify `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is set correctly

### "Review creation failed"
- Check Vercel function logs for errors
- Verify `TURNSTILE_SECRET_KEY` is set (without `NEXT_PUBLIC_` prefix)

### Need Help?

Open an issue on GitHub or check the logs in:
- Vercel → Logs → Functions
- Supabase → Logs → Postgres

---

**Enjoy your fully functional GauchoGirls site! 🦝🌴**
