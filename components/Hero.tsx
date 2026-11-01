"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Compass, Briefcase, FileText, ChevronDown, Sparkles, Mail, AlertCircle } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { MagneticButton } from "./ui/MagneticButton";
import { SocialGroup } from "./ui/BrandIcons";
import { Modal } from "./ui/Modal";

export function Hero() {
  const { personal } = portfolioData;
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  const handleResumeClick = () => {
    if (personal.resume.isAvailable) {
      window.open(personal.resume.filePath, "_blank");
    } else {
      setResumeModalOpen(true);
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-28 pb-16 z-10"
    >
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Futuristic Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-surface border border-[rgba(0,230,160,0.3)] shadow-[0_0_20px_rgba(0,230,160,0.15)] mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#00E6A0] animate-emerald-pulse" />
          <span className="text-xs font-mono tracking-wider uppercase text-[#8BFFD5]">
            {personal.role}
          </span>
        </motion.div>

        {/* Main Name / Identity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-4"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.08] uppercase">
            <span className="block text-[#F5FFF9] font-sans">Tadikamalla</span>
            <span className="block text-gradient-emerald">Venkata Sai Chandu</span>
          </h1>
        </motion.div>

        {/* Main Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-lg sm:text-2xl font-light text-[#F5FFF9] max-w-2xl mx-auto tracking-wide mb-4"
        >
          &ldquo;{personal.headline}&rdquo;
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="text-sm sm:text-base text-[#A7B5AD] max-w-2xl mx-auto leading-relaxed mb-8 font-light"
        >
          {personal.description}
        </motion.p>

        {/* Official Social Media Brand Icons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="flex flex-col items-center gap-2 mb-10"
        >
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#A7B5AD]">
            Verified Profiles
          </span>
          <SocialGroup size="md" />
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-5"
        >
          {/* Button 1: Explore My Journey */}
          <MagneticButton
            variant="primary"
            size="md"
            onClick={() => scrollTo("journey")}
            icon={<Compass className="w-4 h-4" />}
            iconPosition="right"
          >
            Explore My Journey
          </MagneticButton>

          {/* Button 2: View My Projects */}
          <MagneticButton
            variant="secondary"
            size="md"
            onClick={() => scrollTo("projects")}
            icon={<Briefcase className="w-4 h-4" />}
            iconPosition="right"
          >
            View My Projects
          </MagneticButton>

          {/* Button 3: Download Resume */}
          <MagneticButton
            variant="ghost"
            size="md"
            onClick={handleResumeClick}
            icon={<FileText className="w-4 h-4 text-[#00E6A0]" />}
            iconPosition="left"
            className="border-[rgba(0,230,160,0.2)] bg-[#0B100D]/50"
          >
            Download Resume
          </MagneticButton>
        </motion.div>
      </div>

      {/* Animated Scroll Down Indicator */}
      <motion.button
        type="button"
        onClick={() => scrollTo("about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1, duration: 0.6 },
          y: { repeat: Infinity, duration: 2.2, ease: "easeInOut" },
        }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[#A7B5AD] hover:text-[#00E6A0] transition-colors cursor-pointer group focus:outline-none"
        aria-label="Scroll down to About section"
      >
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#A7B5AD] group-hover:text-[#00E6A0] transition-colors">
          Scroll Down
        </span>
        <div className="w-6 h-10 rounded-full border border-[rgba(0,230,160,0.3)] flex items-start justify-center p-1.5 glass-surface">
          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-[#00E6A0] shadow-[0_0_6px_#00E6A0]"
          />
        </div>
      </motion.button>

      {/* Resume Placeholder Modal */}
      <Modal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
        title="Resume Documentation"
        subtitle="Credentials & Verification"
      >
        <div className="space-y-4 text-sm text-[#A7B5AD]">
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#111A15] border border-[rgba(0,230,160,0.2)] text-[#F5FFF9]">
            <AlertCircle className="w-5 h-5 text-[#00E6A0] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-xs text-[#00E6A0] uppercase font-mono">
                Resume In Progress / Upon Request
              </p>
              <p className="text-xs text-[#A7B5AD] mt-1 leading-relaxed">
                The formal PDF resume file will be available directly once placed in{" "}
                <code className="text-[#8BFFD5] font-mono text-[11px] bg-black/40 px-1 py-0.5 rounded">
                  public/resume/{personal.resume.fileName}
                </code>
                . In the meantime, all verified academic details, skills, and projects are available across this portfolio.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl glass-surface border border-[rgba(0,230,160,0.15)] space-y-2">
            <h4 className="text-xs uppercase font-mono text-[#F5FFF9] font-bold tracking-wider">
              Candidate Overview
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[#A7B5AD]">Name:</span>
                <span className="block text-[#F5FFF9] font-medium">T. V. Sai Chandu</span>
              </div>
              <div>
                <span className="text-[#A7B5AD]">Program:</span>
                <span className="block text-[#00E6A0] font-medium">B.Tech AI & ML (2024-2028)</span>
              </div>
              <div>
                <span className="text-[#A7B5AD]">Current CGPA:</span>
                <span className="block text-[#8BFFD5] font-semibold font-mono">8.7 / 10</span>
              </div>
              <div>
                <span className="text-[#A7B5AD]">Primary Focus:</span>
                <span className="block text-[#F5FFF9]">AI, Python, Algorithms</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <MagneticButton
              variant="primary"
              size="sm"
              href={`mailto:${personal.email}?subject=Resume Request - Tadikamalla Venkata Sai Chandu`}
              icon={<Mail className="w-3.5 h-3.5" />}
              iconPosition="right"
              className="w-full sm:w-auto"
            >
              Request via Email
            </MagneticButton>
            <MagneticButton
              variant="secondary"
              size="sm"
              onClick={() => {
                setResumeModalOpen(false);
                scrollTo("contact");
              }}
              className="w-full sm:w-auto"
            >
              Go to Contact Form
            </MagneticButton>
          </div>
        </div>
      </Modal>
    </section>
  );
}

