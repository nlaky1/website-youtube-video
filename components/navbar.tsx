"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Layers, 
  Menu, 
  X, 
  ExternalLink, 
  ArrowRight,
  Sparkles,
  Calendar,
  CheckCircle2
} from "lucide-react";

interface NavbarProps {
  scrollToSection?: (id: string) => void;
  scrollToWebsiteDesign?: () => void;
  scrollToGraphicDesign?: () => void;
  scrollToShopifyStores?: () => void;
  scrollToServices?: () => void;
  [key: string]: any;
}

const Navbar: React.FC<NavbarProps> = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Brand & Patent Badge */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white shadow-sm border border-slate-800 group-hover:bg-slate-800 transition-colors">
              <Layers className="w-4 h-4 text-white" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight text-slate-900">SOLUQUBE</span>
              <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 hidden sm:inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Patent App: 202621096305
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Institutional Nav Links */}
        <nav className="hidden lg:flex items-center gap-8 text-[13px] font-medium text-slate-600">
          <a href="#architecture" className="hover:text-slate-950 transition-colors">
            Engine Architecture
          </a>
          <a href="#proof-telemetry" className="hover:text-slate-950 transition-colors">
            Audit Proof
          </a>
          <a href="#standards" className="hover:text-slate-950 transition-colors">
            ASC 606 &amp; Ind AS 115
          </a>
          <a href="#pilot" className="hover:text-slate-950 transition-colors">
            Pricing / Pilot
          </a>
        </nav>

        {/* Right: Dual Action CTAs */}
        <div className="hidden lg:flex items-center gap-2.5">
          <a
            href="https://client.soluqube.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-slate-600 hover:text-slate-950 px-2.5 py-1.5 transition-colors"
          >
            Client Portal
          </a>

          <a
            href="https://app.soluqube.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-700 hover:text-slate-950 bg-white hover:bg-slate-50 border border-slate-300 shadow-sm transition-all"
          >
            <span>Live Sandbox</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>

          <a
            href="#audit-intake"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 shadow-sm hover:shadow transition-all"
          >
            <span>Book Historical Drift Audit</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
            className="p-2 rounded-lg text-slate-600 hover:text-slate-950 hover:bg-slate-100 border border-slate-200 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md px-6 py-6 space-y-4 text-sm font-medium">
          <div className="sm:hidden pb-2 border-b border-slate-100">
            <span className="text-[11px] font-mono font-medium px-2 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200 inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Patent App: 202621096305
            </span>
          </div>
          <a
            href="#architecture"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-700 hover:text-slate-950 py-1"
          >
            Engine Architecture
          </a>
          <a
            href="#proof-telemetry"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-700 hover:text-slate-950 py-1"
          >
            Audit Proof
          </a>
          <a
            href="#standards"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-700 hover:text-slate-950 py-1"
          >
            ASC 606 &amp; Ind AS 115
          </a>
          <a
            href="#pilot"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-700 hover:text-slate-950 py-1"
          >
            Pricing / Pilot
          </a>
          
          <div className="pt-4 border-t border-slate-200 space-y-2.5">
            <a
              href="https://client.soluqube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors active:scale-[0.98]"
            >
              <span>Client Advisory Portal</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>

            <a
              href="https://app.soluqube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold text-blue-700 bg-blue-50/80 hover:bg-blue-100 border border-blue-200 transition-colors active:scale-[0.98]"
            >
              <span>Launch Live Sandbox</span>
              <ExternalLink className="w-3.5 h-3.5 text-blue-500" />
            </a>

            <a
              href="#audit-intake"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-sm transition-colors active:scale-[0.98]"
            >
              <span>Book Historical Drift Audit</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
