"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";

export default function HeroParallax() {
  return (
    <section className="relative h-screen w-full overflow-hidden snap-start">
      {/* Background */}
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src="/earth.jpeg"
          alt="Earth from space"
          fill
          priority
          className="object-cover"
        />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Text */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-card/10 px-4 py-2 backdrop-blur-md">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm text-white">Secure • Simple • Seamless</span>
          </div>

          <h1 className="text-white text-5xl sm:text-7xl font-bold max-w-4xl">
            Connect Your Wallet,
            <br /> Unlock the Future
          </h1>

          <p className="mt-6 text-muted-foreground text-lg max-w-2xl mx-auto">
            Experience seamless authentication and secure wallet integration.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <Link href="/auth/login">
              <Button size="lg" className="rounded-full h-14 px-8">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
