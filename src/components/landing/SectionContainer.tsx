"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionContainerProps {
  title: string;
  children: ReactNode;
}

export default function SectionContainer({ title, children }: SectionContainerProps) {
  return (
    <section className="py-32 md:py-40 px-6">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-5xl font-semibold text-center mb-16"
      >
        {title}
      </motion.h2>

      {children}
    </section>
  );
}
