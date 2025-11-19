"use client";

import HeroParallax from "@/components/landing/HeroParallax";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Wallet, Zap, Check } from "lucide-react";

export default function Home() {
  return (
    <div className="snap-y snap-mandatory h-screen w-full overflow-scroll">
      
      <HeroParallax />
     

      {/* FEATURES SECTION */}
      
        <section className="px-6 py-24 lg:px-8 bg-card/50 backdrop-blur-sm snap-start">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold sm:text-5xl">Why Choose Us?</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Three simple steps to unlock powerful features
              </p>
            </div>
          
            <div className="grid gap-8 md:grid-cols-3">
              {/* Feature 1 */}
              <div className="group relative overflow-hidden rounded-3xl bg-card p-8 shadow-lg border border-border hover:border-primary/50 transition-all hover:shadow-xl">
                <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition-all group-hover:bg-primary/20" />
                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
                    <Shield className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Secure Authentication</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Login with email or Google account using industry-standard security protocols.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">Two-factor authentication</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">End-to-end encryption</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group relative overflow-hidden rounded-3xl bg-card p-8 shadow-lg border border-border hover:border-accent/50 transition-all hover:shadow-xl">
                <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-accent/10 blur-2xl transition-all group-hover:bg-accent/20" />
                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent mb-6">
                    <Wallet className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Connect Wallets</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Link multiple wallets seamlessly with our intuitive step-by-step process.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">Multi-wallet support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">Real-time sync</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group relative overflow-hidden rounded-3xl bg-card p-8 shadow-lg border border-border hover:border-secondary/50 transition-all hover:shadow-xl">
                <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-secondary/10 blur-2xl transition-all group-hover:bg-secondary/20" />
                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/10 text-secondary-foreground mb-6">
                    <Zap className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Lightning Fast</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Experience instant transactions and real-time updates without delays.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-secondary-foreground mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">Sub-second response</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-secondary-foreground mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">Optimized performance</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      

      {/* CTA Section */}
      
        <section className="px-6 py-24 lg:px-8 snap-start">
          <div className="mx-auto max-w-4xl text-center">
            <div className="rounded-3xl bg-gradient-to-br from-primary via-accent to-secondary p-1 shadow-2xl">
              <div className="rounded-3xl bg-card/95 backdrop-blur-sm px-8 py-16">
                <h2 className="text-4xl font-bold sm:text-5xl mb-6">
                  Ready to Get Started?
                </h2>
                <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
                  Join our community and experience the future of digital finance.
                </p>
                <Link href="/auth/login">
                  <Button size="lg" className="h-14 px-10 rounded-full">
                    Start Your Journey
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      
    </div>
  );
}