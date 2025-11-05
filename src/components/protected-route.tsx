'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireOnboarding?: boolean;
}

export default function ProtectedRoute({ 
  children, 
  requireOnboarding = true 
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      // If user is not logged in, redirect to sign-in
      if (!user) {
        router.push('/auth/login?redirect=' + encodeURIComponent(window.location.pathname));
      } 
      // If onboarding is required but not completed, redirect to onboarding
      else if (requireOnboarding && !user.onboardingComplete) {
        router.push('/onboarding');
      }
    }
  }, [user, isLoading, router, requireOnboarding]);

  // Show loading state while checking auth
  if (isLoading || !user || (requireOnboarding && !user.onboardingComplete)) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
