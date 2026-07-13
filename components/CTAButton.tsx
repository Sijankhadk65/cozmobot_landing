"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { springSnappy } from "@/lib/motion";

interface CTAButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
  onClick?: () => void;
  icon?: boolean;
  className?: string;
}

export function CTAButton({
  children,
  variant = "primary",
  href,
  onClick,
  icon = false,
  className = "",
}: CTAButtonProps) {
  // Colour/shadow shifts stay on a short CSS transition; the scale lives on a
  // spring so the press reads as physical. transform-gpu keeps it composited.
  const base =
    "inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-colors duration-200 cursor-pointer transform-gpu will-change-transform";
  const styles = {
    primary:
      "bg-accent text-ink hover:bg-[#bcdd4d] shadow-sm hover:shadow-md",
    secondary:
      "bg-transparent text-accent border border-accent/40 hover:border-accent hover:bg-accent/10",
    ghost: "text-mute hover:text-offwhite hover:bg-steel/40",
  };

  // Respond on press-down (whileTap fires on pointer-down), and let the arrow
  // hint in the direction of travel on hover. Scale lives on the parent
  // variant so the child arrow can ride the same hover state.
  const motionProps = {
    variants: { rest: { scale: 1 }, hover: { scale: 1.015 } },
    whileTap: { scale: 0.97 },
    transition: springSnappy,
  } as const;

  const content = (
    <>
      {children}
      {icon && (
        <motion.span
          className="inline-flex"
          variants={{ rest: { x: 0 }, hover: { x: 3 } }}
        >
          <ArrowRight className="w-4 h-4" />
        </motion.span>
      )}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={`${base} ${styles[variant]} ${className}`}
        initial="rest"
        whileHover="hover"
        animate="rest"
        {...motionProps}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={`${base} ${styles[variant]} ${className}`}
      initial="rest"
      whileHover="hover"
      animate="rest"
      {...motionProps}
    >
      {content}
    </motion.button>
  );
}
