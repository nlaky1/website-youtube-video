// Generated from data/i18n/<lang>/*.json (translations of data/glossary.ts, blogPosts.ts, alternatives.ts;
// pages.json holds the hand-written pages: ASC 606 hubs, soluqube-vs-*, SSP calculator).
import es_alternatives_1 from "./es/alternatives_1.json";
import es_blog_1 from "./es/blog_1.json";
import es_blog_2 from "./es/blog_2.json";
import es_blog_3 from "./es/blog_3.json";
import es_blog_4 from "./es/blog_4.json";
import es_blog_5 from "./es/blog_5.json";
import es_blog_6 from "./es/blog_6.json";
import es_blog_7 from "./es/blog_7.json";
import es_glossary_1 from "./es/glossary_1.json";
import es_glossary_2 from "./es/glossary_2.json";
import es_glossary_3 from "./es/glossary_3.json";
import es_pages from "./es/pages.json";
import pt_br_alternatives_1 from "./pt-br/alternatives_1.json";
import pt_br_blog_1 from "./pt-br/blog_1.json";
import pt_br_blog_2 from "./pt-br/blog_2.json";
import pt_br_blog_3 from "./pt-br/blog_3.json";
import pt_br_blog_4 from "./pt-br/blog_4.json";
import pt_br_blog_5 from "./pt-br/blog_5.json";
import pt_br_blog_6 from "./pt-br/blog_6.json";
import pt_br_blog_7 from "./pt-br/blog_7.json";
import pt_br_glossary_1 from "./pt-br/glossary_1.json";
import pt_br_glossary_2 from "./pt-br/glossary_2.json";
import pt_br_glossary_3 from "./pt-br/glossary_3.json";
import pt_br_pages from "./pt-br/pages.json";
import de_alternatives_1 from "./de/alternatives_1.json";
import de_blog_1 from "./de/blog_1.json";
import de_blog_2 from "./de/blog_2.json";
import de_blog_3 from "./de/blog_3.json";
import de_blog_4 from "./de/blog_4.json";
import de_blog_5 from "./de/blog_5.json";
import de_blog_6 from "./de/blog_6.json";
import de_blog_7 from "./de/blog_7.json";
import de_glossary_1 from "./de/glossary_1.json";
import de_glossary_2 from "./de/glossary_2.json";
import de_glossary_3 from "./de/glossary_3.json";
import de_pages from "./de/pages.json";

export const TRANSLATIONS = {
  "es": {
    glossary: { ...es_glossary_1, ...es_glossary_2, ...es_glossary_3 },
    blog: { ...es_blog_1, ...es_blog_2, ...es_blog_3, ...es_blog_4, ...es_blog_5, ...es_blog_6, ...es_blog_7 },
    alternatives: es_alternatives_1,
    pages: es_pages,
  },
  "pt-br": {
    glossary: { ...pt_br_glossary_1, ...pt_br_glossary_2, ...pt_br_glossary_3 },
    blog: { ...pt_br_blog_1, ...pt_br_blog_2, ...pt_br_blog_3, ...pt_br_blog_4, ...pt_br_blog_5, ...pt_br_blog_6, ...pt_br_blog_7 },
    alternatives: pt_br_alternatives_1,
    pages: pt_br_pages,
  },
  "de": {
    glossary: { ...de_glossary_1, ...de_glossary_2, ...de_glossary_3 },
    blog: { ...de_blog_1, ...de_blog_2, ...de_blog_3, ...de_blog_4, ...de_blog_5, ...de_blog_6, ...de_blog_7 },
    alternatives: de_alternatives_1,
    pages: de_pages,
  },
} as const;
