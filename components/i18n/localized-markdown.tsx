import React from "react";
import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { localizeHref, localizeMarkdownLinks } from "@/lib/i18n-data";
import type { Locale } from "@/lib/i18n";

const linkClass = "text-emerald-700 font-medium underline underline-offset-2 decoration-emerald-300 hover:text-emerald-900";

/** Same look as the English blog renderer; internal links point at the translation when one exists. */
export default function LocalizedMarkdown({ lang, children }: { lang: Locale; children: string }) {
  const components: Components = {
    h2: ({ node, ...props }) => <h2 {...props} className="text-xl sm:text-2xl font-bold text-slate-900 pt-6 border-b border-slate-200 pb-2 scroll-mt-24" />,
    h3: ({ node, ...props }) => <h3 {...props} className="text-lg font-bold text-slate-900 pt-2 scroll-mt-24" />,
    p: ({ node, ...props }) => <p {...props} className="text-slate-700 leading-relaxed text-sm sm:text-base" />,
    ul: ({ node, ...props }) => <ul {...props} className="space-y-2 pl-5 list-disc marker:text-emerald-600" />,
    ol: ({ node, ...props }) => <ol {...props} className="space-y-2 pl-5 list-decimal marker:text-emerald-600" />,
    li: ({ node, ...props }) => <li {...props} className="text-slate-700 text-sm sm:text-base leading-relaxed" />,
    strong: ({ node, ...props }) => <strong {...props} className="font-semibold text-slate-900" />,
    hr: () => <hr className="border-slate-200" />,
    blockquote: ({ node, ...props }) => <blockquote {...props} className="border-l-4 border-emerald-300 pl-4 text-slate-600 italic" />,
    pre: ({ node, children }) => (
      <div className="rounded-xl bg-slate-900 border border-slate-800 p-4 font-mono text-xs text-emerald-300 overflow-x-auto my-4 shadow-sm">
        <pre>{children}</pre>
      </div>
    ),
    code: ({ node, className, children, ...props }) => (
      <code {...props} className={className}>
        {children}
      </code>
    ),
    table: ({ node, ...props }) => (
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table {...props} className="w-full text-left text-xs sm:text-sm border-collapse" />
      </div>
    ),
    th: ({ node, ...props }) => <th {...props} className="p-3 font-semibold text-slate-900 bg-slate-50 border-b border-slate-200 align-top" />,
    td: ({ node, ...props }) => <td {...props} className="p-3 text-slate-700 border-b border-slate-100 align-top" />,
    a: ({ node, href = "", children, ...props }) => {
      const isFile = /\.(csv|json|pdf|xlsx|zip)(\?|#|$)/i.test(href);
      const internal = !isFile && (href.startsWith("/") || href.startsWith("#") || /^https:\/\/soluqube\.com(\/|$)/.test(href));
      if (internal) {
        return (
          <Link href={href.startsWith("#") ? href : localizeHref(lang, href)} className={linkClass}>
            {children}
          </Link>
        );
      }
      return (
        <a {...props} href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {children}
        </a>
      );
    },
  };
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]} components={components}>
      {localizeMarkdownLinks(lang, children)}
    </ReactMarkdown>
  );
}
