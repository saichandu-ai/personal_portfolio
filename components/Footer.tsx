"use client";

import React from "react";
import { ArrowUp, Heart, Sparkles } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { SocialGroup } from "./ui/BrandIcons";

export function Footer() {
  const { personal } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = 2026;

  return (
    <footer className="relative py-12 px-4 sm:px-6 border-t border-[rgba(0,230,160,0.14)] bg-[#050706]/80 backdrop-blur-xl z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand Name & Role */}
        <div className="text-center md:text-left">
          <h4 className="text-sm font-bold font-mono tracking-wider uppercase text-[#F5FFF9]">
            {personal.name}
          </h4>
          <p className="text-xs text-[#A7B5AD] mt-1 font-mono">
            {personal.role}
          </p>
        </div>

        {/* Official Brand Social Icons */}
        <div className="flex items-center gap-3">
          <SocialGroup size="md" />
        </div>

        {/* Copyright & Back to Top */}
        <div className="flex items-center gap-4 text-xs font-mono text-[#A7B5AD]">
          <span>
            © {currentYear} • All rights reserved.
          </span>

          {/* Back to top button */}
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="w-10 h-10 rounded-full glass-surface border border-[rgba(0,230,160,0.2)] hover:border-[#00E6A0] hover:text-[#00E6A0] hover:shadow-[0_0_15px_rgba(0,230,160,0.3)] transition-all flex items-center justify-center text-[#F5FFF9] cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}

