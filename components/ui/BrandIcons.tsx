"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, CheckCircle2 } from "lucide-react";

interface SocialIconProps {
  href?: string;
  label: "LinkedIn" | "GitHub" | string;
  size?: "sm" | "md" | "lg";
  className?: string;
  showTooltip?: boolean;
  placement?: "top" | "bottom" | "auto";
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

// Data specifications for social media popups
const SOCIAL_PROFILES = {
  linkedin: {
    platform: "LinkedIn",
    profileName: "TADIKAMALLA VENKATA SAI CHANDU",
    tagline: "B.Tech Artificial Intelligence & Machine Learning Student",
    url: "https://www.linkedin.com/in/saichandutadikamalla",
    buttonText: "Visit LinkedIn Profile",
    description:
      "Connect for professional collaborations, AI/ML research, and software engineering opportunities.",
    stats: "Tirumala Engineering College • 2024–2028",
  },
  github: {
    platform: "GitHub",
    profileName: "saichandu-ai",
    tagline: "Developer & Open Source Contributor",
    url: "https://github.com/saichandu-ai",
    buttonText: "Visit GitHub Profile",
    description:
      "Explore open-source repositories, algorithms, AI/ML models, and interactive WebGL project codebases.",
    stats: "AI/ML • Python • WebGL • TypeScript",
  },
};

export function SocialButton({
  href,
  label,
  size = "md",
  className = "",
  showTooltip = true,
  placement = "auto",
}: SocialIconProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [computedPlacement, setComputedPlacement] = useState<"top" | "bottom">("bottom");
  const [horizontalAlign, setHorizontalAlign] = useState<"center" | "right" | "left">("center");

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const isLinkedIn = label.toLowerCase().includes("linkedin");
  const profileData = isLinkedIn ? SOCIAL_PROFILES.linkedin : SOCIAL_PROFILES.github;
  const targetUrl = href || profileData.url;

  // Determine smart placement based on screen position
  const calculatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();

    if (placement === "top") {
      setComputedPlacement("top");
    } else if (placement === "bottom") {
      setComputedPlacement("bottom");
    } else {
      // Auto: if near bottom half of viewport, open top; otherwise open bottom
      if (rect.bottom > window.innerHeight - 280) {
        setComputedPlacement("top");
      } else {
        setComputedPlacement("bottom");
      }
    }

    // Horizontal alignment check (prevent right/left edge clipping)
    if (rect.right > window.innerWidth - 160) {
      setHorizontalAlign("right");
    } else if (rect.left < 160) {
      setHorizontalAlign("left");
    } else {
      setHorizontalAlign("center");
    }
  }, [placement]);

  const togglePopup = () => {
    calculatePosition();
    setIsPopupOpen((prev) => !prev);
  };

  const closePopup = useCallback(() => {
    setIsPopupOpen(false);
  }, []);

  // Handle outside click & Escape key
  useEffect(() => {
    if (!isPopupOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        closePopup();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closePopup();
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPopupOpen, closePopup]);

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

  // Compute popup alignment classes
  const getHorizontalClasses = () => {
    if (horizontalAlign === "right") return "right-0 translate-x-0";
    if (horizontalAlign === "left") return "left-0 translate-x-0";
    return "left-1/2 -translate-x-1/2";
  };

  return (
    <div ref={containerRef} className="relative inline-block">
      {/* Interactive Trigger Button */}
      <motion.button
        ref={triggerRef}
        type="button"
        onClick={togglePopup}
        onMouseEnter={() => {
          setIsHovered(true);
          calculatePosition();
        }}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={`${label} profile options and popup card`}
        aria-expanded={isPopupOpen}
        aria-haspopup="dialog"
        whileHover={{
          scale: 1.12,
          y: -2,
        }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: "spring", stiffness: 400, damping: 18 }}
        className={`group relative flex items-center justify-center rounded-full glass-surface border border-[rgba(0,230,160,0.22)] text-[#F5FFF9] hover:text-[#00E6A0] hover:border-[rgba(0,230,160,0.65)] hover:shadow-[0_0_24px_rgba(0,230,160,0.4)] transition-all duration-300 backdrop-blur-xl cursor-pointer ${sizeClasses[size]} ${
          isPopupOpen ? "border-[#00E6A0] shadow-[0_0_24px_rgba(0,230,160,0.45)] text-[#00E6A0]" : ""
        } ${className}`}
      >
        {/* Subtle radial inner glow on hover */}
        <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-[rgba(0,230,160,0.2)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {isLinkedIn ? (
          <LinkedInIcon className={`${iconSizes[size]} transition-transform duration-300 group-hover:scale-110`} />
        ) : (
          <GitHubIcon className={`${iconSizes[size]} transition-transform duration-300 group-hover:scale-110`} />
        )}
      </motion.button>

      {/* 1. Animated Hover Tooltip (Suppressed when popup is open) */}
      <AnimatePresence>
        {showTooltip && isHovered && !isPopupOpen && (
          <motion.div
            initial={{ opacity: 0, y: computedPlacement === "top" ? -6 : 6, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: computedPlacement === "top" ? -6 : 6, scale: 0.92 }}
            transition={{ duration: 0.18 }}
            className={`absolute pointer-events-none z-50 whitespace-nowrap px-2.5 py-1 text-[11px] font-medium tracking-wide text-[#F5FFF9] bg-[#0B100D]/95 border border-[rgba(0,230,160,0.35)] rounded-md shadow-[0_4px_16px_rgba(0,0,0,0.6)] backdrop-blur-md ${getHorizontalClasses()} ${
              computedPlacement === "top" ? "-top-9" : "-bottom-9"
            }`}
          >
            {label}
            <div
              className={`absolute w-2 h-2 rotate-45 bg-[#0B100D] ${
                computedPlacement === "top"
                  ? "-bottom-1 border-b border-r border-[rgba(0,230,160,0.35)]"
                  : "-top-1 border-t border-l border-[rgba(0,230,160,0.35)]"
              } ${horizontalAlign === "right" ? "right-3" : horizontalAlign === "left" ? "left-3" : "left-1/2 -translate-x-1/2"}`}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Clickable Floating Glassmorphism Popup */}
      <AnimatePresence>
        {isPopupOpen && (
          <motion.div
            ref={popupRef}
            role="dialog"
            aria-label={`${label} profile overview`}
            initial={{
              opacity: 0,
              scale: 0.9,
              y: computedPlacement === "top" ? -12 : 12,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.92,
              y: computedPlacement === "top" ? -10 : 10,
            }}
            transition={{
              type: "spring",
              stiffness: 380,
              damping: 24,
            }}
            className={`absolute z-50 w-[295px] sm:w-[325px] max-w-[calc(100vw-32px)] overflow-hidden rounded-2xl bg-[#0B100D]/95 border border-[rgba(0,230,160,0.38)] shadow-[0_22px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(0,230,160,0.22)] backdrop-blur-2xl p-5 text-left ${getHorizontalClasses()} ${
              computedPlacement === "top" ? "bottom-full mb-3" : "top-full mt-3"
            }`}
          >
            {/* Ambient top glowing line */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#00E6A0] to-transparent opacity-90" />

            {/* Header: Platform Icon, Name & Close Button */}
            <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-[rgba(0,230,160,0.16)]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full glass-surface border border-[rgba(0,230,160,0.4)] flex items-center justify-center text-[#00E6A0] shadow-[0_0_12px_rgba(0,230,160,0.25)]">
                  {isLinkedIn ? (
                    <LinkedInIcon className="w-4 h-4" />
                  ) : (
                    <GitHubIcon className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#F5FFF9] tracking-wide">
                    {profileData.platform}
                  </h4>
                  <div className="flex items-center gap-1 text-[10px] font-mono text-[#00E6A0]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E6A0] animate-emerald-pulse" />
                    <span>Official Profile</span>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={closePopup}
                aria-label={`Close ${label} popup`}
                className="w-7 h-7 rounded-full flex items-center justify-center glass-surface border border-[rgba(0,230,160,0.2)] text-[#A7B5AD] hover:text-[#00E6A0] hover:border-[rgba(0,230,160,0.6)] transition-all cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Profile Identity & Tagline */}
            <div className="mb-3 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#F5FFF9] tracking-wide">
                  {profileData.profileName}
                </span>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00E6A0]" />
              </div>
              <p className="text-[11px] font-mono text-[#8BFFD5]">
                {profileData.tagline}
              </p>
            </div>

            {/* Short Description */}
            <p className="text-xs text-[#A7B5AD] leading-relaxed mb-4 font-light">
              {profileData.description}
            </p>

            {/* Profile Visit Button */}
            <a
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closePopup}
              className="group/btn relative w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00E6A0] to-[#087F5B] text-[#050706] font-semibold text-xs tracking-wide shadow-[0_0_20px_rgba(0,230,160,0.35)] hover:shadow-[0_0_28px_rgba(0,230,160,0.6)] hover:border-[rgba(255,255,255,0.7)] transition-all duration-300"
            >
              <span>{profileData.buttonText}</span>
              <ExternalLink className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
            </a>

            {/* Pointer notch */}
            <div
              className={`absolute w-3 h-3 rotate-45 bg-[#0B100D] ${
                computedPlacement === "top"
                  ? "-bottom-1.5 border-b border-r border-[rgba(0,230,160,0.38)]"
                  : "-top-1.5 border-t border-l border-[rgba(0,230,160,0.38)]"
              } ${horizontalAlign === "right" ? "right-4" : horizontalAlign === "left" ? "left-4" : "left-1/2 -translate-x-1/2"}`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SocialGroup({
  size = "md",
  className = "",
  showTooltip = true,
  placement = "auto",
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
  showTooltip?: boolean;
  placement?: "top" | "bottom" | "auto";
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <SocialButton
        href="https://www.linkedin.com/in/saichandutadikamalla"
        label="LinkedIn"
        size={size}
        showTooltip={showTooltip}
        placement={placement}
      />
      <SocialButton
        href="https://github.com/saichandu-ai"
        label="GitHub"
        size={size}
        showTooltip={showTooltip}
        placement={placement}
      />
    </div>
  );
}
