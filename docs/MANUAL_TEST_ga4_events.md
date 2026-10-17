# Manual test: GA4 conversion events (TC-WEB-GA4-001)

Property G-61QYXZFGCG on soluqube.com and app.soluqube.com. Code: `lib/analytics.ts` + `components/analytics-clicks.tsx` (site), `src/lib/analytics.ts` + `src/components/AnalyticsClicks.tsx` (app). Automated: `npm run test:tools` (site), `npm test` (app). Verify with GA4 DebugView (Chrome "Google Analytics Debugger" extension) or Network tab `collect?…&en=<event>`.

| Step | Action | Expected event (params) |
|---|---|---|
| 1 | Home free-workpaper form, valid submit | `generate_lead` (form=home_intake); failure shows an error and sends no event |
| 2 | /book-demo form, valid submit | founder gets the intake email (form now really submits); `generate_lead` (form=book_demo) |
| 3 | /contact form | `generate_lead` (form=contact) only on HTTP 200 |
| 4 | /audit free workpaper form | founder email now shows the name and the message; `generate_lead` (form=audit_workpaper) |
| 5 | SSP calculator "Email me this allocation" | `calculator_email` (form=ssp_calculator) |
| 6 | Click any Calendly link (pricing, home, app pilot card) | `calendly_click` (location, link_url without query) |
| 7 | Click a /samples/*.pdf link | `sample_download` (file, location) |
| 8 | Click a /pricing card button | `pricing_cta` (tier, location); Calendly CTAs also send `calendly_click` |
| 9 | app.soluqube.com/signup success | `sign_up` (method=email) |
| 10 | App top-banner free workpaper | `generate_lead` (form=app_workpaper_banner) |
| 11 | Inspect every event payload | No name, email or query string in any parameter |
| 12 | Open `https://www.soluqube.com/?utm_source=test` | Lands on `https://soluqube.com/?utm_source=test` (UTM kept); same for /book → /book-demo and app → site redirects |
