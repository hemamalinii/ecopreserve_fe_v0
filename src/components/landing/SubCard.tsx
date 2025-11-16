"use client";

import { motion } from "framer-motion";
import type { ReactNode } from 'react';

interface SubCardProps {
  children: ReactNode;
  delay?: number;
}

export default function SubCard({ children, delay = 0 }: SubCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className="
        bg-white/10 backdrop-blur-xl 
        border border-white/20 
        rounded-3xl p-8 
        shadow-xl 
        text-lg leading-relaxed
      "
    >
      {children}
    </motion.div>
  );
}
