"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Calendar, Award, CheckCircle2, BookOpen } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { GlassCard } from "./ui/GlassCard";

export function Education() {
  const { education } = portfolioData;

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
            <GraduationCap className="w-3.5 h-3.5 text-[#00E6A0]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#8BFFD5]">
              Academic Foundation
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F5FFF9]"
          >
            My Academic Journey
          </motion.h2>

          <p className="text-sm text-[#A7B5AD] max-w-xl mx-auto mt-3">
            Milestones of academic rigor, algorithmic foundations, and computational learning.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Glowing Vertical Timeline Center Line */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px -translate-x-1/2 bg-gradient-to-b from-[#00E6A0] via-[#087F5B] to-transparent shadow-[0_0_12px_rgba(0,230,160,0.4)]" />

          {/* Mobile Vertical Left Line */}
          <div className="md:hidden absolute left-5 top-4 bottom-4 w-px bg-gradient-to-b from-[#00E6A0] via-[#087F5B] to-transparent shadow-[0_0_12px_rgba(0,230,160,0.4)]" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {education.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? "md:flex-row-reverse" : ""
                  } gap-8`}
                >
                  {/* Timeline Node Badge on the Line */}
                  <div className="absolute left-5 md:left-1/2 -translate-x-1/2 top-6 z-20 flex items-center justify-center">
                    <div className="relative w-8 h-8 rounded-full bg-[#050706] border-2 border-[#00E6A0] shadow-[0_0_16px_rgba(0,230,160,0.6)] flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#00E6A0] animate-emerald-pulse" />
                    </div>
                  </div>

                  {/* Empty Spacer on opposite side for desktop layout */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Education Card Content */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0">
                    <div className={isEven ? "md:pr-10" : "md:pl-10"}>
                      <GlassCard className="p-6 md:p-7">
                        {/* Header: Degree & Duration */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#00E6A0]">
                            <Calendar className="w-3.5 h-3.5" />
                            {item.duration}
                          </span>

                          {/* Score Badge */}
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00E6A0]/10 border border-[#00E6A0]/30 text-xs font-mono font-bold text-[#8BFFD5] shadow-[0_0_12px_rgba(0,230,160,0.15)]">
                            <Award className="w-3.5 h-3.5 text-[#00E6A0]" />
                            <span>
                              {item.scoreLabel}: {item.score}
                            </span>
                          </div>
                        </div>

                        {/* Degree Title */}
                        <h3 className="text-lg md:text-xl font-bold text-[#F5FFF9] mb-1">
                          {item.degree}
                        </h3>

                        {/* Institution */}
                        <p className="text-xs md:text-sm font-medium text-[#A7B5AD] mb-4 flex items-center gap-2">
                          <BookOpen className="w-3.5 h-3.5 text-[#00E6A0] shrink-0" />
                          <span>{item.institution}</span>
                        </p>

                        {/* Highlights */}
                        <div className="space-y-1.5 pt-3 border-t border-[rgba(0,230,160,0.12)]">
                          {item.highlights.map((h, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-[#A7B5AD]">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#00E6A0] shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{h}</span>
                            </div>
                          ))}
                        </div>
                      </GlassCard>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

