import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Wallet, Zap, Check } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 pt-20 pb-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center animate-fade-in-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-secondary/20 px-4 py-2 text-sm font-medium text-secondary-foreground border border-secondary/30">
              <Zap className="h-4 w-4 text-primary" />
              <span>Secure • Simple • Seamless</span>
            </div>
            
            <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-foreground sm:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary">
              Connect Your Wallet, Unlock the Future
            </h1>
            
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
              Experience seamless authentication and secure wallet integration. 
              Join thousands of users in the next generation of digital finance.
            </p>
            
            <div className="mt-12 flex items-center justify-center gap-4">
              <Link href="/auth/login">
                <Button size="lg" className="group h-14 px-8 text-base font-semibold rounded-full shadow-lg hover:shadow-xl transition-all">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="h-14 px-8 text-base font-semibold rounded-full">
                Learn More
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative gradient orbs */}
        <div className="absolute top-0 right-0 -z-10 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 -z-10 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
      </section>

      {/* Features Infographic Section */}
      <section className="px-6 py-24 lg:px-8 bg-card/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Why Choose Us?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Three simple steps to unlock powerful features
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="group relative overflow-hidden rounded-3xl bg-card p-8 shadow-lg border border-border hover:border-primary/50 transition-all hover:shadow-xl animate-fade-in-up">
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
            <div className="group relative overflow-hidden rounded-3xl bg-card p-8 shadow-lg border border-border hover:border-accent/50 transition-all hover:shadow-xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
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
            <div className="group relative overflow-hidden rounded-3xl bg-card p-8 shadow-lg border border-border hover:border-secondary/50 transition-all hover:shadow-xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
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
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="rounded-3xl bg-gradient-to-br from-primary via-accent to-secondary p-1 shadow-2xl animate-fade-in">
            <div className="rounded-3xl bg-card/95 backdrop-blur-sm px-8 py-16">
              <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
                Join our community and experience the future of digital finance. 
                Create your account in less than 2 minutes.
              </p>
              <Link href="/auth/login">
                <Button size="lg" className="h-14 px-10 text-base font-semibold rounded-full shadow-lg hover:shadow-xl transition-all group">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}