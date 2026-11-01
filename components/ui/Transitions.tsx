"use client";

import { Variants } from "framer-motion";

/**
 * Main Cinematic Horizontal Section Transitions
 * Duration: 750ms with studio cubic-bezier easing.
 * Direction: +1 for Forward (enters from right, exits to left)
 *            -1 for Backward (enters from left, exits to right)
 */
export const sectionTransitionVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 90 : -90,
    opacity: 0,
    scale: 0.985,
    filter: "blur(4px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      x: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.65, ease: "easeOut" },
      scale: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
      filter: { duration: 0.5 },
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -90 : 90,
    opacity: 0,
    scale: 0.985,
    filter: "blur(4px)",
    transition: {
      x: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.45, ease: "easeIn" },
      scale: { duration: 0.5 },
      filter: { duration: 0.4 },
    },
  }),
};

/**
 * Accessible Reduced Motion Transition (clean fade without large translation)
 */
export const reducedMotionVariants: Variants = {
  enter: {
    opacity: 0,
  },
  center: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

/**
 * Staggered Child Variants for modular section elements
 */
export const staggeredChildVariants: Variants = {
  enter: {
    opacity: 0,
    y: 16,
  },
  center: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.3,
    },
  },
};

export const staggeredCardVariants: Variants = {
  enter: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  center: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: 0.3,
    },
  },
};

