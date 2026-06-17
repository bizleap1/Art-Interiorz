# Art Interiorz — Nagpur Interior Design Studio

A production-ready React + Vite website for Art Interiorz, a full-service interior design studio in Nagpur, India.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite 6 |
| Routing | Wouter |
| Animations | Framer Motion |
| Styling | Tailwind CSS v4 (oklch design tokens) |
| Fonts | Cormorant Garamond (display) + Inter (body) |
| Icons | Lucide React |
| Language | TypeScript 5 |

---

## Project Structure

```
artifacts/artz-interior/
├── public/
│   └── assets/          # Static images (logo, hero, founders, portfolio)
├── src/
│   ├── components/
│   │   ├── site/        # Page sections (Hero, About, Services, Portfolio…)
│   │   ├── FloatingChatbot.tsx
│   │   └── WhatsAppButton.tsx
│   ├── data/            # All content as TypeScript data files
│   ├── pages/           # Route-level page components
│   ├── App.tsx          # Router + providers
│   ├── main.tsx         # Entry point
│   └── index.css        # Tailwind v4 + design tokens
├── index.html           # SEO meta, fonts, structured data
├── vite.config.ts       # Vite configuration
└── vercel.json          # Vercel deployment config (SPA rewrites + headers)
```

---

## Running Locally

### Prerequisites

- Node.js 20+ (use `.nvmrc` for version specification)
- pnpm 9+

### Quick Start

```bash
cd artifacts/artz-interior
pnpm install
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Commands

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build locally
- `pnpm run typecheck` - Run TypeScript type checking

---

## Deploying to Vercel

### Option A — Vercel Dashboard (recommended)

1. Push this repo to GitHub.
2. Go to [vercel.com](https://vercel.com) → **Add New Project**.
3. Import the repository and set **Root Directory** to `artifacts/artz-interior`.
4. Vercel auto-detects Vite — leave Framework Preset as **Vite**.
5. No environment variables are needed for the frontend.
6. Click **Deploy**.

> `vercel.json` already handles:
> - SPA routing (all paths → `index.html`)
> - Security headers (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Referrer-Policy)
> - Cache headers for static assets (1-year cache for `/assets/*`)

### Option B — Vercel CLI

```bash
npm i -g vercel
cd artifacts/artz-interior
vercel --prod
```

---

## Deploying to Netlify

1. Push to GitHub.
2. In Netlify → **New Site from Git** → select repo.
3. Set **Base directory**: `artifacts/artz-interior`
4. Set **Build command**: `pnpm run build` (Netlify auto-installs pnpm)
5. Set **Publish directory**: `dist`
6. Add a `_redirects` file in `public/`:

```
/*  /index.html  200
```

---

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | Replit only | `3000` | Dev server port |
| `BASE_PATH` | Replit only | `/` | Vite `base` path prefix |

No environment variables are needed for Vercel or Netlify deployments — the build works with defaults.

---

## Customising Content

All site content lives in TypeScript data files under `src/data/`. Edit these to update text, images, stats, and services — no component changes needed.

| File | Controls |
|------|---------|
| `heroData.ts` | Hero headline, subtitle, CTAs |
| `aboutData.ts` | About section text, stats, badge |
| `servicesData.ts` | 6 service cards on homepage |
| `portfolioData.ts` | Portfolio grid images + filters |
| `testimonialsData.ts` | Quote testimonials carousel |
| `contactData.ts` | Address, phone, email, map |
| `footerData.ts` | Footer links, social links |
| `aboutPageData.ts` | About page — intro, services, founders bio |
| `blogData.ts` | Blog posts |
| `faqData.ts` | FAQ accordion questions |

---

## Key Business Details

| Info | Value |
|------|-------|
| WhatsApp | [+91 95450 02017](https://wa.me/919545002017) |
| Email | artinteriorz17@gmail.com |
| Address | Plot No 13, Suprabhat Apartments, Shilpa Nagar, Somalwada, Nagpur 440015 |
| YouTube | [@Art_Interiorz](https://www.youtube.com/@Art_Interiorz) |

---

## SEO & Analytics Setup

### Google Analytics (GA4) Integration

This project includes Google Analytics (GA4) tracking with automatic page view tracking and custom event tracking.

#### Setup Instructions

1. **Get Your GA4 Measurement ID**
   - Go to [Google Analytics](https://analytics.google.com/)
   - Create a GA4 property or use an existing one
   - Copy your Measurement ID (format: `G-XXXXXXXXXX`)

2. **Configure Environment Variable**
   ```bash
   # Create .env.local file
   cp .env.example .env.local
   
   # Edit .env.local and add your GA4 Measurement ID
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

3. **Deployment Configuration**
   - **Vercel**: Add `VITE_GA_MEASUREMENT_ID` as an environment variable in project settings
   - **GoDaddy/Other**: Add the variable to your hosting environment configuration

#### Tracked Events

The following events are automatically tracked:

- **Page Views**: Automatic tracking on route changes (SPA navigation)
- **Contact Form Submission**: When users submit the contact form
- **Call Button Clicks**: When users click phone numbers
- **WhatsApp Clicks**: When users click the WhatsApp button
- **Service Inquiries**: When users inquire about specific services
- **Portfolio Item Clicks**: When users click on portfolio projects
- **Blog Post Clicks**: When users click on blog posts
- **Navigation Clicks**: When users navigate to different pages

#### Custom Event Tracking

To add custom event tracking in your components:

```typescript
import { trackEvent } from "@/lib/analytics";

// Track custom event
trackEvent("custom_event_name", {
  parameter_name: "parameter_value",
});
```

### Sitemap Generation

The project automatically generates a sitemap.xml during the build process using `vite-plugin-sitemap`.

#### Configuration

Sitemap configuration is in `vite.config.ts`:

```typescript
const siteUrl = "https://artinteriorz.com";
const routes = ["", "/about", "/services", "/portfolio", "/contact", "/blog"];
```

#### Update Sitemap

To add new pages to the sitemap:

1. Add the route to the `routes` array in `vite.config.ts`
2. Rebuild the project: `pnpm run build`
3. The sitemap will be generated at `dist/sitemap.xml`

#### Verify Sitemap

After deployment, verify your sitemap at:
```
https://artinteriorz.com/sitemap.xml
```

### Google Search Console

#### Submit Sitemap

1. Go to [Google Search Console](https://search.google.com/search-console/)
2. Add your property (https://artinteriorz.com)
3. Verify ownership (HTML file, DNS, or Google Analytics)
4. Navigate to **Sitemaps** in the left sidebar
5. Submit your sitemap URL: `https://artinteriorz.com/sitemap.xml`

#### robots.txt

The `robots.txt` file is configured at `public/robots.txt` and includes:
- Allow all crawlers
- Sitemap reference
- Optional crawl-delay configuration

### SEO Best Practices Implemented

- **Meta Tags**: Title, description, keywords in `index.html`
- **Open Graph Tags**: Social media sharing metadata
- **Twitter Cards**: Twitter-specific sharing metadata
- **Structured Data**: LocalBusiness schema for Google Knowledge Graph
- **Semantic HTML**: Proper heading hierarchy and semantic elements
- **Responsive Design**: Mobile-friendly layout
- **Fast Loading**: Optimized images and code splitting

---

## Deployment Checklist

### Pre-Deployment

- [ ] Update `VITE_GA_MEASUREMENT_ID` in environment variables
- [ ] Verify all routes are added to `vite.config.ts` sitemap configuration
- [ ] Test the build locally: `pnpm run build`
- [ ] Preview the production build: `pnpm run preview`
- [ ] Verify sitemap generation in `dist/sitemap.xml`
- [ ] Verify robots.txt is present in `public/robots.txt`

### Vercel Deployment

1. **Environment Variables**
   - Go to Vercel project settings → Environment Variables
   - Add `VITE_GA_MEASUREMENT_ID` with your GA4 Measurement ID

2. **Deploy**
   - Push code to GitHub
   - Vercel will automatically deploy
   - Verify deployment in Vercel dashboard

3. **Post-Deployment Verification**
   - [ ] Visit https://artinteriorz.com/sitemap.xml
   - [ ] Visit https://artinteriorz.com/robots.txt
   - [ ] Check Google Analytics Realtime report
   - [ ] Submit sitemap to Google Search Console
   - [ ] Test form submissions and verify event tracking
   - [ ] Test WhatsApp button and verify event tracking
   - [ ] Test phone number clicks and verify event tracking

### GoDaddy/Shared Hosting Deployment

1. **Build the Project**
   ```bash
   cd artifacts/artz-interior
   pnpm run build
   ```

2. **Upload Files**
   - Upload contents of `dist/` folder to your hosting public directory
   - Ensure `.htaccess` or server configuration handles SPA routing

3. **Configure Environment**
   - Add environment variables through hosting control panel
   - Or hardcode the GA Measurement ID in `.env.production` (not recommended for security)

4. **Verify Deployment**
   - Same verification steps as Vercel deployment

### Monitoring & Maintenance

- **Weekly**: Check Google Analytics for traffic and user behavior
- **Monthly**: Review Google Search Console for indexing issues and crawl errors
- **Quarterly**: Update sitemap if new pages are added
- **As Needed**: Add new event tracking for new features

---

## Notes

- All portfolio images are served from the artinteriorz.com CDN — no local copies are needed.
- Local images in `public/assets/` (logo, hero, about, founders, portfolio previews) are committed to the repo and served statically.
- YouTube video IDs embedded in `HappyClients.tsx` and `HowItWorks.tsx` are pulled directly from the studio's YouTube channel.
- Google Fonts (`@import url(...)`) must remain the **first line** in `index.css` before `@import "tailwindcss"` due to a PostCSS ordering requirement.
