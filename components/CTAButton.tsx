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
      "bg-[#1a5fb4] text-white hover:bg-[#1550a0] shadow-sm hover:shadow-md",
    secondary:
      "bg-white text-[#1a5fb4] border border-[#1a5fb4]/30 hover:border-[#1a5fb4] hover:bg-[#e8f0fb]",
    ghost:
      "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
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
