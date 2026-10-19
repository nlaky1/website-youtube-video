import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/navbar";
import ResourceFooter from "@/components/resource-footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Soluqube handles personal data on soluqube.com and app.soluqube.com: what we collect, who processes it, how long we keep it, and your rights.",
  alternates: {
    canonical: "https://soluqube.com/privacy",
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

const collected = [
  {
    where: "Forms on soluqube.com (contact, book a walkthrough, free workpaper, design partners, \"Email me this allocation\" on the SSP calculator)",
    what: "Name, work email, company, role, the details you type, ERP and accounting standard choices; for the calculator, the inputs you choose to email yourself",
    why: "To reply to you and deliver what you asked for",
  },
  {
    where: "Sign-up at app.soluqube.com",
    what: "Email, name, company, role, a scrypt hash of your password, last sign-in time; a lead record (email, domain, company, role, source)",
    why: "To run your account",
  },
  {
    where: "Contract uploads at app.soluqube.com",
    what: "The PDF and the terms extracted from it, including any personal data inside the contract",
    why: "Processed in memory to produce your schedule; not stored in our database",
  },
  {
    where: "Analytics on soluqube.com",
    what: "Pages visited, device and browser data, approximate location, via Vercel Analytics and Google Analytics",
    why: "To understand which pages are used",
  },
  {
    where: "Payments",
    what: "Billing details handled by Stripe",
    why: "To take payment; we do not see or store card numbers",
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <p className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-3">Legal</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">Privacy Policy</h1>
        <p className="text-sm text-slate-500 mb-8">Last updated: 19 October 2026</p>

        <P>
          This policy explains how Nikhil Laky, a sole proprietor trading as Soluqube (&ldquo;Soluqube&rdquo;,
          &ldquo;we&rdquo;), Indore, Madhya Pradesh, India, handles personal data on soluqube.com and
          app.soluqube.com.
        </P>
        <P>
          Soluqube is operated by Nikhil Laky (sole proprietor). Technology and operations support: Intuitech Technologies Private Limited, Indore.
        </P>

        <H2>What we collect</H2>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm text-left text-slate-700 border border-slate-200">
            <thead className="bg-slate-50 text-xs uppercase font-mono tracking-wider text-slate-600">
              <tr>
                <th className="px-3 py-2 border-b border-slate-200">Where</th>
                <th className="px-3 py-2 border-b border-slate-200">What</th>
                <th className="px-3 py-2 border-b border-slate-200">Why</th>
              </tr>
            </thead>
            <tbody>
              {collected.map((row) => (
                <tr key={row.where} className="align-top border-b border-slate-100">
                  <td className="px-3 py-2">{row.where}</td>
                  <td className="px-3 py-2">{row.what}</td>
                  <td className="px-3 py-2">{row.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <H2>Who processes data for us</H2>
        <UL>
          <li>Vercel (hosting for both sites)</li>
          <li>Neon (Postgres database for accounts and sign-up lead records)</li>
          <li>Google Workspace (email)</li>
          <li>Google Analytics and Vercel Analytics (site analytics)</li>
          <li>Stripe (payments)</li>
          <li>Calendly (if you book a call through it)</li>
          <li>Intuitech Technologies Private Limited, Indore (technology and operations support, including sales calls; sees contact names and business phone numbers)</li>
        </UL>
        <P>These providers may process data outside your country, including in the United States.</P>

        <H2>How long we keep it</H2>
        <UL>
          <li>Uploaded contracts: not stored after processing.</li>
          <li>
            Contracts you email to us: kept only while we prepare and support your workpaper, then deleted. Deleted
            earlier on request.
          </li>
          <li>Account data: while your account is open, then deleted within 30 days of your request to close it.</li>
          <li>Form submissions and emails: kept in our mailbox so we can follow up; deleted on request.</li>
        </UL>

        <H2>What we do not do</H2>
        <UL>
          <li>We do not sell personal data.</li>
          <li>We do not use uploaded contracts to train models.</li>
        </UL>

        <H2>Your rights</H2>
        <P>
          You can ask to access, correct or delete your personal data, or withdraw consent to marketing emails, by
          writing to{" "}
          <a href="mailto:nikhil@soluqube.com" className="underline hover:text-slate-950">
            nikhil@soluqube.com
          </a>
          . Grievance officer under the Digital Personal Data Protection Act, 2023 (India): Nikhil Laky,
          nikhil@soluqube.com. We respond within 7 business days.
        </P>

        <H2>Cookies</H2>
        <P>
          The app sets one session cookie (HttpOnly, Secure, 7-day expiry) to keep you signed in. soluqube.com uses
          analytics cookies from Google Analytics. We also send Google Analytics events when a form is submitted, a booking link is
          clicked or a sample is downloaded, to measure which pages lead to enquiries; these events carry no names or email
          addresses. soluqube.com does not show a cookie banner today; you can block or
          delete cookies in your browser settings.
        </P>

        <H2>Changes</H2>
        <P>We will post changes on this page with a new date.</P>

        <P>
          Contact:{" "}
          <a href="mailto:nikhil@soluqube.com" className="underline hover:text-slate-950">
            nikhil@soluqube.com
          </a>{" "}
          &middot; Nikhil Laky, trading as Soluqube, Indore, Madhya Pradesh, India
        </P>

        <p className="text-xs text-slate-500 mt-10">
          See also: <Link href="/terms" className="underline hover:text-slate-950">Terms of Service</Link> &middot;{" "}
          <Link href="/security" className="underline hover:text-slate-950">How we handle your contracts</Link>
        </p>
      </main>
      <ResourceFooter />
    </div>
  );
}
