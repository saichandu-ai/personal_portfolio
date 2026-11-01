"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Terminal,
  FileCode2,
  Binary,
  Database,
  Sparkles,
  Network,
  GitBranch,
  Wrench,
  Check,
} from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { GlassCard } from "./ui/GlassCard";

const skillIconMap: Record<string, React.ReactNode> = {
  C: <Terminal className="w-6 h-6 text-[#00E6A0]" />,
  Java: <FileCode2 className="w-6 h-6 text-[#8BFFD5]" />,
  Python: <Binary className="w-6 h-6 text-[#00E6A0]" />,
  SQL: <Database className="w-6 h-6 text-[#8BFFD5]" />,
  "Artificial Intelligence": <Sparkles className="w-6 h-6 text-[#00E6A0]" />,
  "Machine Learning": <Network className="w-6 h-6 text-[#8BFFD5]" />,
  GitHub: <GitBranch className="w-6 h-6 text-[#00E6A0]" />,
};

export function Skills() {
  const { skills } = portfolioData;

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
            <Wrench className="w-3.5 h-3.5 text-[#00E6A0]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#8BFFD5]">
              Core Competencies
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F5FFF9]"
          >
            My Technical Arsenal
          </motion.h2>

          <p className="text-sm text-[#A7B5AD] max-w-xl mx-auto mt-3">
            Core programming languages, algorithmic paradigms, and artificial intelligence fundamentals.
          </p>
        </div>

        {/* Skill Categories */}
        <div className="space-y-16">
          {skills.map((category, catIdx) => (
            <div key={catIdx}>
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00E6A0] shadow-[0_0_8px_#00E6A0]" />
                <h3 className="text-xl sm:text-2xl font-bold text-[#F5FFF9]">
                  {category.title}
                </h3>
                <span className="hidden sm:inline-block text-xs font-mono text-[#A7B5AD] pl-2 border-l border-[rgba(0,230,160,0.2)]">
                  {category.description}
                </span>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {category.items.map((skill, itemIdx) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: itemIdx * 0.08 }}
                  >
                    <GlassCard className="p-6 h-full flex flex-col justify-between group">
                      <div>
                        {/* Top: Icon & Indicator */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 rounded-2xl glass-surface border border-[rgba(0,230,160,0.28)] flex items-center justify-center group-hover:scale-110 group-hover:border-[rgba(0,230,160,0.6)] group-hover:shadow-[0_0_20px_rgba(0,230,160,0.3)] transition-all duration-300">
                            {skillIconMap[skill.name] || <Terminal className="w-6 h-6 text-[#00E6A0]" />}
                          </div>

                          <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[rgba(0,230,160,0.1)] text-[#00E6A0] opacity-70 group-hover:opacity-100 transition-opacity">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        </div>

                        {/* Title */}
                        <h4 className="text-lg font-bold text-[#F5FFF9] group-hover:text-[#00E6A0] transition-colors mb-2">
                          {skill.name}
                        </h4>

                        {/* Description */}
                        <p className="text-xs text-[#A7B5AD] leading-relaxed">
                          {skill.description}
                        </p>
                      </div>

                      {/* Bottom glowing accent bar */}
                      <div className="mt-5 pt-3 border-t border-[rgba(0,230,160,0.1)] flex items-center justify-between text-[10px] font-mono text-[#A7B5AD]">
                        <span>ACTIVE TOOL</span>
                        <span className="text-[#00E6A0] group-hover:translate-x-1 transition-transform">
                          →
                        </span>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

