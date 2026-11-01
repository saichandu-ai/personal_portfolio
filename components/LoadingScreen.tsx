"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Fast, lightweight, cinematic counter to 100%
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(onComplete, 600);
          }, 200);
          return 100;
        }
        // Increment with natural easing
        const step = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + step, 100);
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  const fullName = "TADIKAMALLA VENKATA SAI CHANDU";

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050706] text-[#F5FFF9] overflow-hidden select-none"
        >
          {/* Subtle background glow */}
          <div className="absolute w-[450px] h-[450px] rounded-full bg-[#00E6A0]/10 blur-[120px] pointer-events-none" />

          {/* Animated 3D Glass Sphere Graphic */}
          <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
            {/* Outer rotating ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-[#00E6A0]/40"
            />
            {/* Inner counter-rotating ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
              className="absolute inset-2 rounded-full border border-[#8BFFD5]/30 shadow-[0_0_15px_rgba(0,230,160,0.2)]"
            />
            {/* Glowing Emerald Glass Sphere Core */}
            <motion.div
              animate={{
                scale: [0.95, 1.05, 0.95],
                boxShadow: [
                  "0 0 20px rgba(0, 230, 160, 0.3)",
                  "0 0 35px rgba(0, 230, 160, 0.6)",
                  "0 0 20px rgba(0, 230, 160, 0.3)",
                ],
              }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#087F5B] via-[#00E6A0]/30 to-[#8BFFD5]/40 backdrop-blur-xl border border-[rgba(0,230,160,0.5)] flex items-center justify-center"
            >
              <div className="w-6 h-6 rounded-full bg-[#00E6A0] shadow-[0_0_12px_#00E6A0] animate-pulse" />
            </motion.div>
          </div>

          {/* Name Reveal */}
          <div className="text-center px-4 mb-6">
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-sm md:text-base font-mono tracking-[0.3em] uppercase text-[#F5FFF9] font-medium"
            >
              {fullName}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-[11px] font-mono tracking-widest text-[#00E6A0] mt-1.5 uppercase"
            >
              AI & Machine Learning • Digital Experience
            </motion.p>
          </div>

          {/* Progress Bar & Numeric Counter */}
          <div className="w-56 flex flex-col items-center gap-2">
            <div className="w-full h-1 bg-[rgba(255,255,255,0.08)] rounded-full overflow-hidden p-0.5 border border-[rgba(0,230,160,0.15)]">
              <motion.div
                className="h-full bg-gradient-to-r from-[#087F5B] via-[#00E6A0] to-[#8BFFD5] rounded-full shadow-[0_0_8px_#00E6A0]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
            <span className="text-[11px] font-mono tracking-wider text-[#A7B5AD]">
              {progress}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

