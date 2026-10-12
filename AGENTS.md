# Soluqube Web (website-youtube-video) — Autonomous Agent Directives

## 1. Scope & Isolation Boundaries
- WORKSPACE ROOT: `/Users/nikhil/Documents/website-youtube-video`
- FORBIDDEN: NEVER inspect, grep, or search parent folders (`/Users/nikhil`) or sibling directories (`outreach-os`, `smart_contracts`, `files`).
- SCOPE: Production marketing website, interactive contract review demo canvas, dual-GAAP comparison pages, customer intake, Stripe checkout integrations.

## 2. Stability & Build Safety Rules
- Always scope commands to `./app`, `./components`, `./lib`, or `./public`.
- Keep terminal command output concise.
- Run `npm run build` or `npx tsc --noEmit` to verify type safety prior to committing.

## 3. Security & Zero Secret Leakage Mandate (STRICT)
- **ZERO HARDCODED SECRETS**: NEVER hardcode API keys, SMTP passwords, tokens, or hashes into source code, test files, configs, or fallback defaults (e.g. NEVER do `process.env.SMTP_PASS || "password"`).
- **FAIL FAST**: If a required secret or environment variable is missing, fail fast with a descriptive runtime error.
- **ENVIRONMENT ISOLATION**: All secrets belong exclusively in `.env` or `.env.local`. Ensure `.env*` remains in `.gitignore`.
- **PRE-COMMIT CHECK**: Before staging or committing, always verify `git diff --cached` contains ZERO secrets or credentials.

## 4. Director & Strategic Leadership Directives
- **WORKFLOW ORCHESTRATION**: Use `agency-agents-orchestrator` to manage multi-step pipelines (Spec → Implementation → QA Loop → Deployment).
- **PRODUCT & CONVERSION STRATEGY**: Use `agency-product-manager` and `agency-pricing-analyst` when defining comparison page structures, intake funnels, and tier offerings.
- **BRAND & POSITIONING GUARDIAN**: Use `agency-brand-guardian` to enforce institutional enterprise tone (CFO/Controller grade) and prevent consumer-grade copy drift.

## 5. Development & Engineering Excellence Directives
- **SURGICAL IMPLEMENTATION (MANDATORY)**: Always activate `agency-minimal-change-engineer`. Produce minimum-viable diffs, touch only files directly required for the task, refuse scope creep, and reject unprompted refactoring.
- **FRONTEND & COMPONENT ARCHITECTURE**: Use `agency-frontend-developer` for Next.js App Router, React Server Components, responsive Tailwind CSS layouts, and spatial PDF token canvas styling.
- **CREDENTIAL & SECRET HYGIENE**: Use `agency-secrets-credential-hygiene-engineer` to enforce zero secret exposure across code, CI, runtime bundles, and git commits.
- **UI FINISH & REGRESSION GATES**: Use `agency-ui-finish-gate-reviewer` and `agency-test-automation-engineer` to verify layout stability, mobile responsiveness, and zero layout shifts before shipping.

## 6. Organic Search (GEO/SEO) & Technical Copy Directives
- **TECHNICAL SEO & INDEXING**: Use `agency-seo-specialist` for metadata tags (title <= 60 chars, description <= 155 chars), canonical tags, and structured JSON-LD schemas (`SoftwareApplication`, `TechArticle`, `FAQPage`).
- **AI CITATION & AEO**: Use `agency-ai-citation-strategist` and `agency-aeo-foundations-architect` to optimize visibility across ChatGPT, Perplexity, Claude, and Gemini, and maintain `/llms.txt`.
- **DETERMINISTIC TECHNICAL COPY**: Use `agency-technical-writer` for audit-grade mathematical rigor, 128-bit micro-cent explanations, and Big 4 workpapers.

## 7. MCP Servers & Tooling Standards
- **Canva MCP** (`https://mcp.canva.com/mcp`): Programmatic generation of marketing carousels, infographics, and pitch visual assets.
- **Playwright MCP / Chrome DevTools MCP**: Headless browser verification for visual regressions, live DOM checking, and SEO audits without desktop window interruptions.
