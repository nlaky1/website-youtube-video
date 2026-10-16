import Link from "next/link";

/** Minimal footer for the glossary and alternatives pages. */
export default function ResourceFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white py-10 text-slate-500 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-900">Soluqube</span>
          <span>|</span>
          <span>ASC 606 &amp; Ind AS 115 revenue allocation</span>
        </div>
        <nav className="flex flex-wrap items-center gap-5 text-slate-600">
          <Link href="/" className="hover:text-slate-950">Home</Link>
          <Link href="/glossary" className="hover:text-slate-950">Glossary</Link>
          <Link href="/alternatives" className="hover:text-slate-950">Alternatives</Link>
          <Link href="/blog" className="hover:text-slate-950">Blog</Link>
          <Link href="/asc-606" className="hover:text-slate-950">ASC 606 Hub</Link>
          <Link href="/design-partners" className="hover:text-slate-950">Design Partners</Link>
          <Link href="/privacy" className="hover:text-slate-950">Privacy</Link>
          <Link href="/terms" className="hover:text-slate-950">Terms</Link>
          <Link href="/security" className="hover:text-slate-950">Security</Link>
        </nav>
      </div>
    </footer>
  );
}
