"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, subtitle, children }: ModalProps) {
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#050706]/80 backdrop-blur-xl transition-opacity"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl glass-pill bg-[#0B100D]/95 border border-[rgba(0,230,160,0.3)] shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(0,230,160,0.15)] z-10"
          >
            {/* Top glowing ambient line */}
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#00E6A0] to-transparent opacity-80" />

            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 pb-4 border-b border-[rgba(0,230,160,0.14)]">
              <div>
                <h3 className="text-xl font-bold tracking-tight text-[#F5FFF9]">{title}</h3>
                {subtitle && (
                  <p className="text-xs tracking-wider uppercase text-[#00E6A0] mt-1 font-mono">
                    {subtitle}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="w-9 h-9 rounded-full flex items-center justify-center glass-surface border border-[rgba(0,230,160,0.2)] text-[#A7B5AD] hover:text-[#00E6A0] hover:border-[rgba(0,230,160,0.6)] transition-all duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

