# 📋 Manual Steps Required

This file lists ALL the manual steps you need to complete to get GauchoGirls live. Everything else is done.

**Time Required**: 30 minutes  
**Cost**: $0 (100% free)  
**Technical Knowledge**: None required - just follow the steps

---

## Step 1: Create Supabase Account (5 minutes)

**What is Supabase?** Free database hosting for your reviews and profiles.

1. Go to **[https://supabase.com](https://supabase.com)**
2. Click **"Start your project"**
3. Click **"Sign up with GitHub"** (or email if you prefer)
4. If using GitHub, click **"Authorize supabase"**
5. You'll be redirected to the Supabase dashboard

---

## Step 2: Create Supabase Project (3 minutes)

1. Click the **"New Project"** button
2. Fill in the form:
   - **Organization**: Select "Your organization" (or create one)
   - **Name**: Type `gauchogirls`
   - **Database Password**: Click the **dice icon** to generate a password → **COPY IT** somewhere safe
   - **Region**: Select **"West US (North California)"** (closest to UCSB)
   - **Pricing Plan**: Leave as **"Free"**
3. Click **"Create new project"**
4. Wait 2-3 minutes while it sets up (you'll see a progress bar)

---

## Step 3: Get Supabase Credentials (2 minutes)

1. Once your project is ready, click the **Settings** gear icon in the left sidebar
2. Click **"API"** in the settings menu
3. You'll see a section called **"Project API keys"**
4. **COPY these two values** (you'll need them later):
   - **URL**: (looks like `https://abcdefghijklmnop.supabase.co`)
   - **anon public**: (long string starting with `eyJ...`)

**✅ Keep these somewhere safe!**

---

## Step 4: Set Up the Database (3 minutes)

1. In your Supabase project, click **"SQL Editor"** in the left sidebar
2. Click **"New query"** button
3. Open the file **`supabase-schema.sql`** from this project in a text editor (it's in the root folder)
4. **Copy ALL the text** from that file (Cmd/Ctrl + A, then Cmd/Ctrl + C)
5. **Paste** it into the Supabase SQL Editor (Cmd/Ctrl + V)
6. Click the **"Run"** button (or press Cmd/Ctrl + Enter)
7. You should see **"Success. No rows returned"** - that's correct!

**Verify it worked:**
1. Click **"Table Editor"** in the left sidebar
2. You should see two tables: **`profiles`** and **`reviews`**

**✅ Database is ready!**

---

## Step 5: Create Cloudflare Account (2 minutes)

**What is Cloudflare Turnstile?** Free CAPTCHA to prevent bots/spam (better than reCAPTCHA).

1. Go to **[https://dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)**
2. Enter your email and create a password
3. Click **"Create Account"**
4. Check your email and **click the verification link**
5. Log back in to Cloudflare dashboard

---

## Step 6: Get Turnstile Keys (3 minutes)

1. In the Cloudflare dashboard, look for **"Turnstile"** in the left sidebar
   - If you don't see it, use the **search bar** at the top and type "Turnstile"
2. Click **"Add site"**
3. Fill in the form:
   - **Site name**: Type `GauchoGirls`
   - **Domain**: Type `localhost` (we'll add your real domain later)
   - **Widget Mode**: Leave as **"Managed"**
4. Click **"Create"**
5. You'll see a page with two keys - **COPY both of these**:
   - **Site Key** (starts with `0x4...`)
   - **Secret Key** (long random string)

**✅ Keep these somewhere safe!**

---

## Step 7: Set Environment Variables (2 minutes)

1. In this project folder, **copy** the file `.env.local.example`
2. **Rename the copy** to `.env.local`
3. **Open** `.env.local` in a text editor
4. **Replace** the placeholder values with your real values:

```bash
# From Step 3 (Supabase API page)
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.YOUR_KEY_HERE

# From Step 6 (Turnstile)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAAA_YOUR_SITE_KEY
TURNSTILE_SECRET_KEY=0x4AAAAAAA_YOUR_SECRET_KEY

# Leave this empty for now
NEXT_PUBLIC_BASE_URL=
```

5. **Save** the file

**✅ Environment configured!**

---

## Step 8: Test Locally (5 minutes)

1. Open **Terminal** (Mac) or **Command Prompt** (Windows)
2. Navigate to this project folder:
   ```bash
   cd /tmp/gauchogirls
   ```
3. Install dependencies (one-time):
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. You should see:
   ```
   ▲ Next.js 15.5.4
   - Local:  http://localhost:3000
   ```
6. **Open your browser** and go to **[http://localhost:3000](http://localhost:3000)**
7. You should see the GauchoGirls homepage!
8. Click **"🏆 view leaderboard"** - should show empty list
9. Search for a name (e.g., "Jane Doe") - you'll see a profile page

**✅ Site works locally!**

---

## Step 9: Create GitHub Repository (3 minutes)

**Why?** Vercel deploys from GitHub automatically.

1. Go to **[https://github.com/new](https://github.com/new)**
2. Fill in:
   - **Repository name**: `gauchogirls`
   - **Description**: (optional) "Anonymous rating site for IV women"
   - **Public or Private**: Your choice
   - **DO NOT** check "Initialize with README" (we already have one)
3. Click **"Create repository"**
4. You'll see a page with commands - **ignore those for now**

---

## Step 10: Push Code to GitHub (2 minutes)

1. In Terminal, make sure you're in the project folder
2. Run these commands **one by one** (replace YOUR_USERNAME with your GitHub username):

```bash
git init
git add .
git commit -m "Initial commit - GauchoGirls"
git remote add origin https://github.com/YOUR_USERNAME/gauchogirls.git
git branch -M main
git push -u origin main
```

3. Refresh your GitHub repository page - you should see all the files!

**✅ Code is on GitHub!**

---

## Step 11: Create Vercel Account (2 minutes)

**What is Vercel?** Free hosting for your website with automatic deployments.

1. Go to **[https://vercel.com/signup](https://vercel.com/signup)**
2. Click **"Continue with GitHub"**
3. Click **"Authorize Vercel"**
4. You'll be redirected to Vercel dashboard

---

## Step 12: Deploy to Vercel (5 minutes)

1. Click **"Add New..."** → **"Project"**
2. Find your **`gauchogirls`** repository in the list
3. Click **"Import"**
4. You'll see a configuration page

**IMPORTANT: Before clicking Deploy, add environment variables!**

5. Click **"Environment Variables"** section to expand it
6. Add **FOUR** variables (click "Add Another" for each):

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | (Your Supabase URL from Step 3) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | (Your Supabase anon key from Step 3) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | (Your Turnstile site key from Step 6) |
| `TURNSTILE_SECRET_KEY` | (Your Turnstile secret key from Step 6) |

7. Click **"Deploy"**
8. Wait 2-3 minutes for the build to complete
9. You'll see **"🎉 Congratulations!"** when done
10. Click **"Visit"** to see your live site!

**✅ Site is live!**

---

## Step 13: Add Production URL (2 minutes)

1. **Copy** your Vercel URL (looks like `https://gauchogirls.vercel.app`)
2. In Vercel dashboard, go to **Settings** → **Environment Variables**
3. Click **"Add New"**
4. Add:
   - **Name**: `NEXT_PUBLIC_BASE_URL`
   - **Value**: Your full Vercel URL (e.g., `https://gauchogirls.vercel.app`)
5. Click **"Save"**
6. Go to **"Deployments"** tab
7. Click the **three dots** on the latest deployment → **"Redeploy"**
8. Check **"Use existing Build Cache"**
9. Click **"Redeploy"**

---

## Step 14: Update Turnstile Domain (1 minute)

1. Go back to **Cloudflare dashboard** → **Turnstile**
2. Click your **GauchoGirls** site
3. Click **"Settings"**
4. Under **"Domains"**, click **"Add domain"**
5. Add your Vercel domain (e.g., `gauchogirls.vercel.app`) - **WITHOUT** `https://`
6. Click **"Add"**
7. (Optional) Remove `localhost` if you don't need local testing anymore

**✅ CAPTCHA works on live site!**

---

## Step 15: Final Test (2 minutes)

1. Visit your live Vercel URL
2. Test these flows:
   - ✅ Home page loads
   - ✅ Click "view leaderboard" (shows empty list)
   - ✅ Search for a name (e.g., "Test User")
   - ✅ Profile page loads
   - ✅ CAPTCHA widget appears
   - ✅ Fill in rating (1-5) and optional comment
   - ✅ Complete CAPTCHA
   - ✅ Click "Submit Review"
   - ✅ Review appears below
   - ✅ Go to leaderboard - "Test User" appears!

**✅ Everything works!**

---

## 🎉 YOU'RE DONE!

Your site is now:
- ✅ Fully functional
- ✅ Hosted for free on Vercel
- ✅ Using a free database (Supabase)
- ✅ Protected by CAPTCHA (Turnstile)
- ✅ Automatically deployed (push to GitHub → auto-deploy)

---

## Optional: Custom Domain

If you want to use your own domain (e.g., `gauchogirls.com`):

1. **Buy the domain** (e.g., Namecheap, Google Domains, Cloudflare)
2. In Vercel: **Settings** → **Domains** → **Add**
3. Follow the DNS instructions (add A/CNAME records)
4. Update environment variable `NEXT_PUBLIC_BASE_URL` to your domain
5. Update Turnstile domain to your custom domain
6. Redeploy

---

## Need Help?

Check these resources:
- **Vercel function logs**: Dashboard → Your project → Logs → Functions
- **Supabase logs**: Dashboard → Your project → Logs → Postgres Logs
- **Build errors**: Run `npm run build` locally to see detailed errors

---

**That's it! Enjoy your site! 🦝🌴**
