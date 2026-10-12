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
