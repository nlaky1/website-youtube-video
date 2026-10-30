import type { Metadata } from "next";
import LocalizedLanding from "@/components/i18n/localized-landing";
import SspCalculator from "@/app/tools/ssp-allocation-calculator/Calculator";
import { landingLangs, landingMetadata } from "@/lib/i18n-pages";

export const dynamicParams = false;
export function generateStaticParams() {
  return landingLangs("ssp-allocation-calculator").map((lang) => ({ lang }));
}

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  return landingMetadata(params.lang, "ssp-allocation-calculator");
}

/** The calculator widget itself stays in English (its labels and validation messages are not parameterized). */
export default function Page({ params }: { params: { lang: string } }) {
  return (
    <LocalizedLanding lang={params.lang} id="ssp-allocation-calculator">
      <SspCalculator />
    </LocalizedLanding>
  );
}
