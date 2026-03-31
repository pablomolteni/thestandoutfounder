# The Standout Founder — Website

Next.js landing page hosted on Vercel with Resend for contact form.

---

## STEP 1: Push to GitHub

```bash
# In your terminal, navigate to this folder
cd tsf-website

# Initialize git
git init
git add .
git commit -m "Initial commit"

# Create a repo on GitHub (github.com/new) called "tsf-website" (private)
# Then connect and push:
git remote add origin https://github.com/YOUR_USERNAME/tsf-website.git
git branch -M main
git push -u origin main
```

---

## STEP 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Select your **tsf-website** repo
4. Framework preset: **Next.js** (auto-detected)
5. Click **Deploy** — wait ~60 seconds

Your site is now live at `tsf-website.vercel.app`

---

## STEP 3: Set up Resend (contact form → paula@thestandoutfounder.com)

### 3a. Create Resend account
1. Go to [resend.com](https://resend.com) and sign up
2. Free tier = 3,000 emails/month (more than enough)

### 3b. Verify your domain in Resend
1. In Resend dashboard → **Domains** → **Add Domain**
2. Enter: `thestandoutfounder.com`
3. Resend gives you **3 DNS records** to add (2 TXT + 1 MX for sending)
4. Go to **Namecheap** → Domain List → thestandoutfounder.com → **Advanced DNS**
5. Add each record Resend shows you. Example:
   - **TXT** record: Host = `resend._domainkey` / Value = the long key they give
   - **TXT** record: Host = `@` / Value = `v=spf1 include:... ~all`  
6. Wait 5-30 minutes, then click **Verify** in Resend
7. Once verified, your emails will come FROM `noreply@thestandoutfounder.com`

> **IMPORTANT**: This does NOT affect your existing Google Workspace email. Resend only adds records for sending, it doesn't change your MX records that point to Google.

### 3c. Get your API key
1. In Resend → **API Keys** → **Create API Key**
2. Name it `tsf-website`, permission: **Sending access**
3. Copy the key (starts with `re_`)

### 3d. Add the key to Vercel
1. Go to your project on Vercel → **Settings** → **Environment Variables**
2. Add:
   - Key: `RESEND_API_KEY`
   - Value: `re_your_actual_key_here`
   - Environment: ✅ Production, ✅ Preview
3. Click **Save**
4. Go to **Deployments** → click the **⋮** on the latest → **Redeploy**

The contact form now sends real emails to paula@thestandoutfounder.com.

---

## STEP 4: Point your domain to Vercel

### Option A: Move entire site to Vercel (recommended)

1. In Vercel → your project → **Settings** → **Domains**
2. Add `www.thestandoutfounder.com` and `thestandoutfounder.com`
3. Vercel tells you to update DNS. Go to **Namecheap** → Advanced DNS:
   - Delete the old A record pointing to Hostinger
   - Add **A record**: Host = `@` / Value = `76.76.21.21`
   - Add **CNAME record**: Host = `www` / Value = `cname.vercel-dns.com`
4. Wait 5-30 min for propagation
5. Vercel auto-provisions SSL certificate

> Your Google Workspace email is NOT affected. MX records stay pointing to Google.

### Option B: Keep Hostinger, use subdomain for new site
If you want to keep the old site on Hostinger temporarily:
- Add a CNAME: `new.thestandoutfounder.com` → `cname.vercel-dns.com`
- Add `new.thestandoutfounder.com` in Vercel domains
- When ready, switch the main domain per Option A

---

## STEP 5: Cancel Hostinger (when ready)

Once the domain points to Vercel and everything works:
1. You can cancel your Hostinger hosting plan
2. Keep the domain at Namecheap (only DNS changes, domain stays there)
3. Vercel free tier handles everything

---

## Summary of what goes where

| Service | Purpose |
|---------|---------|
| **Namecheap** | Domain registrar (owns `thestandoutfounder.com`) |
| **Vercel** | Hosts the website (free tier) |
| **Google Workspace** | Email (`paula@thestandoutfounder.com`) — unchanged |
| **Resend** | Sends contact form emails (free tier: 3k/month) |
| **GitHub** | Source code repository |

---

## Local development

```bash
npm install
cp .env.local.example .env.local
# Edit .env.local with your Resend API key
npm run dev
# Opens at http://localhost:3000
```
