import type { Metadata } from "next";
import LocalizedLanding from "@/components/i18n/localized-landing";
import { landingLangs, landingMetadata } from "@/lib/i18n-pages";

export const dynamicParams = false;
export function generateStaticParams() {
  return landingLangs("asc-606-vs-ind-as-115").map((lang) => ({ lang }));
}

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  return landingMetadata(params.lang, "asc-606-vs-ind-as-115");
}

export default function Page({ params }: { params: { lang: string } }) {
  return <LocalizedLanding lang={params.lang} id="asc-606-vs-ind-as-115" />;
}
