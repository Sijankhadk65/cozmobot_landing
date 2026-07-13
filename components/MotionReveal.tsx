"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { spring } from "@/lib/motion";

interface MotionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}

export function MotionReveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: MotionRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();

  // Reduced motion keeps the comprehension cue (a gentle fade) but drops the
  // vestibular part — no travel, no spring. Otherwise settle in on a
  // critically damped spring so it never overshoots on a passive reveal.
  const offset = reduceMotion ? 0 : 18;
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? offset : 0,
      x: direction === "left" ? -offset : direction === "right" ? offset : 0,
    },
    visible: { opacity: 1, y: 0, x: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={
        reduceMotion
          ? { duration: 0.3, delay, ease: "easeOut" }
          : { ...spring, delay }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}
