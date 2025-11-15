'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Coins, Check, Leaf, Wind, Droplet, TreePine } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

type CreditType = 'carbon' | 'renewable' | 'water' | 'biodiversity' | '';

export default function MintCreditsPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [formData, setFormData] = useState({
    creditType: '' as CreditType,
    quantity: '',
    projectId: '',
    description: '',
  });

  const creditTypes = [
    {
      id: 'carbon' as CreditType,
      name: 'Carbon Credits',
      icon: <Leaf className="h-8 w-8" />,
      description: 'Verified carbon offset credits',
      unit: 'tCO2e',
    },
    {
      id: 'renewable' as CreditType,
      name: 'Renewable Energy',
      icon: <Wind className="h-8 w-8" />,
      description: 'Clean energy certificates',
      unit: 'MWh',
    },
    {
      id: 'water' as CreditType,
      name: 'Water Credits',
      icon: <Droplet className="h-8 w-8" />,
      description: 'Water conservation credits',
      unit: 'm³',
    },
    {
      id: 'biodiversity' as CreditType,
      name: 'Biodiversity Credits',
      icon: <TreePine className="h-8 w-8" />,
      description: 'Ecosystem preservation credits',
      unit: 'hectares',
    },
  ];

  const selectedCreditType = creditTypes.find(ct => ct.id === formData.creditType);

  const handleNext = () => {
    if (step === 1 && !formData.creditType) {
      toast({
        title: 'Selection Required',
        description: 'Please select a credit type',
        variant: 'destructive',
      });
      return;
    }

    if (step === 2 && (!formData.quantity || !formData.projectId)) {
      toast({
        title: 'Information Required',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    if (step < 3) {
      setStep(step + 1);
    } else {
      setShowConfirmation(true);
    }
  };

  const handleMint = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: 'Success!',
        description: `Successfully minted ${formData.quantity} ${selectedCreditType?.name}`,
        variant: 'default',
      });

      router.push('/credits/manage');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to mint credits. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/20">
      <main className="mx-auto max-w-4xl px-6 py-12">
        {/* Header */}
        <div className="mb-8 animate-fade-in-up">
          <Button
            variant="ghost"
            onClick={() => router.push('/projects')}
            className="mb-4 -ml-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Button>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Coins className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Mint Credits</h1>
          </div>
          <p className="text-muted-foreground">
            Create new environmental credits from your verified project
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                step >= s ? 'bg-primary border-primary text-white' : 'border-muted text-muted-foreground'
              }`}>
                {step > s ? <Check className="h-5 w-5" /> : s}
              </div>
              {s < 3 && (
                <div className={`w-24 h-0.5 ${step > s ? 'bg-primary' : 'bg-muted'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Content Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>
              {step === 1 && 'Select Credit Type'}
              {step === 2 && 'Enter Details'}
              {step === 3 && 'Review & Confirm'}
            </CardTitle>
            <CardDescription>
              {step === 1 && 'Choose the type of environmental credits to mint'}
              {step === 2 && 'Provide quantity and project information'}
              {step === 3 && 'Review your minting details before confirming'}
            </CardDescription>
          </CardHeader>
          <CardContent className="min-h-[400px]">
            {/* Step 1: Select Credit Type */}
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {creditTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setFormData({ ...formData, creditType: type.id })}
                    className={`p-6 border-2 rounded-lg text-left transition-all hover:shadow-md ${
                      formData.creditType === type.id
                        ? 'border-primary bg-primary/5 shadow-md'
                        : 'border-border hover:border-gold/50'
                    }`}
                  >
                    <div className={`mb-3 ${formData.creditType === type.id ? 'text-primary' : 'text-muted-foreground'}`}>
                      {type.icon}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{type.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{type.description}</p>
                    <p className="text-xs text-muted-foreground">Unit: {type.unit}</p>
                    {formData.creditType === type.id && (
                      <div className="mt-3 flex items-center text-primary text-sm font-medium">
                        <Check className="h-4 w-4 mr-1" /> Selected
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Step 2: Enter Details */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    {selectedCreditType?.icon && (
                      <div className="text-primary">{selectedCreditType.icon}</div>
                    )}
                    <div>
                      <h3 className="font-semibold">{selectedCreditType?.name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedCreditType?.description}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity to Mint *</Label>
                  <div className="relative">
                    <Input
                      id="quantity"
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      placeholder="0"
                      className="pr-20"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                      {selectedCreditType?.unit}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Enter the total number of credits to mint from your verified project
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectId">Project ID *</Label>
                  <Input
                    id="projectId"
                    value={formData.projectId}
                    onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                    placeholder="e.g., PROJ-2024-001"
                  />
                  <p className="text-xs text-muted-foreground">
                    The verified project these credits are associated with
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Add any additional notes or details"
                    className="w-full min-h-[100px] px-3 py-2 border border-input rounded-md bg-background resize-none"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Preview */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-6 border-2 border-primary/20">
                  <h3 className="text-lg font-semibold mb-4">Minting Summary</h3>
                  <dl className="space-y-3">
                    <div className="flex justify-between items-center pb-3 border-b">
                      <dt className="text-muted-foreground">Credit Type:</dt>
                      <dd className="font-semibold flex items-center gap-2">
                        {selectedCreditType?.icon && (
                          <span className="text-primary">{selectedCreditType.icon}</span>
                        )}
                        {selectedCreditType?.name}
                      </dd>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b">
                      <dt className="text-muted-foreground">Quantity:</dt>
                      <dd className="font-semibold text-2xl text-primary">
                        {formData.quantity} {selectedCreditType?.unit}
                      </dd>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b">
                      <dt className="text-muted-foreground">Project ID:</dt>
                      <dd className="font-mono text-sm">{formData.projectId}</dd>
                    </div>
                    {formData.description && (
                      <div className="pt-2">
                        <dt className="text-muted-foreground mb-2">Description:</dt>
                        <dd className="text-sm">{formData.description}</dd>
                      </div>
                    )}
                  </dl>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Check className="h-5 w-5 text-blue-600" />
                    What happens next?
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Credits will be minted on the blockchain</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>You'll receive a unique token ID for each credit</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Credits will appear in your portfolio immediately</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>You can transfer, retire, or list them for sale</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t mt-6">
              <Button
                variant="outline"
                onClick={() => step > 1 ? setStep(step - 1) : router.push('/projects')}
              >
                {step === 1 ? 'Cancel' : 'Back'}
              </Button>
              <Button onClick={handleNext}>
                {step === 3 ? 'Confirm & Mint' : 'Continue'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full shadow-2xl">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Coins className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Confirm Minting</CardTitle>
                  <CardDescription>
                    This action will mint {formData.quantity} {selectedCreditType?.name}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-6">
                Once minted, these credits will be permanently recorded on the blockchain. 
                This action cannot be undone. Are you sure you want to proceed?
              </p>
              <div className="flex items-center justify-end gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setShowConfirmation(false)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleMint}
                  disabled={isLoading}
                >
                  {isLoading ? 'Minting...' : 'Confirm & Mint'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
