"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface ConclusionProps {
  children: ReactNode;
}

export default function Conclusion({ children }: ConclusionProps) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay: 0.2 }}
      className="text-center mt-12 text-xl text-muted-foreground max-w-3xl mx-auto"
    >
      {children}
    </motion.p>
  );
}
