# Manual test: SSP calculator "Email me this allocation" (TC-WEB-CALC-EMAIL-001)

Code: `app/tools/ssp-allocation-calculator/Calculator.tsx` (form), `app/api/contact/route.ts` (optional `calculator` field), `lib/ssp/calculatorEmail.ts` (server recompute). Automated: `npm run test:tools`.

| Step | Action | Expected |
|---|---|---|
| 1 | Open /tools/ssp-allocation-calculator with the example loaded | Allocation and schedule unchanged from before; below the result, "Email me this allocation as a workbook (optional)". The note under the result says nothing is sent unless you use that option. |
| 2 | Click it; submit with a field empty | Inline error "Name, work email and company are required."; no request sent. |
| 3 | Fill name, a real work inbox you control, company; submit | "Sent. Check <email> …". Inbox receives "Your SSP allocation workbook (Soluqube)" with the allocation summary, "Deferred revenue after month 36: $0.00.", and soluqube-ssp-allocation.csv (opens in Excel, rows match the page). Obligations are "Obligation 1..n", not the typed names. |
| 4 | Founder inbox | "Soluqube Contact Inquiry" with name, company, email, Primary Need "SSP calculator: email me this allocation" and the allocation with the typed obligation names (HTML-escaped). |
| 5 | Name an obligation `<b>x</b> http://phish.example` and send | Visitor email and CSV contain no "phish"; founder email shows the text escaped, not rendered. |
| 6 | POST /api/contact with `calculator.currency = "EUR"` | 400 "Calculator inputs are missing or malformed."; no email sent. |
| 7 | Send 4 times within 10 minutes from one IP | 4th request 429 (existing rate limit). |
| 8 | /privacy | "What we collect" lists the calculator email step. |
