"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface SocialIconProps {
  href: string;
  label: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  showTooltip?: boolean;
}

export function LinkedInIcon({ className = "w-5 h-5 fill-current" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74v-8.37H5.06v8.37z" />
    </svg>
  );
}

export function GitHubIcon({ className = "w-5 h-5 fill-current" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export function SocialButton({
  href,
  label,
  size = "md",
  className = "",
  showTooltip = true,
}: SocialIconProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isLinkedIn = label.toLowerCase().includes("linkedin");

  const sizeClasses = {
    sm: "w-9 h-9 text-sm",
    md: "w-11 h-11 text-base",
    lg: "w-13 h-13 text-lg",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <div className="relative inline-block">
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{
          scale: 1.12,
          y: -2,
        }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: "spring", stiffness: 400, damping: 18 }}
        className={`group relative flex items-center justify-center rounded-full glass-surface border border-[rgba(0,230,160,0.22)] text-[#F5FFF9] hover:text-[#00E6A0] hover:border-[rgba(0,230,160,0.65)] hover:shadow-[0_0_24px_rgba(0,230,160,0.4)] transition-all duration-300 backdrop-blur-xl ${sizeClasses[size]} ${className}`}
      >
        {/* Subtle radial inner glow on hover */}
        <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-[rgba(0,230,160,0.15)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {isLinkedIn ? (
          <LinkedInIcon className={`${iconSizes[size]} transition-transform duration-300 group-hover:scale-110`} />
        ) : (
          <GitHubIcon className={`${iconSizes[size]} transition-transform duration-300 group-hover:scale-110`} />
        )}
      </motion.a>

      {/* Floating Tooltip */}
      {showTooltip && isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 6, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.92 }}
          transition={{ duration: 0.18 }}
          className="absolute left-1/2 -translate-x-1/2 -bottom-9 pointer-events-none z-50 whitespace-nowrap px-2.5 py-1 text-[11px] font-medium tracking-wide text-[#F5FFF9] bg-[#0B100D]/95 border border-[rgba(0,230,160,0.35)] rounded-md shadow-[0_4px_16px_rgba(0,0,0,0.6)] backdrop-blur-md"
        >
          {label}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-[#0B100D] border-t border-l border-[rgba(0,230,160,0.35)]" />
        </motion.div>
      )}
    </div>
  );
}

export function SocialGroup({
  size = "md",
  className = "",
  showTooltip = true,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
  showTooltip?: boolean;
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <SocialButton
        href="https://www.linkedin.com/in/saichandutadikamalla"
        label="LinkedIn"
        size={size}
        showTooltip={showTooltip}
      />
      <SocialButton
        href="https://github.com/saichandu-ai"
        label="GitHub"
        size={size}
        showTooltip={showTooltip}
      />
    </div>
  );
}

