"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  ariaLabel?: string;
  target?: string;
  rel?: string;
}

export function MagneticButton({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className = "",
  icon,
  iconPosition = "right",
  ariaLabel,
  target,
  rel,
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.22;
    const y = (clientY - (top + height / 2)) * 0.22;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-xs gap-1.5",
    md: "px-6 py-3 text-sm gap-2",
    lg: "px-8 py-4 text-base gap-2.5",
  };

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-[#00E6A0] to-[#087F5B] text-[#050706] font-semibold border border-[rgba(139,255,213,0.4)] shadow-[0_0_24px_rgba(0,230,160,0.35)] hover:shadow-[0_0_36px_rgba(0,230,160,0.6)] hover:border-[rgba(255,255,255,0.7)]",
    secondary:
      "bg-[#0B100D]/75 text-[#F5FFF9] border border-[rgba(0,230,160,0.28)] hover:border-[rgba(0,230,160,0.65)] hover:text-[#00E6A0] hover:shadow-[0_0_24px_rgba(0,230,160,0.22)] backdrop-blur-md",
    ghost:
      "bg-transparent text-[#A7B5AD] hover:text-[#F5FFF9] hover:bg-[rgba(255,255,255,0.05)] border border-transparent hover:border-[rgba(0,230,160,0.2)]",
  };

  const commonProps = {
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    animate: { x: position.x, y: position.y },
    transition: { type: "spring" as const, stiffness: 350, damping: 20 },
    className: `relative inline-flex items-center justify-center font-medium rounded-full cursor-pointer select-none overflow-hidden transition-all duration-300 group ${sizeClasses[size]} ${variantClasses[variant]} ${className}`,
    "aria-label": ariaLabel,
  };

  const content = (
    <>
      {/* Dynamic ambient highlight */}
      <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {icon && iconPosition === "left" && (
        <span className="transition-transform duration-300 group-hover:-translate-x-0.5">
          {icon}
        </span>
      )}
      <span className="relative z-10 tracking-wide">{children}</span>
      {icon && iconPosition === "right" && (
        <span className="transition-transform duration-300 group-hover:translate-x-0.5">
          {icon}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <motion.a
        ref={btnRef as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        {...commonProps}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={btnRef as React.Ref<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      {...commonProps}
    >
      {content}
    </motion.button>
  );
}

