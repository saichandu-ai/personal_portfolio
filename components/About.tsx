"use client";

import React from "react";
import { motion } from "framer-motion";
import { BrainCircuit, Cpu, Sparkles, Target, Compass, Terminal, Bot } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { GlassCard } from "./ui/GlassCard";

const interestIcons: Record<string, React.ReactNode> = {
  "Artificial Intelligence": <BrainCircuit className="w-4 h-4 text-[#00E6A0]" />,
  "Machine Learning": <Cpu className="w-4 h-4 text-[#8BFFD5]" />,
  "Generative AI": <Sparkles className="w-4 h-4 text-[#00E6A0]" />,
  "AI Agents": <Bot className="w-4 h-4 text-[#8BFFD5]" />,
  "Software Development": <Terminal className="w-4 h-4 text-[#00E6A0]" />,
  "Emerging Technologies": <Compass className="w-4 h-4 text-[#8BFFD5]" />,
};

export function About() {
  const { about, personal } = portfolioData;

  return (
    <div className="relative py-20 px-4 sm:px-6 z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-surface border border-[rgba(0,230,160,0.25)] mb-3"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#00E6A0]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#8BFFD5]">
              {about.subheading}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F5FFF9]"
          >
            {about.heading}
          </motion.h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Glass Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <GlassCard className="p-8">
              {/* Profile Monogram / Visual Badge */}
              <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#00E6A0]/20 to-[#087F5B]/30 blur-md" />
                <div className="relative w-full h-full rounded-2xl glass-surface border border-[rgba(0,230,160,0.4)] flex flex-col items-center justify-center shadow-[0_0_20px_rgba(0,230,160,0.2)]">
                  <span className="font-mono text-2xl font-bold text-gradient-emerald">SC</span>
                  <span className="text-[9px] font-mono tracking-widest text-[#A7B5AD] uppercase mt-0.5">
                    AIML 2028
                  </span>
                </div>
              </div>

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-[#F5FFF9]">{personal.name}</h3>
                <p className="text-xs font-mono text-[#00E6A0] mt-1 tracking-wide">
                  {personal.role}
                </p>
                <p className="text-xs text-[#A7B5AD] mt-1">{personal.location}</p>
              </div>

              {/* Status Pills */}
              <div className="space-y-2.5 pt-4 border-t border-[rgba(0,230,160,0.15)] text-xs font-mono">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#050706]/60 border border-[rgba(0,230,160,0.1)]">
                  <span className="text-[#A7B5AD]">Institution</span>
                  <span className="text-[#F5FFF9] font-medium text-right truncate max-w-[200px]">
                    Tirumala Engineering College
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#050706]/60 border border-[rgba(0,230,160,0.1)]">
                  <span className="text-[#A7B5AD]">Academic Standing</span>
                  <span className="text-[#8BFFD5] font-semibold">8.7 CGPA</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#050706]/60 border border-[rgba(0,230,160,0.1)]">
                  <span className="text-[#A7B5AD]">Specialization</span>
                  <span className="text-[#00E6A0] font-medium">Artificial Intelligence & ML</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Right Column: Bio, Philosophy & Interests */}
          <div className="lg:col-span-7 space-y-6">
            {/* Bio Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <GlassCard className="p-7">
                <h3 className="text-base font-mono uppercase tracking-wider text-[#00E6A0] mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E6A0]" />
                  Introduction
                </h3>
                <p className="text-base sm:text-lg text-[#F5FFF9] leading-relaxed font-light mb-4">
                  &ldquo;{about.intro}&rdquo;
                </p>
                <p className="text-sm text-[#A7B5AD] leading-relaxed font-light">
                  {about.philosophy}
                </p>
              </GlassCard>
            </motion.div>

            {/* Core Pillars / Goals */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {about.pillars.map((pillar, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  <GlassCard className="p-5 h-full flex flex-col justify-between">
                    <div>
                      <div className="w-9 h-9 rounded-xl glass-surface border border-[rgba(0,230,160,0.25)] flex items-center justify-center mb-3 text-[#00E6A0]">
                        {idx === 0 && <BrainCircuit className="w-4 h-4" />}
                        {idx === 1 && <Cpu className="w-4 h-4" />}
                        {idx === 2 && <Sparkles className="w-4 h-4" />}
                      </div>
                      <h4 className="text-sm font-semibold text-[#F5FFF9] mb-1.5">{pillar.title}</h4>
                      <p className="text-xs text-[#A7B5AD] leading-relaxed">{pillar.description}</p>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>

            {/* Personal Interests Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <GlassCard className="p-6">
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#8BFFD5] mb-4 flex items-center gap-2">
                  <Target className="w-3.5 h-3.5 text-[#00E6A0]" />
                  Core Areas of Fascination & Inquiry
                </h3>

                <div className="flex flex-wrap gap-2.5">
                  {about.interests.map((interest, idx) => (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl glass-surface border border-[rgba(0,230,160,0.18)] hover:border-[rgba(0,230,160,0.5)] hover:shadow-[0_0_15px_rgba(0,230,160,0.2)] transition-all duration-200"
                    >
                      {interestIcons[interest] || <Sparkles className="w-4 h-4 text-[#00E6A0]" />}
                      <span className="text-xs font-medium text-[#F5FFF9]">{interest}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

