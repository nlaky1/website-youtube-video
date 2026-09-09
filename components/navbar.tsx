"use client";
import React, { useState } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Layers, 
  AlignJustify, 
  X, 
  ExternalLink, 
  ArrowRight,
  Sparkles,
  Calendar
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
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand & Patent App */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 border border-blue-400/30">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-base font-black tracking-tight text-white flex items-center gap-2">
                <span>SOLUQUBE</span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800/60 hidden sm:inline-block">
                  APP NO. 202621096305
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium leading-none hidden sm:block">
                Deterministic RevRec Engine
              </p>
            </div>
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold text-slate-300">
          <a href="#proof-metrics" className="hover:text-blue-400 transition-colors">
            Proof Telemetry
          </a>
          <a href="#problems" className="hover:text-blue-400 transition-colors">
            Problem vs Solution
          </a>
          <a href="#architecture" className="hover:text-blue-400 transition-colors">
            5-Gate Architecture
          </a>
          <a href="#canvas-preview" className="hover:text-blue-400 transition-colors">
            Interactive Canvas
          </a>
          <a href="#faq" className="hover:text-blue-400 transition-colors">
            Audit Defense FAQ
          </a>
        </nav>

        {/* Action CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://smart-contracts-henna.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-400 hover:text-blue-300 bg-blue-950/60 hover:bg-blue-900/60 border border-blue-800/60 transition-all"
          >
            <span>Live Sandbox Canvas</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <Link
            href="/book-demo"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/30 transition-all"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Demo</span>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <AlignJustify className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950/95 px-6 py-6 space-y-4 text-sm font-semibold">
          <a
            href="#proof-metrics"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-white"
          >
            Proof Telemetry
          </a>
          <a
            href="#problems"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-white"
          >
            Problem vs Solution
          </a>
          <a
            href="#architecture"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-white"
          >
            5-Gate Architecture
          </a>
          <a
            href="#canvas-preview"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-white"
          >
            Interactive Canvas
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-white"
          >
            Audit Defense FAQ
          </a>
          
          <div className="pt-4 border-t border-slate-800 space-y-2.5">
            <a
              href="https://smart-contracts-henna.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold text-blue-400 bg-blue-950/60 border border-blue-800"
            >
              <span>Live Sandbox Canvas (Engine)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <Link
              href="/book-demo"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-bold text-white bg-blue-600"
            >
              <span>Book Historical Drift Audit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
