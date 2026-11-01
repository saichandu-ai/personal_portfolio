"use client";

import React from "react";
import { motion } from "framer-motion";
import { Compass, Sparkles, Check, ArrowRight, BrainCircuit } from "lucide-react";
import { portfolioData, JourneyMilestone } from "@/data/portfolio";
import { GlassCard } from "./ui/GlassCard";

const statusColorMap: Record<JourneyMilestone["status"], { bg: string; text: string; border: string }> = {
  "Completed Foundation": {
    bg: "bg-[#00E6A0]/10",
    text: "text-[#00E6A0]",
    border: "border-[#00E6A0]/30",
  },
  "Active Exploration": {
    bg: "bg-[#8BFFD5]/10",
    text: "text-[#8BFFD5]",
    border: "border-[#8BFFD5]/30",
  },
  "Expanding Frontier": {
    bg: "bg-[rgba(255,255,255,0.08)]",
    text: "text-[#F5FFF9]",
    border: "border-[rgba(255,255,255,0.2)]",
  },
};

export function Journey() {
  const { journey } = portfolioData;

  return (
    <div className="relative py-20 px-4 sm:px-6 z-10">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-surface border border-[rgba(0,230,160,0.25)] mb-3"
          >
            <Compass className="w-3.5 h-3.5 text-[#00E6A0]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#8BFFD5]">
              Continuous Growth
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F5FFF9]"
          >
            Always Learning. Always Building.
          </motion.h2>

          <p className="text-sm text-[#A7B5AD] max-w-xl mx-auto mt-3">
            An iterative roadmap from low-level systems logic to autonomous agentic architectures.
          </p>
        </div>

        {/* Learning Journey Stepper */}
        <div className="space-y-6">
          {journey.map((item, index) => {
            const statusStyle = statusColorMap[item.status];

            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassCard className="p-6 sm:p-7">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    {/* Step & Title info */}
                    <div className="flex items-start gap-4">
                      {/* Step Number Monogram */}
                      <div className="w-12 h-12 rounded-2xl glass-surface border border-[rgba(0,230,160,0.3)] flex items-center justify-center shrink-0">
                        <span className="font-mono text-base font-bold text-gradient-emerald">
                          {item.step}
                        </span>
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="text-lg sm:text-xl font-bold text-[#F5FFF9]">
                            {item.title}
                          </h3>
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                            {item.status}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#A7B5AD] leading-relaxed max-w-2xl font-light">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Focus Areas Pills */}
                    <div className="flex flex-wrap md:flex-nowrap items-center gap-1.5 self-stretch md:self-auto pt-2 md:pt-0 border-t md:border-t-0 border-[rgba(0,230,160,0.1)]">
                      {item.focusAreas.map((area, aIdx) => (
                        <span
                          key={aIdx}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-[#050706]/70 border border-[rgba(0,230,160,0.18)] text-[#8BFFD5] whitespace-nowrap"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

