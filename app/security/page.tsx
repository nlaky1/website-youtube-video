import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/navbar";
import ResourceFooter from "@/components/resource-footer";

export const metadata: Metadata = {
  title: "How We Handle Your Contracts",
  description:
    "What Soluqube does with a contract you upload: processed in memory, not stored; what account data we keep; how accounts are protected; what we do not claim.",
  alternates: {
    canonical: "https://soluqube.com/security",
  },
};

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl font-bold tracking-tight text-slate-900 mt-10 mb-3">{children}</h2>
);
const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm text-slate-700 leading-relaxed mb-3">{children}</p>
);
const UL = ({ children }: { children: React.ReactNode }) => (
  <ul className="list-disc pl-5 text-sm text-slate-700 leading-relaxed space-y-1.5 mb-3">{children}</ul>
);
const OL = ({ children }: { children: React.ReactNode }) => (
  <ol className="list-decimal pl-5 text-sm text-slate-700 leading-relaxed space-y-1.5 mb-3">{children}</ol>
);

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <p className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-3">Security</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
          How we handle your contracts
        </h1>
        <p className="text-sm text-slate-500 mb-8">Last updated: 16 October 2026</p>

        <P>
          Soluqube is operated by Nikhil Laky, a sole proprietor trading as Soluqube, Indore, Madhya Pradesh, India.
          Soluqube is built and run by one founder. This page states what the product does with a contract you upload
          today, and what it does not do.
        </P>

        <H2>What happens when you upload a contract</H2>
        <OL>
          <li>You upload one PDF at app.soluqube.com while signed in. The upload limit is 4.5 MB.</li>
          <li>
            The server reads the file in memory, checks that it is a PDF, and extracts the parties, price, performance
            obligations, term and the page and excerpt each value came from.
          </li>
          <li>You review and confirm the extracted terms. Only then is the allocation and schedule calculated.</li>
          <li>You download the results (Excel workbook, CSV or JSON). They are built in memory for that download.</li>
        </OL>

        <H2>What we store, and what we do not</H2>
        <UL>
          <li>
            <strong>Uploaded contracts are not stored in our database.</strong> The PDF and the extracted terms are
            processed in memory for that request. There is no table for uploaded files, and the upload code does not
            write the file to disk or to file storage.
          </li>
          <li>
            <strong>Account data is stored.</strong> When you sign up we store your email, name, company, role, a
            scrypt hash of your password, and your last sign-in time. A sign-up also creates a lead record (email,
            domain, company, role, source).
          </li>
          <li>
            Error logs from the hosting platform may record request metadata and error messages. Vercel keeps them for
            a limited period under its log-retention policy; we do not copy them elsewhere.
          </li>
          <li>
            Contracts you send by email (for example for the free 3-contract workpaper or the design-partner pilot) are
            handled by the founder by hand, not by the app. They are kept in the founder&apos;s Google Workspace account
            while the workpaper is prepared and supported, then deleted. We delete them earlier on request.
          </li>
        </UL>

        <H2>Where it runs</H2>
        <UL>
          <li>
            <strong>Hosting:</strong> the app and this website run on Vercel.
          </li>
          <li>
            <strong>Database:</strong> Neon Postgres, used for accounts and sign-up lead records only.
          </li>
          <li>
            <strong>Email:</strong> form submissions on soluqube.com are emailed to the founder through Google
            Workspace SMTP.
          </li>
          <li>
            <strong>Analytics on soluqube.com:</strong> Vercel Analytics and Google Analytics.
          </li>
          <li>
            <strong>Payments:</strong> Stripe, if and when you pay online. We do not see or store card numbers.
          </li>
        </UL>

        <H2>How accounts are protected</H2>
        <UL>
          <li>Passwords are hashed with scrypt (random salt per password). We never store the password itself.</li>
          <li>The session cookie is HttpOnly, Secure (in production), SameSite=Lax, and expires after 7 days.</li>
          <li>
            The app sends a Content-Security-Policy, Strict-Transport-Security, X-Frame-Options (SAMEORIGIN),
            X-Content-Type-Options (nosniff) and a Referrer-Policy on every response.
          </li>
          <li>All traffic is served over HTTPS.</li>
        </UL>

        <H2>What we do not claim</H2>
        <UL>
          <li>We hold no SOC 2 report, ISO certification or other third-party attestation.</li>
          <li>There is no self-hosted or private-cloud version today.</li>
          <li>Uploaded contracts are not used to train any model.</li>
          <li>We do not have a 24/7 support desk. The founder answers within 1 business day.</li>
        </UL>

        <H2>Your controls</H2>
        <UL>
          <li>
            Redact names and counterparties if you prefer. Prices must stay visible: the app refuses contracts with
            redacted prices, as well as scans without a text layer, invoices, amendments and currencies other than USD
            and INR.
          </li>
          <li>To test without any confidential data, use a public contract from SEC EDGAR.</li>
          <li>We sign a mutual NDA on request. A data processing agreement (DPA) is available on request.</li>
          <li>
            To delete your account or ask what we hold about you, email{" "}
            <a href="mailto:nikhil@soluqube.com" className="underline hover:text-slate-950">
              nikhil@soluqube.com
            </a>
            .
          </li>
        </UL>

        <H2>Reporting a security issue</H2>
        <P>
          Email{" "}
          <a href="mailto:nikhil@soluqube.com" className="underline hover:text-slate-950">
            nikhil@soluqube.com
          </a>
          . We acknowledge within 2 business days.
        </P>

        <p className="text-xs text-slate-500 mt-10">
          See also: <Link href="/privacy" className="underline hover:text-slate-950">Privacy Policy</Link> &middot;{" "}
          <Link href="/terms" className="underline hover:text-slate-950">Terms of Service</Link>
        </p>
      </main>
      <ResourceFooter />
    </div>
  );
}
