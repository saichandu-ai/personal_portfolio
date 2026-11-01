"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Award, ShieldCheck, CheckCircle2, ExternalLink, Sparkles, FileCheck } from "lucide-react";
import { portfolioData, CertificationItem } from "@/data/portfolio";
import { GlassCard } from "./ui/GlassCard";
import { Modal } from "./ui/Modal";
import { MagneticButton } from "./ui/MagneticButton";

export function Certifications() {
  const { certifications } = portfolioData;
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);

  const handleCertClick = (cert: CertificationItem) => {
    if (cert.credentialUrl) {
      window.open(cert.credentialUrl, "_blank");
    } else {
      setSelectedCert(cert);
    }
  };

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
            <Award className="w-3.5 h-3.5 text-[#00E6A0]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#8BFFD5]">
              Validated Competencies
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F5FFF9]"
          >
            Certifications &amp; Learning
          </motion.h2>

          <p className="text-sm text-[#A7B5AD] max-w-xl mx-auto mt-3">
            External credentials validating cloud artificial intelligence foundations and core computational problem solving.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certifications.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
            >
              <GlassCard className="p-8 h-full flex flex-col justify-between group">
                <div>
                  {/* Top Bar: Issuer & Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E6A0]/10 border border-[#00E6A0]/25 text-xs font-mono text-[#00E6A0]">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{cert.issuer}</span>
                    </div>

                    <div className="w-10 h-10 rounded-xl glass-surface border border-[rgba(0,230,160,0.25)] flex items-center justify-center text-[#8BFFD5] group-hover:scale-110 group-hover:border-[rgba(0,230,160,0.6)] group-hover:shadow-[0_0_15px_rgba(0,230,160,0.3)] transition-all">
                      {cert.badgeType === "azure" ? (
                        <Sparkles className="w-5 h-5 text-[#00E6A0]" />
                      ) : (
                        <FileCheck className="w-5 h-5 text-[#8BFFD5]" />
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[#F5FFF9] group-hover:text-[#00E6A0] transition-colors mb-3">
                    {cert.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#A7B5AD] leading-relaxed mb-6 font-light">
                    {cert.description}
                  </p>
                </div>

                {/* Footer with verification button */}
                <div className="pt-4 border-t border-[rgba(0,230,160,0.12)] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handleCertClick(cert)}
                    className="inline-flex items-center gap-2 text-xs font-mono text-[#8BFFD5] hover:text-[#00E6A0] transition-colors cursor-pointer group/link"
                  >
                    <span>View Credential Details</span>
                    <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" />
                  </button>

                  <span className="text-[10px] font-mono text-[#00E6A0] bg-[#00E6A0]/10 px-2 py-0.5 rounded border border-[#00E6A0]/20">
                    VERIFIED
                  </span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Credential Modal */}
      {selectedCert && (
        <Modal
          isOpen={!!selectedCert}
          onClose={() => setSelectedCert(null)}
          title={selectedCert.title}
          subtitle={`ISSUER: ${selectedCert.issuer}`}
        >
          <div className="space-y-4 text-sm text-[#A7B5AD]">
            <div className="p-4 rounded-xl glass-surface border border-[rgba(0,230,160,0.2)] space-y-2">
              <h4 className="text-xs uppercase font-mono text-[#00E6A0] font-bold tracking-wider">
                Certification Curriculum &amp; Verification
              </h4>
              <p className="text-xs text-[#F5FFF9] leading-relaxed">
                {selectedCert.description}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#050706] border border-[rgba(0,230,160,0.15)] text-xs font-mono space-y-1">
              <div className="flex justify-between">
                <span className="text-[#A7B5AD]">Recipient:</span>
                <span className="text-[#F5FFF9] font-medium">{portfolioData.personal.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A7B5AD]">Credential Link:</span>
                <span className="text-[#8BFFD5]">Configurable in data/portfolio.ts</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <MagneticButton
                variant="primary"
                size="sm"
                onClick={() => setSelectedCert(null)}
              >
                Close
              </MagneticButton>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

