"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { SocialButton } from "./ui/BrandIcons";
import { portfolioData } from "@/data/portfolio";
import { useScene, SectionId } from "./3d/SceneContext";

interface NavItem {
  id: SectionId;
  label: string;
}

const navItems: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const { activeSection, navigateToSection } = useScene();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: SectionId) => {
    setMobileMenuOpen(false);
    navigateToSection(id);
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-40 flex justify-center px-4 pt-4 sm:pt-6 pointer-events-none transition-all duration-300">
        <motion.nav
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto flex items-center justify-between gap-4 px-4 sm:px-6 py-2.5 rounded-full border transition-all duration-300 max-w-5xl w-full ${
            isScrolled
              ? "glass-pill bg-[#0B100D]/85 border-[rgba(0,230,160,0.28)] shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_15px_rgba(0,230,160,0.1)] backdrop-blur-2xl"
              : "bg-[#0B100D]/55 border-[rgba(0,230,160,0.16)] backdrop-blur-md"
          }`}
        >
          {/* Brand Logo / Monogram */}
          <button
            type="button"
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-2 group text-left cursor-pointer focus:outline-none"
            aria-label="Navigate to Home section"
          >
            <div className="w-8 h-8 rounded-full glass-surface border border-[rgba(0,230,160,0.3)] flex items-center justify-center group-hover:border-[rgba(0,230,160,0.7)] group-hover:shadow-[0_0_12px_rgba(0,230,160,0.4)] transition-all duration-300">
              <span className="font-mono text-xs font-bold text-[#00E6A0]">SC</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-xs font-semibold tracking-wider text-[#F5FFF9] uppercase group-hover:text-[#00E6A0] transition-colors">
                Sai Chandu
              </span>
              <span className="block text-[10px] text-[#A7B5AD] font-mono leading-none">
                AI & ML
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 relative p-1 rounded-full bg-[rgba(255,255,255,0.03)] border border-[rgba(0,230,160,0.1)]">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3.5 py-1.5 text-xs font-medium tracking-wide transition-colors duration-200 z-10 rounded-full cursor-pointer focus:outline-none ${
                    isActive
                      ? "text-[#050706] font-semibold"
                      : "text-[#A7B5AD] hover:text-[#F5FFF9]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-gradient-to-r from-[#00E6A0] to-[#8BFFD5] rounded-full shadow-[0_0_16px_rgba(0,230,160,0.5)] z-[-1]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Official Brand Social Icons */}
          <div className="flex items-center gap-2">
            <SocialButton
              href={portfolioData.personal.social.linkedin}
              label="LinkedIn"
              size="sm"
              placement="bottom"
            />
            <SocialButton
              href={portfolioData.personal.social.github}
              label="GitHub"
              size="sm"
              placement="bottom"
            />

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-9 h-9 rounded-full flex items-center justify-center glass-surface border border-[rgba(0,230,160,0.22)] text-[#F5FFF9] hover:text-[#00E6A0] hover:border-[rgba(0,230,160,0.6)] transition-all ml-1"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 top-20 z-40 md:hidden glass-pill bg-[#0B100D]/95 border border-[rgba(0,230,160,0.3)] shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_20px_rgba(0,230,160,0.15)] rounded-2xl p-6 flex flex-col gap-3 backdrop-blur-2xl"
          >
            <div className="flex flex-col gap-1.5">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium tracking-wide transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-[#00E6A0]/20 to-transparent text-[#00E6A0] border-l-2 border-[#00E6A0]"
                        : "text-[#A7B5AD] hover:text-[#F5FFF9] hover:bg-[rgba(255,255,255,0.03)]"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <Sparkles className="w-3.5 h-3.5 text-[#00E6A0]" />}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 mt-2 border-t border-[rgba(0,230,160,0.15)] flex items-center justify-between">
              <span className="text-xs font-mono text-[#A7B5AD]">Connect with Sai:</span>
              <div className="flex items-center gap-2">
                <SocialButton
                  href={portfolioData.personal.social.linkedin}
                  label="LinkedIn"
                  size="sm"
                  placement="bottom"
                />
                <SocialButton
                  href={portfolioData.personal.social.github}
                  label="GitHub"
                  size="sm"
                  placement="bottom"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

