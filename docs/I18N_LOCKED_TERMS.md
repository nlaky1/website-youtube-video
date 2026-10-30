# Locked terms for translated pages (es, pt-BR, de)

Owner: DEV. Created 30 Oct 2026 for multilingual wave 1. Applies to every file in `data/i18n/<lang>/` and to `lib/i18n.ts`.
The renderings below are the ones the live wave-1 pages already use most often (counted with grep over `data/i18n/*/` on 30 Oct 2026), so new pages follow the existing majority instead of introducing a third variant.

## 1. Never translate (keep exactly as in English)
- Standard names and paragraph numbers: `ASC 606`, `ASC 606-10-32-31`, `IFRS 15`, `Ind AS 115`, `MCA Schedule III`, `SOX 404`. Only the connector words change ("paragraphs" -> "párrafos" / "parágrafos" / "Absätze"; see `localizeRef` in `lib/i18n.ts`).
- Acronyms: `SSP`, `GST`, `CGST/SGST/IGST`, `ERP`, `CRM`, `CPQ`, `MSA`, `SOW`, `QoE`, `SHA-256`, `BigInt`, `CSV`, `JSON`, `PDF`.
- Product and vendor names: Soluqube, Maxio, Trullion, Klarity, RightRev, Leapfin, Zuora, Chargebee, Stripe, NetSuite, ScaleXP, Salesforce, Xero, QuickBooks.
- Every number, amount and formula, character for character: `$475`, `$49`, `$1,750`, `$490`, `$100,000 / 36`, `2,777.77`, `10^6`, `18%`, `Gross / 1.18`, `$0.00`. Keep `$` and English digit separators (no `€`, `R$`, no `100.000,00`). Spacing before `%` may follow the language (`18 %` in es/de is fine), the digits may not change.
- The patent line, verbatim in English on every language: `Patent Pending (App. No. 202621096305)`.

## 2. Locked accounting terms
| English | Español (es) | Português (pt-BR) | Deutsch (de) |
|---|---|---|---|
| standalone selling price (SSP) | precio de venta independiente (SSP) | preço de venda individual (SSP) | Einzelveräußerungspreis (SSP) |
| relative-SSP method / allocation | método del SSP relativo / asignación por SSP relativo | método do SSP relativo / alocação pelo SSP relativo | Relative-SSP-Methode / Relative-SSP-Aufteilung |
| performance obligation | obligación de desempeño | obrigação de desempenho | Leistungsverpflichtung |
| transaction price | precio de la transacción | preço da transação | Transaktionspreis |
| ratable (recognition) | lineal / de forma lineal | linear / de forma linear | linear (zeitraumbezogen) |
| point in time | en un momento determinado | em um momento específico | zu einem Zeitpunkt (zeitpunktbezogen) |
| over time | a lo largo del tiempo | ao longo do tempo | über einen Zeitraum |
| deferred revenue | ingresos diferidos | receita diferida | passive Rechnungsabgrenzung |
| contract asset / contract liability | activo del contrato / pasivo del contrato | ativo de contrato / passivo de contrato | Vertragsvermögenswert / Vertragsverbindlichkeit |
| variable consideration | contraprestación variable | contraprestação variável | variable Gegenleistung |
| contract modification | modificación del contrato (pl. modificaciones de contrato) | modificação do contrato (pl. modificações do contrato) | Vertragsänderung |
| (revenue) schedule | cronograma (de reconocimiento) | cronograma | (Realisierungs-)Plan / Zeitplan |
| terminal-period remainder absorption | el último período absorbe el remanente | o último período absorve o resíduo | die letzte Periode nimmt den Restbetrag auf |
| residual cent | centavo residual | centavo residual | Restcent |
| ties to the cent | cuadra al centavo | fecha no centavo | geht auf den Cent auf |
| evidence workpaper (hashed) | papel de trabajo de evidencia (con hash) | papel de trabalho de evidência (com hash) | Nachweis-Arbeitspapier (mit Hash) |
| clause evidence (page + excerpt) | evidencia de cláusula (página y extracto textual) | evidência de cláusula (página e trecho literal) | Klauselbeleg (Seite und wörtlicher Auszug) |
| design partner | design partner | design partner | Design-Partner |
| maker-checker review | revisión maker-checker (envío y aprobación separados) | revisão maker-checker (envio e aprovação separados) | Vier-Augen-Prüfung (getrenntes Einreichen und Freigeben) |
| subledger | subledger (libro auxiliar) | subledger (razão auxiliar) | Nebenbuch |

## 3. Scope sentence (use on every translated product page)
- es: "Soluqube calcula según ASC 606 e Ind AS 115. No ofrece soporte para normas contables locales (por ejemplo, NIF D-1); las guías explican el método."
- pt-BR: "A Soluqube calcula segundo o ASC 606 e o Ind AS 115. Não atende normas contábeis locais (por exemplo, CPC 47); os guias explicam o método."
- de: "Soluqube rechnet nach ASC 606 und Ind AS 115. Nationale Rechnungslegungsstandards (z. B. HGB) werden nicht unterstützt; die Leitfäden erklären die Methode."

## 4. Claims gate in translation (CLAUDE.md section 1)
A translated page may say no more than its English source, and less where the English overstates. Never write, in any language:
- es: OCR, "lee cualquier contrato", "certificado", "Big 4", "SOC 2 / ISO / HIPAA / FIPS", "128 bits", "AS 3101", "garantía de $0.00 / cero desviación", "contabiliza modificaciones de contrato" (not built), any precision or extraction accuracy percentage.
- pt-BR: OCR, "lê qualquer contrato", "certificado", "Big 4", "SOC 2 / ISO / HIPAA / FIPS", "128 bits", "AS 3101", "garantia de $0.00 / desvio zero", "contabiliza modificações contratuais", any accuracy percentage.
- de: OCR, "liest jeden Vertrag", "zertifiziert", "Big 4", "SOC 2 / ISO / HIPAA / FIPS", "128-Bit", "AS 3101", "Garantie für $0.00 / null Abweichung", "bilanziert Vertragsänderungen", any accuracy percentage.
- Do not imply local-GAAP support (NIF D-1, CPC 47, HGB). GST applies to INR contracts only.
- Competitor prices and implementation times: use only the sourced values in `data/alternatives.ts` (or say "not published"). Do not copy unsourced competitor figures.

## 5. Known inconsistencies in the live wave-1 files (for QA, not mass-edited)
- es "schedule": `calendario` (about 235 uses) vs `cronograma` (about 18, and in `lib/i18n.ts` UI strings). Both are correct Spanish; new pages use `cronograma` to match the UI strings.
- es remainder: `remanente` (about 54) and `residuo` (about 25) both used.
- de "schedule": `Zeitplan` (about 153) vs `Realisierungsplan` (about 11) vs `Plan` in UI strings.
- pt-BR contract modification: `modificações do contrato` and `modificações de contrato` both used.
