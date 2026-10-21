export interface PageFaq {
  question: string;
  answer: string;
}

/** FAQPage node for a page's @graph; only call when the page has FAQs (they must also be visible on the page). */
export function faqPageNode(url: string, faqs: PageFaq[]) {
  return {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };
}

/** The extra @graph entries for a page: the FAQPage node when it has FAQs, otherwise nothing. */
export function faqGraph(url: string, faqs?: PageFaq[]) {
  return faqs && faqs.length ? [faqPageNode(url, faqs)] : [];
}
