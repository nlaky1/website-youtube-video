// Optional FAQs on glossary + alternatives pages (lib/page-faqs.ts): FAQPage only when FAQs exist. Run: npm run test:tools
import assert from "node:assert/strict";
import { test } from "node:test";

const { faqGraph, faqPageNode } = await import("../lib/page-faqs.ts");

test("no FAQs means no FAQPage node", () => {
  assert.deepEqual(faqGraph("https://soluqube.com/glossary/x"), []);
  assert.deepEqual(faqGraph("https://soluqube.com/glossary/x", []), []);
});

test("FAQs map to Question/Answer pairs, in order, with a page-scoped @id", () => {
  const url = "https://soluqube.com/alternatives/maxio";
  const faqs = [{ question: "Q1?", answer: "A1." }, { question: "Q2?", answer: "A2." }];
  const [node] = faqGraph(url, faqs);
  assert.deepEqual(node, faqPageNode(url, faqs));
  assert.equal(node["@type"], "FAQPage");
  assert.equal(node["@id"], `${url}#faq`);
  assert.deepEqual(node.mainEntity.map((q) => [q.name, q.acceptedAnswer.text]), [["Q1?", "A1."], ["Q2?", "A2."]]);
});
