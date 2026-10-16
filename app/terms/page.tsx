import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/navbar";
import ResourceFooter from "@/components/resource-footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms for soluqube.com, app.soluqube.com and the workpapers we deliver: what Soluqube is, your content, fees, liability, and governing law.",
  alternates: {
    canonical: "https://soluqube.com/terms",
  },
};

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl font-bold tracking-tight text-slate-900 mt-10 mb-3">{children}</h2>
);
const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm text-slate-700 leading-relaxed mb-3">{children}</p>
);

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <p className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-3">Legal</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">Terms of Service</h1>
        <p className="text-sm text-slate-500 mb-8">Last updated: 16 October 2026</p>

        <P>
          These terms apply to soluqube.com, app.soluqube.com and any workbook or service we deliver
          (&ldquo;Soluqube&rdquo;). Soluqube is provided by Nikhil Laky, a sole proprietor trading as Soluqube,
          Indore, Madhya Pradesh, India.
        </P>

        <H2>1. What Soluqube is</H2>
        <P>
          Soluqube calculates a relative standalone selling price (SSP) allocation and a full-term revenue schedule for
          one customer contract at a time, under ASC 606 or Ind AS 115, and exports the results with SHA-256 hashes. It
          accepts USD and INR contracts. It refuses contracts with redacted prices, scanned PDFs without a text layer
          and invoices; amendments are flagged for manual review and not accounted for. Contract-modification accounting is not supported.
        </P>

        <H2>2. Not accounting, audit or legal advice</H2>
        <P>
          Soluqube is a calculation and documentation tool. Its output is an evidence package, not an audit opinion.
          You remain responsible for your accounting judgements, including SSP estimates, performance obligations and
          the confirmation of extracted terms, and for what you post to your ledger.
        </P>

        <H2>3. Your account</H2>
        <P>
          Keep your password confidential. You are responsible for activity under your account. Tell us at
          nikhil@soluqube.com if you suspect unauthorised use.
        </P>

        <H2>4. Your content</H2>
        <P>
          You keep all rights in the contracts and data you upload or send. You grant us only the rights needed to
          process them and deliver your results. You confirm you are allowed to share them with us. See the{" "}
          <Link href="/privacy" className="underline hover:text-slate-950">Privacy Policy</Link> and{" "}
          <Link href="/security" className="underline hover:text-slate-950">How we handle your contracts</Link> for how
          we treat them.
        </P>

        <H2>5. Acceptable use</H2>
        <P>
          Do not upload content you have no right to share, try to break or overload the service, or reverse-engineer
          it.
        </P>

        <H2>6. Fees</H2>
        <P>
          Current offers are listed on{" "}
          <Link href="/pricing" className="underline hover:text-slate-950">soluqube.com/pricing</Link>. Design-partner
          access is free for the stated period and ends with no automatic charge. Where a fee applies, it is stated
          before you pay, excludes taxes such as GST, and is payable in advance through Stripe or by invoice. Fees
          already paid for a period are not refunded unless we agree otherwise in writing.
        </P>

        <H2>7. Availability and support</H2>
        <P>
          We aim to keep Soluqube available but do not promise uninterrupted service or any service level unless
          agreed in writing. Support is by email from the founder, normally within 1 business day.
        </P>

        <H2>8. Intellectual property</H2>
        <P>
          Soluqube&apos;s software and site content belong to Nikhil Laky, trading as Soluqube. Patent Pending (App.
          No. 202621096305).
        </P>

        <H2>9. Warranty disclaimer and limitation of liability</H2>
        <P>
          Soluqube is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;, without warranties of any kind,
          express or implied, including fitness for a particular purpose, the accuracy of extracted terms, or the
          compliance of your accounting with any standard. To the extent permitted by law, we are not liable for
          indirect, incidental, special or consequential loss, lost profits, restatements, penalties or audit costs.
          Our total liability for all claims arising in any 12-month period is limited to the fees you paid us in that
          period, or INR 10,000 if you paid nothing. Nothing in these terms excludes liability that cannot be excluded
          under applicable law.
        </P>

        <H2>10. Termination</H2>
        <P>
          You can stop using Soluqube and ask us to delete your account at any time. We may suspend or close accounts
          that breach these terms, and will tell you why unless the law prevents it.
        </P>

        <H2>11. Governing law</H2>
        <P>
          These terms are governed by the laws of India. The courts at Indore, Madhya Pradesh have exclusive
          jurisdiction over any dispute arising from them.
        </P>

        <H2>12. Changes</H2>
        <P>We may update these terms and will post the new version on this page with a new date.</P>

        <P>
          Contact:{" "}
          <a href="mailto:nikhil@soluqube.com" className="underline hover:text-slate-950">
            nikhil@soluqube.com
          </a>{" "}
          &middot; Nikhil Laky, trading as Soluqube, Indore, Madhya Pradesh, India
        </P>
      </main>
      <ResourceFooter />
    </div>
  );
}
