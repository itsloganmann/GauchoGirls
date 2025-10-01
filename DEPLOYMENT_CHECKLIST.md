# 🚀 Deployment Checklist

Use this quick checklist to deploy GauchoGirls in under 30 minutes.

## ✅ Pre-Deployment (Local Setup)

- [ ] Node.js 18+ installed (`node --version`)
- [ ] Project dependencies installed (`npm install`)
- [ ] Unit tests pass (`npm run test`)
- [ ] Build succeeds (`npm run build`)

## ✅ Supabase Setup (5 minutes)

- [ ] Created Supabase account at [supabase.com](https://supabase.com)
- [ ] Created new project (name: `gauchogirls`)
- [ ] Copied Project URL from Settings → API
- [ ] Copied anon public key from Settings → API
- [ ] Ran entire `supabase-schema.sql` in SQL Editor
- [ ] Verified tables created in Table Editor

## ✅ Cloudflare Turnstile (3 minutes)

- [ ] Created Cloudflare account at [dash.cloudflare.com](https://dash.cloudflare.com/sign-up)
- [ ] Created Turnstile site (name: `GauchoGirls`, domain: `localhost`)
- [ ] Copied Site Key (public)
- [ ] Copied Secret Key (private)

## ✅ Environment Variables (2 minutes)

- [ ] Created `.env.local` from `.env.local.example`
- [ ] Set `NEXT_PUBLIC_SUPABASE_URL`
- [ ] Set `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Set `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- [ ] Set `TURNSTILE_SECRET_KEY`

## ✅ Local Testing (5 minutes)

- [ ] Started dev server (`npm run dev`)
- [ ] Opened http://localhost:3000
- [ ] Navigated to leaderboard (shows empty list)
- [ ] Searched for a test name
- [ ] CAPTCHA widget loads on profile page
- [ ] (Optional) Submitted test review successfully

## ✅ Git & GitHub (3 minutes)

- [ ] Initialized git (`git init`)
- [ ] Created GitHub repository
- [ ] Committed code (`git add . && git commit -m "Initial commit"`)
- [ ] Pushed to GitHub (`git push -u origin main`)

## ✅ Vercel Deployment (10 minutes)

- [ ] Created Vercel account at [vercel.com/signup](https://vercel.com/signup)
- [ ] Imported GitHub repository
- [ ] Added ALL environment variables:
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
  - [ ] `TURNSTILE_SECRET_KEY`
- [ ] Deployed successfully
- [ ] Visited live site (copy URL)
- [ ] Added `NEXT_PUBLIC_BASE_URL` environment variable (your Vercel URL)
- [ ] Redeployed

## ✅ Post-Deployment (2 minutes)

- [ ] Updated Turnstile domain to include Vercel URL
- [ ] Tested live site:
  - [ ] Home page loads
  - [ ] Leaderboard loads
  - [ ] Profile search works
  - [ ] CAPTCHA loads
  - [ ] Test review submission works
- [ ] Checked Vercel logs for errors

## ✅ Optional Enhancements

- [ ] Set up custom domain in Vercel
- [ ] Update Turnstile domain to custom domain
- [ ] Update `NEXT_PUBLIC_BASE_URL` to custom domain
- [ ] Set up monitoring/alerts in Supabase
- [ ] Set up analytics in Vercel

---

## 🎉 Success Criteria

Your deployment is successful if:

1. ✅ Home page loads with branding
2. ✅ Leaderboard page displays (even if empty)
3. ✅ Search redirects to profile pages
4. ✅ CAPTCHA widget appears on profile pages
5. ✅ Reviews can be submitted and appear in database
6. ✅ No errors in Vercel function logs

---

## 🆘 Quick Troubleshooting

**"Missing environment variables" error**
→ Check all env vars are set in Vercel (Settings → Environment Variables)

**CAPTCHA not loading**
→ Verify Turnstile domain matches your deployment URL

**Database errors**
→ Confirm `supabase-schema.sql` was run completely in Supabase

**Build failures**
→ Run `npm run build` locally to see detailed errors

---

**Total Time**: ~30 minutes from start to production 🚀
