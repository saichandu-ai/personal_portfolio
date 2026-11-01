"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, CheckCircle, AlertCircle, Sparkles, MessageSquare } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { GlassCard } from "./ui/GlassCard";
import { MagneticButton } from "./ui/MagneticButton";
import { SocialGroup } from "./ui/BrandIcons";

export function Contact() {
  const { contact, personal } = portfolioData;

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Please enter your name.";
    if (!form.email.trim()) {
      errs.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!form.message.trim()) {
      errs.message = "Please write a brief message.";
    } else if (form.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    // Seamless mailto / contact submission dispatch:
    // Allows immediate working functionality locally or connects to webhook
    try {
      // Create mailto fallback link with pre-filled content
      const subject = encodeURIComponent(
        form.subject ? `Portfolio Inquiry: ${form.subject}` : `Inquiry from ${form.name}`
      );
      const body = encodeURIComponent(
        `Sender Name: ${form.name}\nSender Email: ${form.email}\n\nMessage:\n${form.message}`
      );
      const mailtoUrl = `mailto:${personal.email}?subject=${subject}&body=${body}`;

      // Open email client
      window.location.href = mailtoUrl;

      setStatus("success");
      setStatusMessage(
        "Thank you! Your default email client was opened with your message. You can also connect directly on LinkedIn."
      );
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
      setStatusMessage("Failed to initiate message. Please reach out directly via email or LinkedIn.");
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
            <MessageSquare className="w-3.5 h-3.5 text-[#00E6A0]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#8BFFD5]">
              {contact.subheading}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F5FFF9]"
          >
            {contact.heading}
          </motion.h2>

          <p className="text-sm text-[#A7B5AD] max-w-xl mx-auto mt-3">
            {contact.note}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Info & Social Connections */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >
            <GlassCard className="p-8">
              <h3 className="text-xl font-bold text-[#F5FFF9] mb-4">
                Let&apos;s build something meaningful.
              </h3>
              <p className="text-sm text-[#A7B5AD] leading-relaxed mb-6 font-light">
                Whether discussing an AI project, sharing academic research opportunities, or collaborating on innovative software, I welcome your message.
              </p>

              {/* Direct Details */}
              <div className="space-y-4 pt-4 border-t border-[rgba(0,230,160,0.15)] text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg glass-surface border border-[rgba(0,230,160,0.2)] flex items-center justify-center text-[#00E6A0] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono text-[#A7B5AD] uppercase">
                      Email
                    </span>
                    <a
                      href={`mailto:${personal.email}`}
                      className="text-[#F5FFF9] hover:text-[#00E6A0] transition-colors font-medium"
                    >
                      {personal.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg glass-surface border border-[rgba(0,230,160,0.2)] flex items-center justify-center text-[#8BFFD5] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono text-[#A7B5AD] uppercase">
                      Location
                    </span>
                    <span className="text-[#F5FFF9]">{personal.location}</span>
                  </div>
                </div>
              </div>

              {/* Official Social Media Profiles */}
              <div className="pt-6 mt-6 border-t border-[rgba(0,230,160,0.15)]">
                <span className="block text-xs font-mono uppercase tracking-wider text-[#A7B5AD] mb-3">
                  Connect On Official Networks
                </span>
                <SocialGroup size="md" />
              </div>
            </GlassCard>

            {/* Note on form processing */}
            <div className="p-4 rounded-xl glass-surface-subtle border border-[rgba(0,230,160,0.1)] text-[11px] text-[#A7B5AD] leading-relaxed">
              <span className="text-[#00E6A0] font-mono font-semibold">Service Architecture:</span>{" "}
              Submitting opens your native mail client or dispatches securely. For API webhooks (e.g. Web3Forms or Formspree), see the deployment guide in this codebase.
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <GlassCard className="p-8 sm:p-10">
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-mono uppercase tracking-wider text-[#F5FFF9] mb-1.5"
                  >
                    Your Name <span className="text-[#00E6A0]">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-[#050706]/70 border border-[rgba(0,230,160,0.2)] focus:border-[#00E6A0] focus:ring-1 focus:ring-[#00E6A0] text-sm text-[#F5FFF9] placeholder-[#A7B5AD]/50 outline-none transition-all"
                  />
                  {errors.name && (
                    <p className="text-xs text-rose-400 mt-1 font-mono">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-mono uppercase tracking-wider text-[#F5FFF9] mb-1.5"
                  >
                    Your Email <span className="text-[#00E6A0]">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="e.g. john@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#050706]/70 border border-[rgba(0,230,160,0.2)] focus:border-[#00E6A0] focus:ring-1 focus:ring-[#00E6A0] text-sm text-[#F5FFF9] placeholder-[#A7B5AD]/50 outline-none transition-all"
                  />
                  {errors.email && (
                    <p className="text-xs text-rose-400 mt-1 font-mono">{errors.email}</p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-mono uppercase tracking-wider text-[#F5FFF9] mb-1.5"
                  >
                    Subject (Optional)
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="e.g. AI Project Collaboration / Inquiry"
                    className="w-full px-4 py-3 rounded-xl bg-[#050706]/70 border border-[rgba(0,230,160,0.2)] focus:border-[#00E6A0] focus:ring-1 focus:ring-[#00E6A0] text-sm text-[#F5FFF9] placeholder-[#A7B5AD]/50 outline-none transition-all"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-mono uppercase tracking-wider text-[#F5FFF9] mb-1.5"
                  >
                    Message <span className="text-[#00E6A0]">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Write your message here..."
                    className="w-full px-4 py-3 rounded-xl bg-[#050706]/70 border border-[rgba(0,230,160,0.2)] focus:border-[#00E6A0] focus:ring-1 focus:ring-[#00E6A0] text-sm text-[#F5FFF9] placeholder-[#A7B5AD]/50 outline-none transition-all resize-y"
                  />
                  {errors.message && (
                    <p className="text-xs text-rose-400 mt-1 font-mono">{errors.message}</p>
                  )}
                </div>

                {/* Submit button & status */}
                <div className="pt-2">
                  <MagneticButton
                    variant="primary"
                    size="md"
                    onClick={() => {}}
                    icon={<Send className="w-4 h-4" />}
                    iconPosition="right"
                    className="w-full sm:w-auto"
                  >
                    {status === "submitting" ? "Sending..." : "Transmit Message"}
                  </MagneticButton>
                </div>

                {/* Success / Error notification */}
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-[#087F5B]/20 border border-[#00E6A0]/40 flex items-start gap-3 text-xs text-[#8BFFD5]"
                  >
                    <CheckCircle className="w-4 h-4 text-[#00E6A0] shrink-0 mt-0.5" />
                    <p className="leading-relaxed">{statusMessage}</p>
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/30 flex items-start gap-3 text-xs text-rose-300"
                  >
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">{statusMessage}</p>
                  </motion.div>
                )}
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

