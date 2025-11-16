"use client";

import { motion } from "framer-motion";

interface CardSectionProps {
  title: string;
  content: string;
  color?: "primary" | "secondary" | "accent";
}

export default function CardSection({ title, content, color = "primary" }: CardSectionProps) {
  const sentences = content
    .split("\n")
    .map(s => s.trim())
    .filter(Boolean);

  return (
    <section className="py-32 md:py-40">
      <div className="mx-auto max-w-5xl px-6">
        
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-4xl md:text-5xl font-semibold mb-16 text-center"
        >
          {title}
        </motion.h2>

        {/* Cards */}
        <div className="grid gap-8">
          {sentences.map((sentence, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`
                bg-white/10 
                backdrop-blur-xl 
                border border-white/20 
                rounded-3xl 
                p-8 
                text-lg 
                leading-relaxed 
                shadow-xl 
                ${index % 3 === 0 ? "ml-0 md:ml-10" : ""}
                ${index % 3 === 1 ? "ml-0 md:ml-20" : ""}
                ${index % 3 === 2 ? "ml-0 md:ml-0" : ""}
              `}
            >
              {sentence}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
