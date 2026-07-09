"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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
  const base =
    "inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 cursor-pointer";
  const styles = {
    primary:
      "bg-accent text-ink hover:bg-[#bcdd4d] shadow-sm hover:shadow-md",
    secondary:
      "bg-transparent text-accent border border-accent/40 hover:border-accent hover:bg-accent/10",
    ghost: "text-mute hover:text-offwhite hover:bg-steel/40",
  };

  const content = (
    <>
      {children}
      {icon && <ArrowRight className="w-4 h-4" />}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={`${base} ${styles[variant]} ${className}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={`${base} ${styles[variant]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  );
}
