/**
 * Multilingual wave 1 (es, pt-br, de): locale list, hreflang helpers and UI strings.
 * Content translations live in data/i18n/<lang>/*.json; this file only holds chrome text.
 * Claims gate applies in every language: nothing here may say more than the English site does.
 */

export const SITE = "https://soluqube.com";
export const LOCALES = ["es", "pt-br", "de"] as const;
export type Locale = (typeof LOCALES)[number];

export const HREFLANG: Record<Locale, string> = { es: "es", "pt-br": "pt-BR", de: "de" };
export const OG_LOCALE: Record<Locale, string> = { es: "es_ES", "pt-br": "pt_BR", de: "de_DE" };
export const DATE_LOCALE: Record<Locale, string> = { es: "es-ES", "pt-br": "pt-BR", de: "de-DE" };
export const LANG_NAME: Record<Locale, string> = { es: "Español", "pt-br": "Português (Brasil)", de: "Deutsch" };

export function isLocale(x: string): x is Locale {
  return (LOCALES as readonly string[]).includes(x);
}

/** Absolute URL of a path ("/glossary/x", "/" for the language hub) in a language. */
export function localeUrl(lang: Locale, path: string): string {
  return `${SITE}/${lang}${path === "/" ? "" : path}`;
}

/** Next.js `alternates.languages` map: English + the given languages + x-default (English). */
export function hreflangMap(path: string, langs: readonly Locale[]): Record<string, string> {
  const map: Record<string, string> = { en: `${SITE}${path === "/" ? "" : path}` };
  for (const l of langs) map[HREFLANG[l]] = localeUrl(l, path);
  map["x-default"] = map.en;
  return map;
}

export function formatDate(lang: Locale, human: string): string {
  const d = new Date(`${human} 12:00:00 UTC`);
  if (isNaN(d.getTime())) return human;
  return d.toLocaleDateString(DATE_LOCALE[lang], { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

/** "paragraphs 22–23" / "606-10-32-31 to 32-34" -> target-language connectors; digits untouched. */
export function localizeRef(lang: Locale, ref: string): string {
  const w = {
    es: { paragraphs: "párrafos", paragraph: "párrafo", and: "y", to: "a" },
    "pt-br": { paragraphs: "parágrafos", paragraph: "parágrafo", and: "e", to: "a" },
    de: { paragraphs: "Absätze", paragraph: "Absatz", and: "und", to: "bis" },
  }[lang];
  return ref
    .replace(/\bparagraphs\b/g, w.paragraphs)
    .replace(/\bparagraph\b/g, w.paragraph)
    .replace(/(?<=[\d)a-z]) and (?=\d)/g, ` ${w.and} `)
    .replace(/(?<=[\d)a-z]) to (?=\d)/g, ` ${w.to} `);
}

export interface Strings {
  tagline: string;
  nav: { home: string; glossary: string; blog: string; alternatives: string; designPartners: string; contact: string };
  language: string;
  legalNote: string;
  breadcrumbHome: string;
  hub: {
    title: string;
    description: string;
    h1: string;
    sub: string;
    points: string[];
    limits: string;
    sections: { glossary: string; blog: string; alternatives: string };
    sectionsBody: { glossary: string; blog: string; alternatives: string };
    ctaTitle: string;
    ctaBody: string;
    ctaBtn: string;
    english: string;
  };
  glossary: {
    indexTitle: string;
    indexDesc: (n: number) => string;
    h1: string;
    intro: (n: number) => string;
    standardRefs: string;
    workedExample: string;
    result: string;
    illustrative: string;
    mistakes: string;
    howSoluqube: string;
    related: string;
    further: string;
    ctaTitle: string;
    ctaBody: string;
    ctaBtn: string;
    setName: string;
  };
  alt: {
    indexTitle: string;
    indexDesc: string;
    h1: string;
    intro: string;
    checked: (d: string) => string;
    h1For: (name: string) => string;
    goodAt: (name: string) => string;
    builtFor: string;
    whyLook: (name: string) => string;
    glance: string;
    product: string;
    standards: string;
    ssp: string;
    pricing: string;
    current: string;
    notMentioned: string;
    picks: (n: number, name: string) => string;
    whoFor: string;
    asAlt: (name: string) => string;
    strengths: string;
    limits: string;
    pricingLabel: string;
    headToHead: (name: string) => string;
    howToChoose: string;
    chooseOutro: string;
    calcLabel: string;
    relatedReading: string;
    ctaTitle: string;
    ctaBody: string;
    ctaBtn: string;
    sources: (d: string) => string;
    alternativesTo: string;
    sourcesCount: string;
  };
  blog: {
    indexTitle: string;
    indexDesc: string;
    h1: string;
    intro: string;
    published: string;
    toc: string;
    directAnswer: string;
    target: string;
    tags: string;
    faq: string;
    prev: string;
    next: string;
    ctaTitle: string;
    ctaBody: string;
    ctaBtn: string;
    authorRole: string;
    computedBy: string;
  };
  faqHeading: string;
}

const es: Strings = {
  tagline: "Asignación de ingresos ASC 606 e Ind AS 115",
  nav: { home: "Inicio", glossary: "Glosario", blog: "Blog", alternatives: "Alternativas", designPartners: "Design partners", contact: "Contacto" },
  language: "Idioma",
  legalNote: "Aviso legal, privacidad y seguridad: solo en inglés.",
  breadcrumbHome: "Inicio",
  hub: {
    title: "Asignación de SSP ASC 606 e Ind AS 115 | Soluqube",
    description: "Guías en español sobre ASC 606, IFRS 15 e Ind AS 115: glosario, artículos técnicos y alternativas, con ejemplos numéricos y referencias a la norma.",
    h1: "Reconocimiento de ingresos: ASC 606, IFRS 15 e Ind AS 115",
    sub: "Cuando un auditor cuestiona una asignación de precio de venta independiente (SSP) o una modificación de contrato, el controller suele defenderla desde una hoja de cálculo. Soluqube calcula la asignación por SSP relativo, un cronograma que cuadra al centavo y un papel de trabajo con hash SHA-256.",
    points: [
      "Aritmética de enteros (BigInt) a escala 10^6, redondeada a centavos; el último elemento absorbe el residuo y el diferido termina en $0.00.",
      "Evidencia de cláusula por obligación de desempeño: página y extracto textual; en PDF con capa de texto, además un resaltado en la línea citada.",
      "Aislamiento de GST del 18 % solo en contratos en INR (Ind AS 115); los contratos de EE. UU. no llevan GST.",
    ],
    limits:
      "Límites: la extracción del contrato es heurística y requiere confirmación humana; no se leen PDF escaneados sin capa de texto; Soluqube soporta ASC 606 e Ind AS 115, no normas contables locales; la contabilización de modificaciones de contrato aún no está construida.",
    sections: { glossary: "Glosario de reconocimiento de ingresos", blog: "Artículos técnicos", alternatives: "Alternativas de software" },
    sectionsBody: {
      glossary: "Definiciones directas, referencias a la norma y un ejemplo numérico por cada término.",
      blog: "Guías de asignación de SSP, modificaciones, GST y evidencia de auditoría.",
      alternatives: "Comparativas con fuentes públicas de cada proveedor: para quién sirve, fortalezas y límites.",
    },
    ctaTitle: "¿Defiende una asignación de SSP este trimestre?",
    ctaBody: "Envíe tres contratos. Usted confirma las obligaciones y los precios; recibe la asignación por SSP relativo, un cronograma que cuadra al centavo y un papel de trabajo con hash que puede volver a ejecutar.",
    ctaBtn: "Programa de design partners (en inglés)",
    english: "Versión en inglés",
  },
  glossary: {
    indexTitle: "Glosario ASC 606 e Ind AS 115 | Soluqube",
    indexDesc: (n) => `${n} términos de reconocimiento de ingresos (ASC 606, IFRS 15, Ind AS 115) con definición, referencias a la norma y ejemplo numérico.`,
    h1: "Glosario de reconocimiento de ingresos",
    intro: (n) => `${n} términos de ASC 606, IFRS 15 e Ind AS 115. Cada entrada incluye una definición directa, los párrafos de origen, un ejemplo numérico ilustrativo y los errores que los auditores señalan con más frecuencia.`,
    standardRefs: "Referencias a la norma",
    workedExample: "Ejemplo resuelto",
    result: "Resultado",
    illustrative: "Cifras ilustrativas solo para explicar; no provienen de un contrato real.",
    mistakes: "Errores frecuentes",
    howSoluqube: "Cómo lo trata Soluqube",
    related: "Términos relacionados",
    further: "Para seguir leyendo",
    ctaTitle: "¿Defiende una asignación de SSP este trimestre?",
    ctaBody: "Envíe tres contratos. Usted confirma las obligaciones y los precios; recibe la asignación por SSP relativo, un cronograma que cuadra al centavo y un papel de trabajo con hash que puede volver a ejecutar.",
    ctaBtn: "Ser design partner (en inglés)",
    setName: "Glosario de reconocimiento de ingresos de Soluqube",
  },
  alt: {
    indexTitle: "Alternativas de software de reconocimiento de ingresos",
    indexDesc: "Alternativas a Maxio, Zuora RevPro, Chargebee RevRec, NetSuite ARM, RightRev y más, con límites y precios tomados de los sitios de cada proveedor.",
    h1: "Alternativas de software de reconocimiento de ingresos",
    intro: "Guías por producto con quién encaja, fortalezas, límites y precio publicado. Soluqube aparece como una opción más; las fuentes están al final de cada página.",
    checked: (d) => `Datos revisados el ${d}.`,
    h1For: (n) => `Alternativas a ${n}`,
    goodAt: (n) => `En qué es bueno ${n}`,
    builtFor: "Pensado para:",
    whyLook: (n) => `Por qué los equipos buscan alternativas a ${n}`,
    glance: "De un vistazo",
    product: "Producto",
    standards: "Normas mencionadas",
    ssp: "SSP",
    pricing: "Precio",
    current: "actual",
    notMentioned: "«Not mentioned» significa que las páginas del proveedor que leímos no lo dicen, no que el producto carezca de ello.",
    picks: (n, name) => `${n} alternativas a ${name}`,
    whoFor: "Para quién es:",
    asAlt: (n) => `Como alternativa a ${n}:`,
    strengths: "Fortalezas",
    limits: "Límites",
    pricingLabel: "Precio:",
    headToHead: (n) => `Cara a cara: Soluqube vs ${n}`,
    howToChoose: "Cómo elegir",
    chooseOutro: "Sea cual sea su preselección, vuelva a calcular usted mismo una asignación. La calculadora de asignación de SSP y las entradas del glosario sobre el método del SSP relativo y las modificaciones de contrato muestran qué comprobar.",
    calcLabel: "Calculadora de asignación de SSP (en inglés)",
    relatedReading: "Lectura relacionada:",
    ctaTitle: "¿Quiere probar Soluqube con sus propios contratos?",
    ctaBody: "Los design partners tienen 60 días gratis con contratos reales: asignación por SSP relativo, un cronograma que cuadra al centavo y un papel de trabajo con hash. No sustituye la facturación ni su ERP.",
    ctaBtn: "Ver el programa de design partners (en inglés)",
    sources: (d) => `Fuentes (revisadas el ${d})`,
    alternativesTo: "Alternativas a:",
    sourcesCount: "fuentes",
  },
  blog: {
    indexTitle: "Blog técnico de ASC 606 e Ind AS 115 | Soluqube",
    indexDesc: "Artículos técnicos sobre asignación de SSP, modificaciones de contrato, GST y evidencia de auditoría bajo ASC 606, IFRS 15 e Ind AS 115.",
    h1: "Blog técnico de reconocimiento de ingresos",
    intro: "Guías para controllers, auditores y responsables de finanzas sobre ASC 606, IFRS 15 e Ind AS 115.",
    published: "Publicado",
    toc: "En esta guía",
    directAnswer: "Respuesta directa",
    target: "Consulta",
    tags: "Etiquetas contables:",
    faq: "Preguntas frecuentes",
    prev: "Guía anterior",
    next: "Guía siguiente",
    ctaTitle: "¿Quiere probar esto con sus contratos?",
    ctaBody: "Los design partners tienen 60 días gratis con contratos reales.",
    ctaBtn: "Design partners (en inglés)",
    authorRole: "Contenido técnico contable",
    computedBy: "Calculado por: motor de Soluqube",
  },
  faqHeading: "Preguntas frecuentes",
};

const ptBr: Strings = {
  tagline: "Alocação de receita ASC 606 e Ind AS 115",
  nav: { home: "Início", glossary: "Glossário", blog: "Blog", alternatives: "Alternativas", designPartners: "Design partners", contact: "Contato" },
  language: "Idioma",
  legalNote: "Termos, privacidade e segurança: apenas em inglês.",
  breadcrumbHome: "Início",
  hub: {
    title: "Alocação de SSP ASC 606 e Ind AS 115 | Soluqube",
    description: "Guias em português sobre ASC 606, IFRS 15 e Ind AS 115: glossário, artigos técnicos e alternativas, com exemplos numéricos e referências à norma.",
    h1: "Reconhecimento de receita: ASC 606, IFRS 15 e Ind AS 115",
    sub: "Quando um auditor questiona uma alocação de preço de venda individual (SSP) ou uma modificação contratual, o controller costuma defendê-la a partir de uma planilha. A Soluqube calcula a alocação pelo SSP relativo, um cronograma que fecha no centavo e um papel de trabalho com hash SHA-256.",
    points: [
      "Aritmética de inteiros (BigInt) na escala 10^6, arredondada para centavos; o último item absorve o resíduo e o diferido termina em $0.00.",
      "Evidência de cláusula por obrigação de desempenho: página e trecho literal; em PDF com camada de texto, também um destaque na linha citada.",
      "Isolamento de GST de 18% apenas em contratos em INR (Ind AS 115); contratos dos EUA não têm GST.",
    ],
    limits:
      "Limites: a extração do contrato é heurística e exige confirmação humana; PDFs escaneados sem camada de texto não são lidos; a Soluqube atende ASC 606 e Ind AS 115, não normas contábeis locais; a contabilização de modificações contratuais ainda não foi construída.",
    sections: { glossary: "Glossário de reconhecimento de receita", blog: "Artigos técnicos", alternatives: "Alternativas de software" },
    sectionsBody: {
      glossary: "Definições diretas, referências à norma e um exemplo numérico para cada termo.",
      blog: "Guias de alocação de SSP, modificações, GST e evidência de auditoria.",
      alternatives: "Comparativos com fontes públicas de cada fornecedor: para quem serve, pontos fortes e limites.",
    },
    ctaTitle: "Vai defender uma alocação de SSP neste trimestre?",
    ctaBody: "Envie três contratos. Você confirma as obrigações e os preços; recebe a alocação pelo SSP relativo, um cronograma que fecha no centavo e um papel de trabalho com hash que pode ser reexecutado.",
    ctaBtn: "Programa de design partners (em inglês)",
    english: "Versão em inglês",
  },
  glossary: {
    indexTitle: "Glossário ASC 606 e Ind AS 115 | Soluqube",
    indexDesc: (n) => `${n} termos de reconhecimento de receita (ASC 606, IFRS 15, Ind AS 115) com definição, referências à norma e exemplo numérico.`,
    h1: "Glossário de reconhecimento de receita",
    intro: (n) => `${n} termos de ASC 606, IFRS 15 e Ind AS 115. Cada verbete traz uma definição direta, os parágrafos de origem, um exemplo numérico ilustrativo e os erros que os auditores mais apontam.`,
    standardRefs: "Referências à norma",
    workedExample: "Exemplo resolvido",
    result: "Resultado",
    illustrative: "Valores ilustrativos apenas para explicação; não vêm de um contrato real.",
    mistakes: "Erros comuns",
    howSoluqube: "Como a Soluqube trata isso",
    related: "Termos relacionados",
    further: "Para continuar lendo",
    ctaTitle: "Vai defender uma alocação de SSP neste trimestre?",
    ctaBody: "Envie três contratos. Você confirma as obrigações e os preços; recebe a alocação pelo SSP relativo, um cronograma que fecha no centavo e um papel de trabalho com hash que pode ser reexecutado.",
    ctaBtn: "Seja um design partner (em inglês)",
    setName: "Glossário de reconhecimento de receita da Soluqube",
  },
  alt: {
    indexTitle: "Alternativas de software de reconhecimento de receita",
    indexDesc: "Alternativas a Maxio, Zuora RevPro, Chargebee RevRec, NetSuite ARM, RightRev e mais, com limites e preços tirados dos sites de cada fornecedor.",
    h1: "Alternativas de software de reconhecimento de receita",
    intro: "Guias por produto com para quem serve, pontos fortes, limites e preço publicado. A Soluqube aparece como uma das opções; as fontes ficam no fim de cada página.",
    checked: (d) => `Dados conferidos em ${d}.`,
    h1For: (n) => `Alternativas ao ${n}`,
    goodAt: (n) => `No que ${n} é bom`,
    builtFor: "Feito para:",
    whyLook: (n) => `Por que as equipes procuram alternativas ao ${n}`,
    glance: "Visão geral",
    product: "Produto",
    standards: "Normas citadas",
    ssp: "SSP",
    pricing: "Preço",
    current: "atual",
    notMentioned: "\"Not mentioned\" significa que as páginas do fornecedor que lemos não dizem isso, não que o produto não tenha o recurso.",
    picks: (n, name) => `${n} alternativas ao ${name}`,
    whoFor: "Para quem é:",
    asAlt: (n) => `Como alternativa ao ${n}:`,
    strengths: "Pontos fortes",
    limits: "Limites",
    pricingLabel: "Preço:",
    headToHead: (n) => `Frente a frente: Soluqube vs ${n}`,
    howToChoose: "Como escolher",
    chooseOutro: "Qualquer que seja a sua lista curta, refaça você mesmo uma alocação. A calculadora de alocação de SSP e os verbetes do glossário sobre o método do SSP relativo e as modificações contratuais mostram o que conferir.",
    calcLabel: "Calculadora de alocação de SSP (em inglês)",
    relatedReading: "Leitura relacionada:",
    ctaTitle: "Quer testar a Soluqube com os seus contratos?",
    ctaBody: "Design partners têm 60 dias grátis com contratos reais: alocação pelo SSP relativo, um cronograma que fecha no centavo e um papel de trabalho com hash. Não substitui o faturamento nem o seu ERP.",
    ctaBtn: "Ver o programa de design partners (em inglês)",
    sources: (d) => `Fontes (conferidas em ${d})`,
    alternativesTo: "Alternativas a:",
    sourcesCount: "fontes",
  },
  blog: {
    indexTitle: "Blog técnico de ASC 606 e Ind AS 115 | Soluqube",
    indexDesc: "Artigos técnicos sobre alocação de SSP, modificações contratuais, GST e evidência de auditoria sob ASC 606, IFRS 15 e Ind AS 115.",
    h1: "Blog técnico de reconhecimento de receita",
    intro: "Guias para controllers, auditores e líderes de finanças sobre ASC 606, IFRS 15 e Ind AS 115.",
    published: "Publicado",
    toc: "Neste guia",
    directAnswer: "Resposta direta",
    target: "Consulta",
    tags: "Tags contábeis:",
    faq: "Perguntas frequentes",
    prev: "Guia anterior",
    next: "Próximo guia",
    ctaTitle: "Quer testar isso com os seus contratos?",
    ctaBody: "Design partners têm 60 dias grátis com contratos reais.",
    ctaBtn: "Design partners (em inglês)",
    authorRole: "Conteúdo técnico contábil",
    computedBy: "Calculado por: motor da Soluqube",
  },
  faqHeading: "Perguntas frequentes",
};

const de: Strings = {
  tagline: "Umsatzaufteilung nach ASC 606 und Ind AS 115",
  nav: { home: "Start", glossary: "Glossar", blog: "Blog", alternatives: "Alternativen", designPartners: "Design-Partner", contact: "Kontakt" },
  language: "Sprache",
  legalNote: "Nutzungsbedingungen, Datenschutz und Sicherheit: nur auf Englisch.",
  breadcrumbHome: "Start",
  hub: {
    title: "SSP-Aufteilung nach ASC 606 und Ind AS 115 | Soluqube",
    description: "Deutschsprachige Leitfäden zu ASC 606, IFRS 15 und Ind AS 115: Glossar, Fachartikel und Alternativen, mit Zahlenbeispielen und Standardverweisen.",
    h1: "Umsatzrealisierung: ASC 606, IFRS 15 und Ind AS 115",
    sub: "Wenn ein Prüfer eine Aufteilung nach dem Einzelveräußerungspreis (SSP) oder eine Vertragsänderung hinterfragt, verteidigen Controller sie oft aus einer selbstgebauten Tabelle. Soluqube berechnet die Aufteilung nach der Relative-SSP-Methode, einen Realisierungsplan, der auf den Cent aufgeht, und ein Arbeitspapier mit SHA-256-Hash.",
    points: [
      "Ganzzahl-Arithmetik (BigInt) im Maßstab 10^6, auf Cent gerundet; die letzte Verpflichtung nimmt den Rest auf, die Abgrenzung endet bei $0.00.",
      "Klauselbeleg je Leistungsverpflichtung: Seite und wörtlicher Auszug; bei PDFs mit Textebene zusätzlich eine Markierung der zitierten Zeile.",
      "Trennung der 18 % GST nur bei Verträgen in INR (Ind AS 115); US-Verträge enthalten keine GST.",
    ],
    limits:
      "Grenzen: Die Vertragsextraktion ist heuristisch und braucht eine menschliche Bestätigung; gescannte PDFs ohne Textebene werden nicht gelesen; Soluqube unterstützt ASC 606 und Ind AS 115, keine nationalen Rechnungslegungsstandards (z. B. HGB); die Bilanzierung von Vertragsänderungen ist noch nicht gebaut.",
    sections: { glossary: "Glossar zur Umsatzrealisierung", blog: "Fachartikel", alternatives: "Software-Alternativen" },
    sectionsBody: {
      glossary: "Direkte Definitionen, Standardverweise und ein Zahlenbeispiel zu jedem Begriff.",
      blog: "Leitfäden zu SSP-Aufteilung, Vertragsänderungen, GST und Prüfungsnachweisen.",
      alternatives: "Vergleiche mit öffentlichen Quellen der Anbieter: für wen geeignet, Stärken und Grenzen.",
    },
    ctaTitle: "Müssen Sie in diesem Quartal eine SSP-Aufteilung verteidigen?",
    ctaBody: "Senden Sie drei Verträge. Sie bestätigen Verpflichtungen und Preise; Sie erhalten die Relative-SSP-Aufteilung, einen Plan, der auf den Cent aufgeht, und ein Arbeitspapier mit Hash, das sich erneut ausführen lässt.",
    ctaBtn: "Design-Partner-Programm (auf Englisch)",
    english: "Englische Version",
  },
  glossary: {
    indexTitle: "Glossar zu ASC 606 und Ind AS 115 | Soluqube",
    indexDesc: (n) => `${n} Begriffe zur Umsatzrealisierung (ASC 606, IFRS 15, Ind AS 115) mit Definition, Standardverweisen und Zahlenbeispiel.`,
    h1: "Glossar zur Umsatzrealisierung",
    intro: (n) => `${n} Begriffe aus ASC 606, IFRS 15 und Ind AS 115. Jeder Eintrag enthält eine direkte Definition, die Fundstellen im Standard, ein illustratives Zahlenbeispiel und die Fehler, die Prüfer am häufigsten beanstanden.`,
    standardRefs: "Verweise auf den Standard",
    workedExample: "Rechenbeispiel",
    result: "Ergebnis",
    illustrative: "Illustrative Zahlen nur zur Erklärung, nicht aus einem echten Vertrag.",
    mistakes: "Häufige Fehler",
    howSoluqube: "Wie Soluqube damit umgeht",
    related: "Verwandte Begriffe",
    further: "Weiterführende Artikel",
    ctaTitle: "Müssen Sie in diesem Quartal eine SSP-Aufteilung verteidigen?",
    ctaBody: "Senden Sie drei Verträge. Sie bestätigen Verpflichtungen und Preise; Sie erhalten die Relative-SSP-Aufteilung, einen Plan, der auf den Cent aufgeht, und ein Arbeitspapier mit Hash, das sich erneut ausführen lässt.",
    ctaBtn: "Design-Partner werden (auf Englisch)",
    setName: "Soluqube-Glossar zur Umsatzrealisierung",
  },
  alt: {
    indexTitle: "Alternativen zu Revenue-Recognition-Software",
    indexDesc: "Alternativen zu Maxio, Zuora RevPro, Chargebee RevRec, NetSuite ARM, RightRev und mehr, mit Grenzen und Preisen aus den Quellen der Anbieter.",
    h1: "Alternativen zu Revenue-Recognition-Software",
    intro: "Leitfäden je Produkt: für wen es passt, Stärken, Grenzen und veröffentlichte Preise. Soluqube ist eine der aufgeführten Optionen; die Quellen stehen am Ende jeder Seite.",
    checked: (d) => `Angaben geprüft am ${d}.`,
    h1For: (n) => `Alternativen zu ${n}`,
    goodAt: (n) => `Wofür ${n} gut ist`,
    builtFor: "Gedacht für:",
    whyLook: (n) => `Warum Teams nach Alternativen zu ${n} suchen`,
    glance: "Auf einen Blick",
    product: "Produkt",
    standards: "Genannte Standards",
    ssp: "SSP",
    pricing: "Preis",
    current: "aktuell",
    notMentioned: "„Not mentioned“ heißt: Die gelesenen Anbieterseiten sagen es nicht, nicht dass dem Produkt die Funktion fehlt.",
    picks: (n, name) => `${n} Alternativen zu ${name}`,
    whoFor: "Für wen:",
    asAlt: (n) => `Als Alternative zu ${n}:`,
    strengths: "Stärken",
    limits: "Grenzen",
    pricingLabel: "Preis:",
    headToHead: (n) => `Direktvergleich: Soluqube vs ${n}`,
    howToChoose: "So wählen Sie",
    chooseOutro: "Egal, wen Sie in die engere Wahl nehmen: Rechnen Sie eine Aufteilung selbst nach. Der SSP-Aufteilungsrechner und die Glossareinträge zur Relative-SSP-Methode und zu Vertragsänderungen zeigen, was zu prüfen ist.",
    calcLabel: "SSP-Aufteilungsrechner (auf Englisch)",
    relatedReading: "Weiterlesen:",
    ctaTitle: "Soluqube mit eigenen Verträgen testen?",
    ctaBody: "Design-Partner erhalten 60 Tage kostenlos mit echten Verträgen: Relative-SSP-Aufteilung, ein Plan, der auf den Cent aufgeht, und ein Arbeitspapier mit Hash. Ersetzt weder Fakturierung noch Ihr ERP.",
    ctaBtn: "Zum Design-Partner-Programm (auf Englisch)",
    sources: (d) => `Quellen (geprüft am ${d})`,
    alternativesTo: "Alternativen zu:",
    sourcesCount: "Quellen",
  },
  blog: {
    indexTitle: "Fachblog zu ASC 606 und Ind AS 115 | Soluqube",
    indexDesc: "Fachartikel zu SSP-Aufteilung, Vertragsänderungen, GST und Prüfungsnachweisen nach ASC 606, IFRS 15 und Ind AS 115.",
    h1: "Fachblog zur Umsatzrealisierung",
    intro: "Leitfäden für Controller, Prüfer und Finanzverantwortliche zu ASC 606, IFRS 15 und Ind AS 115.",
    published: "Veröffentlicht",
    toc: "In diesem Leitfaden",
    directAnswer: "Direkte Antwort",
    target: "Suchanfrage",
    tags: "Themen:",
    faq: "Häufige Fragen",
    prev: "Vorheriger Leitfaden",
    next: "Nächster Leitfaden",
    ctaTitle: "Mit eigenen Verträgen ausprobieren?",
    ctaBody: "Design-Partner erhalten 60 Tage kostenlos mit echten Verträgen.",
    ctaBtn: "Design-Partner (auf Englisch)",
    authorRole: "Fachinhalte Rechnungslegung",
    computedBy: "Berechnet von: Soluqube-Engine",
  },
  faqHeading: "Häufige Fragen",
};

export const STRINGS: Record<Locale, Strings> = { es, "pt-br": ptBr, de };
