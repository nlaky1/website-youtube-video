/** Optional extra content blocks for glossary and alternatives pages (English pages only). */

export interface ContentLink {
  href: string;
  label: string;
}

export interface ContentTable {
  headers: string[];
  rows: string[][];
}

export interface ContentSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  table?: ContentTable;
  /** Small print under the block, e.g. "Illustrative figures, not from a real contract." */
  note?: string;
  /** Internal or external links shown at the end of the block. */
  links?: ContentLink[];
  /** Public sources for facts stated in the block. */
  sources?: ContentLink[];
}
