"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Mail, Lock, User as UserIcon } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { toast } from "@/components/ui/use-toast";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const redirectUrl = searchParams?.get('redirect') || '/dashboard';

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // In a real app, you would validate credentials with your backend
      // For now, we'll create a user object
      await login({
        id: `user-${Date.now()}`,
        email,
        name: email.split('@')[0],
        onboardingComplete: false,
        createdAt: new Date().toISOString(),
      });
      
      toast({
        title: "Success",
        description: "You have been signed in successfully.",
        variant: "default",
      });
      
      router.push(redirectUrl);
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          className="mb-6 -ml-2"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <Card className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-black mb-2" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>Welcome Back</h1>
            <p className="text-muted-foreground font-medium" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleEmailLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-semibold" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="font-semibold" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>Password</Label>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                />
              </div>
            </div>

            <Button type="submit" className="w-full font-bold" disabled={isLoading} style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            Don't have an account?{' '}
            <Link
              href="/auth/signup"
              className="font-bold text-primary hover:underline"
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            >
              Sign up
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
