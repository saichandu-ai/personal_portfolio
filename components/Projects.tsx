"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Sparkles,
  Layers,
  CheckCircle2,
  Terminal,
  Zap,
  Info,
} from "lucide-react";
import { portfolioData, Project } from "@/data/portfolio";
import { GlassCard } from "./ui/GlassCard";
import { MagneticButton } from "./ui/MagneticButton";
import { Modal } from "./ui/Modal";
import { GitHubIcon } from "./ui/BrandIcons";

export function Projects() {
  const { projects } = portfolioData;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [repoInfoOpen, setRepoInfoOpen] = useState(false);
  const [repoTargetTitle, setRepoTargetTitle] = useState("");

  const handleGithubClick = (p: Project) => {
    if (p.githubUrl) {
      window.open(p.githubUrl, "_blank");
    } else {
      setRepoTargetTitle(p.title);
      setRepoInfoOpen(true);
    }
  };

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
            <Layers className="w-3.5 h-3.5 text-[#00E6A0]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#8BFFD5]">
              Featured Work
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F5FFF9]"
          >
            Things I&apos;ve Built
          </motion.h2>

          <p className="text-sm text-[#A7B5AD] max-w-xl mx-auto mt-3">
            Explorations in creative WebGL experiences, algorithmic automation, and software utilities.
          </p>
        </div>

        {/* Featured Project Showcase: VEKTRA */}
        {projects.length > 0 && (
          <div className="mb-14">
            {(() => {
              const vektra = projects[0];
              return (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <GlassCard className="p-8 sm:p-10 border-[rgba(0,230,160,0.35)] shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      {/* Left: Info */}
                      <div className="lg:col-span-6 space-y-5">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E6A0]/10 border border-[#00E6A0]/30 text-xs font-mono text-[#00E6A0]">
                          <Zap className="w-3.5 h-3.5 text-[#00E6A0]" />
                          <span>FLAGSHIP PROJECT</span>
                        </div>

                        <div>
                          <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F5FFF9] uppercase">
                            {vektra.title}
                          </h3>
                          <p className="text-sm font-mono text-[#8BFFD5] mt-1">
                            {vektra.category}
                          </p>
                        </div>

                        <p className="text-sm sm:text-base text-[#A7B5AD] leading-relaxed">
                          {vektra.description}
                        </p>

                        {/* Features List */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                          {vektra.features.map((feat, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-[#F5FFF9]">
                              <CheckCircle2 className="w-4 h-4 text-[#00E6A0] shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>

                        {/* Technology Tags */}
                        <div className="flex flex-wrap gap-2 pt-2">
                          {vektra.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[#050706]/70 border border-[rgba(0,230,160,0.2)] text-[#8BFFD5]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-4 pt-4">
                          {vektra.liveUrl && (
                            <MagneticButton
                              variant="primary"
                              size="md"
                              href={vektra.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              icon={<ExternalLink className="w-4 h-4" />}
                              iconPosition="right"
                            >
                              Launch Live Site
                            </MagneticButton>
                          )}

                          <MagneticButton
                            variant="secondary"
                            size="md"
                            onClick={() => handleGithubClick(vektra)}
                            icon={<GitHubIcon className="w-4 h-4" />}
                            iconPosition="left"
                          >
                            Repository Info
                          </MagneticButton>
                        </div>
                      </div>

                      {/* Right: Bespoke Visual Preview */}
                      <div className="lg:col-span-6">
                        <div className="relative rounded-2xl overflow-hidden glass-surface border border-[rgba(0,230,160,0.3)] shadow-[0_0_30px_rgba(0,230,160,0.15)] group/preview p-6 bg-gradient-to-br from-[#0B100D] via-[#050706] to-[#111A15]">
                          {/* Decorative UI Header */}
                          <div className="flex items-center justify-between pb-4 border-b border-[rgba(0,230,160,0.15)] mb-6">
                            <div className="flex items-center gap-2">
                              <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                              <div className="w-2.5 h-2.5 rounded-full bg-[#00E6A0]" />
                            </div>
                            <span className="text-[11px] font-mono text-[#00E6A0] bg-[#00E6A0]/10 px-2 py-0.5 rounded border border-[#00E6A0]/20">
                              vektra-55wa.onrender.com
                            </span>
                          </div>

                          {/* Futuristic Motorbike Spec Visualization */}
                          <div className="py-8 px-4 text-center relative">
                            <div className="w-36 h-36 mx-auto rounded-full border-2 border-dashed border-[#00E6A0]/40 flex items-center justify-center relative mb-4">
                              <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-[#087F5B] to-[#00E6A0]/20 blur-md absolute" />
                              <span className="font-mono text-3xl font-extrabold text-[#F5FFF9] tracking-wider relative z-10">
                                VEKTRA
                              </span>
                            </div>

                            <div className="grid grid-cols-3 gap-2 mt-6 text-center">
                              <div className="p-2.5 rounded-xl bg-black/40 border border-[rgba(0,230,160,0.15)]">
                                <span className="block text-[10px] font-mono text-[#A7B5AD]">
                                  PLATFORM
                                </span>
                                <span className="text-xs font-bold text-[#8BFFD5]">WebGL / 3D</span>
                              </div>
                              <div className="p-2.5 rounded-xl bg-black/40 border border-[rgba(0,230,160,0.15)]">
                                <span className="block text-[10px] font-mono text-[#A7B5AD]">
                                  PERFORMANCE
                                </span>
                                <span className="text-xs font-bold text-[#00E6A0]">100% Fluid</span>
                              </div>
                              <div className="p-2.5 rounded-xl bg-black/40 border border-[rgba(0,230,160,0.15)]">
                                <span className="block text-[10px] font-mono text-[#A7B5AD]">
                                  DEV WORKFLOW
                                </span>
                                <span className="text-xs font-bold text-[#8BFFD5]">AI-Assisted</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })()}
          </div>
        )}

        {/* Secondary Projects Grid (Job Application Tracker, Personal Finance Manager) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.slice(1).map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
            >
              <GlassCard className="p-7 h-full flex flex-col justify-between">
                <div>
                  {/* Top Category and Status */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#00E6A0]">
                      <Terminal className="w-3.5 h-3.5" />
                      {project.category}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#A7B5AD] bg-black/40 px-2 py-0.5 rounded border border-[rgba(0,230,160,0.15)]">
                      Python CLI
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[#F5FFF9] mb-3">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#A7B5AD] leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-1.5 mb-5 pt-3 border-t border-[rgba(0,230,160,0.1)]">
                    {project.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-[#F5FFF9]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00E6A0] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#050706]/70 border border-[rgba(0,230,160,0.18)] text-[#8BFFD5]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-3 border-t border-[rgba(0,230,160,0.12)]">
                    <button
                      type="button"
                      onClick={() => handleGithubClick(project)}
                      className="inline-flex items-center gap-2 text-xs font-mono text-[#8BFFD5] hover:text-[#00E6A0] transition-colors cursor-pointer"
                    >
                      <GitHubIcon className="w-4 h-4" />
                      <span>Repository Details</span>
                    </button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Repository Info Modal */}
      <Modal
        isOpen={repoInfoOpen}
        onClose={() => setRepoInfoOpen(false)}
        title="Project Repository"
        subtitle={repoTargetTitle}
      >
        <div className="space-y-4 text-sm text-[#A7B5AD]">
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#111A15] border border-[rgba(0,230,160,0.2)] text-[#F5FFF9]">
            <Info className="w-5 h-5 text-[#00E6A0] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-xs text-[#00E6A0] uppercase font-mono">
                Verified Repository Status
              </p>
              <p className="text-xs text-[#A7B5AD] mt-1 leading-relaxed">
                In adherence to authentic portfolio standards, placeholder links are not disguised as fake live GitHub repositories. This codebase is staged locally and will be linked as soon as the public repository is published.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl glass-surface border border-[rgba(0,230,160,0.15)] text-xs space-y-2">
            <p className="font-mono text-[#8BFFD5]">
              How to configure repository URL:
            </p>
            <p className="leading-relaxed">
              Open <code className="text-[#00E6A0] font-mono bg-black/40 px-1 py-0.5 rounded">data/portfolio.ts</code> and update the <code className="text-[#00E6A0] font-mono bg-black/40 px-1 py-0.5 rounded">githubUrl</code> property for {repoTargetTitle}.
            </p>
          </div>

          <div className="pt-2 flex justify-end">
            <MagneticButton
              variant="primary"
              size="sm"
              onClick={() => setRepoInfoOpen(false)}
            >
              Understood
            </MagneticButton>
          </div>
        </div>
      </Modal>
    </div>
  );
}

