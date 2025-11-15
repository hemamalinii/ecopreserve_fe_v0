'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';
import { Check, ChevronLeft, ChevronRight, Leaf, Shield, TreePine, Users, Wallet, FileCheck } from 'lucide-react';

import { User } from '@/lib/auth-context';

interface OnboardingData {
  role: User['role'];
  fullName: string;
  organization: string;
  phone: string;
  country: string;
  walletAddress: string;
  kycVerified: boolean;
}

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    role: '',
    fullName: '',
    organization: '',
    phone: '',
    country: '',
    walletAddress: '',
    kycVerified: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { user, updateUser } = useAuth();
  const router = useRouter();

  const totalSteps = 5;

  const steps = [
    { id: 1, title: 'Choose Role', description: 'Select your primary role' },
    { id: 2, title: 'Basic Information', description: 'Tell us about yourself' },
    { id: 3, title: 'Connect Wallet', description: 'Link your wallet or email' },
    { id: 4, title: 'KYC Verification', description: 'Verify your identity' },
    { id: 5, title: 'Complete', description: 'All set!' },
  ];

  const validateStep = () => {
    if (step === 1 && !data.role) {
      toast({
        title: 'Selection Required',
        description: 'Please select a role to continue',
        variant: 'destructive',
      });
      return false;
    }
    
    if (step === 2 && (!data.fullName || !data.phone || !data.country)) {
      toast({
        title: 'Information Required',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return false;
    }
    
    if (step === 3 && !data.walletAddress) {
      toast({
        title: 'Wallet Required',
        description: 'Please connect your wallet or provide an email',
        variant: 'destructive',
      });
      return false;
    }
    
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      await updateUser({
        ...user,
        role: data.role,
        name: data.fullName,
        organization: data.organization,
        phone: data.phone,
        country: data.country,
        walletAddress: data.walletAddress,
        onboardingComplete: true,
      });
      
      toast({
        title: 'Welcome!',
        description: 'Your profile has been set up successfully.',
        variant: 'default',
      });
      
      router.push('/dashboard');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to complete onboarding. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const progress = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Complete Your Profile</h1>
          <p className="text-muted-foreground">Just a few more steps to get started with carbonready.earth</p>
          
          {/* Progress Bar */}
          <div className="mt-6 w-full max-w-2xl mx-auto">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between mt-4">
              {steps.map((s) => (
                <div 
                  key={s.id} 
                  className={`flex flex-col items-center ${step >= s.id ? 'text-primary' : 'text-muted-foreground'}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                    step > s.id ? 'bg-primary text-white' : 
                    step === s.id ? 'bg-primary text-white ring-4 ring-gold/20' : 
                    'bg-muted'
                  }`}>
                    {step > s.id ? <Check className="h-5 w-5" /> : s.id}
                  </div>
                  <span className="text-xs font-medium hidden sm:block">{s.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content Card */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle>{steps[step - 1].title}</CardTitle>
            <CardDescription>{steps[step - 1].description}</CardDescription>
          </CardHeader>
          <CardContent className="min-h-[300px]">
            {/* Step 1: Choose Role */}
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <RoleCard
                  icon={<TreePine className="h-10 w-10" />}
                  title="Landowner"
                  description="I own land and want to participate in conservation projects"
                  selected={data.role === 'landowner'}
                  onClick={() => setData({ ...data, role: 'landowner' })}
                />
                <RoleCard
                  icon={<Shield className="h-10 w-10" />}
                  title="Investor"
                  description="I want to invest in conservation projects"
                  selected={data.role === 'investor'}
                  onClick={() => setData({ ...data, role: 'investor' })}
                />
                <RoleCard
                  icon={<Leaf className="h-10 w-10" />}
                  title="Developer"
                  description="I develop or manage conservation projects"
                  selected={data.role === 'developer'}
                  onClick={() => setData({ ...data, role: 'developer' })}
                />
                <RoleCard
                  icon={<Users className="h-10 w-10" />}
                  title="Corporate User"
                  description="I represent a corporate entity"
                  selected={data.role === 'corporate'}
                  onClick={() => setData({ ...data, role: 'corporate' })}
                />
              </div>
            )}

            {/* Step 2: Basic Information */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name <span className="text-red-500">*</span></Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={data.fullName}
                    onChange={(e) => setData({ ...data, fullName: e.target.value })}
                    placeholder="John Doe"
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="organization">Organization (Optional)</Label>
                  <Input
                    id="organization"
                    type="text"
                    value={data.organization}
                    onChange={(e) => setData({ ...data, organization: e.target.value })}
                    placeholder="Company or Organization Name"
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={data.phone}
                      onChange={(e) => setData({ ...data, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Country <span className="text-red-500">*</span></Label>
                    <select
                      id="country"
                      value={data.country}
                      onChange={(e) => setData({ ...data, country: e.target.value })}
                      className="mt-1 w-full px-3 py-2 border border-input rounded-md bg-background"
                      required
                    >
                      <option value="">Select a country</option>
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="CA">Canada</option>
                      <option value="AU">Australia</option>
                      <option value="IN">India</option>
                      <option value="BR">Brazil</option>
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                      <option value="JP">Japan</option>
                      <option value="CN">China</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Connect Wallet */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center py-6">
                  <Wallet className="h-16 w-16 mx-auto text-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Connect Your Wallet</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Connect your crypto wallet or use email authentication
                  </p>
                </div>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full h-12 justify-start"
                    onClick={() => setData({ ...data, walletAddress: '0x' + Math.random().toString(16).slice(2, 42) })}
                  >
                    <img src="/metamask.svg" alt="MetaMask" className="h-6 w-6 mr-3" onError={(e) => e.currentTarget.style.display = 'none'} />
                    Connect MetaMask
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full h-12 justify-start"
                    onClick={() => setData({ ...data, walletAddress: 'wallet-' + Math.random().toString(36).slice(2, 15) })}
                  >
                    <Wallet className="h-6 w-6 mr-3" />
                    Connect WalletConnect
                  </Button>
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">Or</span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full h-12 justify-start"
                    onClick={() => setData({ ...data, walletAddress: user?.email || 'email-auth' })}
                  >
                    Continue with Email
                  </Button>
                </div>
                {data.walletAddress && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-sm text-green-800">
                      ✓ Connected: {data.walletAddress.slice(0, 10)}...{data.walletAddress.slice(-8)}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: KYC Verification */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="text-center py-6">
                  <FileCheck className="h-16 w-16 mx-auto text-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-2">KYC Verification</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Complete identity verification to unlock all features
                  </p>
                </div>
                <div className="bg-muted rounded-lg p-6">
                  <h4 className="font-semibold text-foreground mb-3">Required Documents:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Government-issued ID (Passport, Driver's License, or National ID)</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Proof of address (Utility bill or bank statement)</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Business registration documents (for organizations)</span>
                    </li>
                  </ul>
                </div>
                {data.kycVerified ? (
                  <div className="mt-4 p-3 bg-accent/10 border border-accent rounded-md">
                    <p className="text-sm text-accent-foreground">
                      ✓ KYC verification completed
                    </p>
                  </div>
                ) : (
                  <Button 
                    className="w-full"
                    onClick={() => setData({ ...data, kycVerified: true })}
                  >
                    Start KYC Process
                  </Button>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1 || isLoading}
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={isLoading}
            >
              {step === totalSteps ? (
                isLoading ? 'Setting up...' : 'Go to Dashboard'
              ) : (
                <>Continue <ChevronRight className="h-4 w-4 ml-1" /></>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

interface RoleCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

function RoleCard({ icon, title, description, selected, onClick }: RoleCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-6 border-2 rounded-lg text-left transition-all hover:shadow-md ${
        selected
          ? 'border-primary bg-primary/5 shadow-md'
          : 'border-border hover:border-gold/50'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className={`mb-3 ${selected ? 'text-primary' : 'text-muted-foreground'}`}>
          {icon}
        </div>
        <h3 className="font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground flex-grow">{description}</p>
        {selected && (
          <div className="mt-3 flex items-center text-primary text-sm font-medium">
            <Check className="h-4 w-4 mr-1" /> Selected
          </div>
        )}
      </div>
    </button>
  );
}
