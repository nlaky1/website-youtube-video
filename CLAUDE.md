# Soluqube Web (website-youtube-video) — Claude Agent Directives

@AGENTS.md

## Workspace Context
- **ROOT**: `/Users/nikhil/Documents/website-youtube-video`
- **SURFACE**: `https://soluqube.com`
- **FRAMEWORK**: Next.js 14.1.0 App Router, Tailwind CSS, Lucide icons, Vercel Production.
- **ISOLATION**: Scope changes to `./app`, `./components`, `./lib`, or `./public`. Never modify sibling repositories without explicit instruction.

## Key Build & Validation Commands
- Local Development: `npm run dev` (Runs on port 3000)
- Production Build: `npm run build`
- Deploy to Vercel: Pushing to `main` automatically deploys to Vercel production.
- Link & Route Verification: Use `curl` or Playwright to verify SSR and HTTP status.

## Core Directives & Quality Gates
1. **Zero Secret Exposure**: Read credentials exclusively from `process.env`. Never hardcode API keys or passwords.
2. **Surgical Implementation**: Apply `agency-minimal-change-engineer`. Produce minimum-viable diffs; no unprompted refactoring.
3. **Cross-Subdomain Linking**:
   - Marketing, SEO, blog, and pricing belong here on `soluqube.com`.
   - App sandbox, client portal, and onboarding links must use absolute URLs pointing to `https://app.soluqube.com/...`.
   - Maintained redirects in `next.config.mjs` for `/onboarding`, `/client`, `/login`.
4. **Static Performance & SEO**:
   - Keep informational and pricing pages as high-performance Server Components (`layout.tsx` + `page.tsx`).
   - Every page must export `<title>` (<= 60 chars), `<meta name="description">` (<= 155 chars), and `<link rel="canonical">`.
   - Dual-entity JSON-LD schemas (`TechArticle` + `FAQPage`) on pillar blogs and comparison pages.
