# How we handle your contracts

> DRAFT, not published. Planned route: /security. Do not route or link this page until the founder has filled every placeholder and a lawyer has reviewed it.
> Placeholders: {{ENTITY_NAME}}, {{ADDRESS}}, {{CONTACT_EMAIL}}, {{FOUNDER_TO_CONFIRM}}.
> Facts below were checked in the smart_contracts repo on 16 Oct 2026 (file references are in the HTML comments). Update this page whenever that code changes.

Soluqube is operated by {{ENTITY_NAME}}, {{ADDRESS}}. Soluqube is built and run by one founder. This page states what the product does with a contract you upload today, and what it does not do.

## What happens when you upload a contract

1. You upload one PDF at app.soluqube.com while signed in. The upload limit is 4.5 MB.
2. The server reads the file in memory, checks that it is a PDF, and extracts the parties, price, performance obligations, term and the page and excerpt each value came from.
3. You review and confirm the extracted terms. Only then is the allocation and schedule calculated.
4. You download the results (Excel workbook, CSV or JSON). They are built in memory for that download.

<!-- Verified: src/app/api/process/route.ts (multipart upload -> file.arrayBuffer() -> extractUploadDraft, MAX_UPLOAD_BYTES = 4.5 MB, no fs write or database call on the upload path); src/app/api/process/confirm; src/app/api/download-excel/route.ts -->

## What we store, and what we do not

- **Uploaded contracts are not stored in our database.** The PDF and the extracted terms are processed in memory for that request. There is no table for uploaded files, and the upload code does not write the file to disk or to file storage.
- **Account data is stored.** When you sign up we store your email, name, company, role, a scrypt hash of your password, and your last sign-in time. A sign-up also creates a lead record (email, domain, company, role, source).
- Error logs from the hosting platform may record request metadata and error messages. Retention of those logs: {{FOUNDER_TO_CONFIRM}}.
- Contracts you send by email (for example for the free 3-contract workpaper or the design-partner pilot) are handled by the founder by hand, not by the app. Where they are kept and for how long: {{FOUNDER_TO_CONFIRM}}. We delete them on request.

<!-- Verified: prisma/schema.prisma (Account: email, name, company, role, passwordHash, lastLoginAt; InboundLead); only prisma.account.create/update and prisma.inboundLead.upsert exist in src (signup, login, leads routes). The Contract / PerformanceObligation / RevenueSchedule / AuditLedger models exist in the schema but nothing in src writes to them. -->

## Where it runs

- **Hosting:** the app and this website run on Vercel. Region: {{FOUNDER_TO_CONFIRM}}.
- **Database:** Neon Postgres, used for accounts and sign-up lead records only. Region: {{FOUNDER_TO_CONFIRM}}.
- **Email:** form submissions on soluqube.com are emailed to the founder through Google Workspace SMTP.
- **Analytics on soluqube.com:** Vercel Analytics and Google Analytics.
- **Payments:** Stripe, if and when you pay online. We do not see or store card numbers.

## How accounts are protected

- Passwords are hashed with scrypt (random salt per password). We never store the password itself.
- The session cookie is HttpOnly, Secure (in production), SameSite=Lax, and expires after 7 days.
- The app sends a Content-Security-Policy, Strict-Transport-Security, X-Frame-Options (SAMEORIGIN), X-Content-Type-Options (nosniff) and a Referrer-Policy on every response.
- All traffic is served over HTTPS.

<!-- Verified: src/lib/password.ts (scrypt, N=16384, random salt); src/app/api/auth/login/route.ts and signup/route.ts (httpOnly: true, secure: production, sameSite: "lax", maxAge 7 days); next.config.ts (CSP, HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy). -->

## What we do not claim

- We hold no SOC 2 report, ISO certification or other third-party attestation.
- There is no self-hosted or private-cloud version today.
- Uploaded contracts are not used to train any model.
- We do not have a 24/7 support desk. The founder answers within 1 business day.
- Encryption at rest for the database: {{FOUNDER_TO_CONFIRM}} (provided by Neon; confirm the plan's settings before stating it).

## Your controls

- Redact names and counterparties if you prefer. Prices must stay visible: the app refuses contracts with redacted prices, as well as scans without a text layer, invoices, amendments and currencies other than USD and INR.
- To test without any confidential data, use a public contract from SEC EDGAR.
- We sign a mutual NDA on request. A data processing agreement (DPA): {{FOUNDER_TO_CONFIRM}}.
- To delete your account or ask what we hold about you, email {{CONTACT_EMAIL}}.

## Reporting a security issue

Email {{CONTACT_EMAIL}}. We will acknowledge within {{FOUNDER_TO_CONFIRM}} business days.

Last updated: {{FOUNDER_TO_CONFIRM}}
