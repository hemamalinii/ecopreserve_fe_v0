"use client";

import { createContext, useContext, ReactNode, useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';

type UserRole = 'landowner' | 'investor' | 'developer' | '';

export interface User {
  id: string;
  name?: string;
  email?: string;
  role?: UserRole;
  walletAddress?: string;
  organization?: string;
  phone?: string;
  country?: string;
  onboardingComplete: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Load user from localStorage on initial load
  useEffect(() => {
    const loadUser = async () => {
      try {
        setIsLoading(true);
        if (typeof window !== 'undefined') {
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            // Validate the user object
            if (parsedUser && typeof parsedUser === 'object' && 'id' in parsedUser) {
              setUser(parsedUser);
            } else {
              console.warn('Invalid user data in localStorage');
              localStorage.removeItem('user');
            }
          }
        }
      } catch (err) {
        console.error('Error loading user:', err);
        setError('Failed to load user session');
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // Handle protected routes and redirects
  useEffect(() => {
    if (isLoading) return;

    const publicPaths = ['/auth/login', '/auth/signup', '/', '/marketplace', '/about'];
    const isPublicPath = publicPaths.some(path => pathname?.startsWith(path));
    const isOnboardingPath = pathname?.startsWith('/onboarding');

    // Redirect to login if not authenticated and not on a public path
    if (!user && !isPublicPath) {
      router.push(`/auth/login?redirect=${encodeURIComponent(pathname || '/')}`);
      return;
    }

    // Redirect to onboarding if authenticated but onboarding is not complete (and not already on onboarding)
    if (user && !user.onboardingComplete && !isOnboardingPath && !isPublicPath) {
      router.push('/onboarding');
      return;
    }

    // Redirect to dashboard if already authenticated and trying to access auth pages
    if (user && user.onboardingComplete && (pathname === '/auth/login' || pathname === '/auth/signup')) {
      router.push('/dashboard');
    }
  }, [user, isLoading, pathname, router]);

  const login = useCallback(async (userData: User) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // In a real app, you would make an API call here
      // const response = await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify(userData) });
      // const data = await response.json();
      
      // For now, we'll just use the provided userData
      const userWithDefaults = {
        ...userData,
        onboardingComplete: userData.onboardingComplete || false,
      };
      
      setUser(userWithDefaults);
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(userWithDefaults));
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Failed to log in. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // In a real app, you would make an API call here
      // await fetch('/api/auth/logout', { method: 'POST' });
      
      setUser(null);
      
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
      }
      
      router.push('/');
    } catch (err) {
      console.error('Logout error:', err);
      setError('Failed to log out. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const updateUser = useCallback(async (updates: Partial<User>) => {
    if (!user) {
      throw new Error('No user is currently logged in');
    }
    
    try {
      setIsLoading(true);
      setError(null);
      
      // In a real app, you would make an API call here
      // const response = await fetch(`/api/users/${user.id}`, { 
      //   method: 'PATCH', 
      //   body: JSON.stringify(updates) 
      // });
      // const updatedUser = await response.json();
      
      // For now, we'll just update the local state
      const updatedUser = { ...user, ...updates, updatedAt: new Date().toISOString() };
      
      setUser(updatedUser);
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    } catch (err) {
      console.error('Update user error:', err);
      setError('Failed to update user. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const value = {
    user,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user,
    isLoading,
    error,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading || pathname === '/auth/login' || pathname === '/auth/signup' ? children : null}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
