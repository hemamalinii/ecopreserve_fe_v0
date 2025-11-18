'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, TrendingUp, Calendar, DollarSign, Check, AlertCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface Credit {
  id: string;
  tokenId: string;
  type: string;
  quantity: number;
  unit: string;
  projectName: string;
}

export default function SellCreditsPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [formData, setFormData] = useState({
    creditId: '',
    pricePerUnit: '',
    totalQuantity: '',
    quantityToSell: '',
    expiryDate: '',
    description: '',
  });

  // Mock available credits
  const availableCredits: Credit[] = [
    {
      id: '1',
      tokenId: 'TKN-001-2024',
      type: 'Carbon Credits',
      quantity: 1000,
      unit: 'tCO2e',
      projectName: 'Amazon Rainforest Conservation',
    },
    {
      id: '2',
      tokenId: 'TKN-003-2024',
      type: 'Water Credits',
      quantity: 750,
      unit: 'm³',
      projectName: 'Water Conservation Initiative',
    },
  ];

  const selectedCredit = availableCredits.find(c => c.id === formData.creditId);
  const totalPrice = selectedCredit && formData.pricePerUnit && formData.quantityToSell
    ? (parseFloat(formData.pricePerUnit) * parseFloat(formData.quantityToSell)).toFixed(2)
    : '0.00';

  const handleNext = () => {
    if (step === 1 && !formData.creditId) {
      toast({
        title: 'Selection Required',
        description: 'Please select a credit to list',
        variant: 'destructive',
      });
      return;
    }

    if (step === 2) {
      if (!formData.pricePerUnit || !formData.quantityToSell) {
        toast({
          title: 'Information Required',
          description: 'Please fill in all required fields',
          variant: 'destructive',
        });
        return;
      }

      const quantity = parseFloat(formData.quantityToSell);
      if (selectedCredit && quantity > selectedCredit.quantity) {
        toast({
          title: 'Invalid Quantity',
          description: `You only have ${selectedCredit.quantity} ${selectedCredit.unit} available`,
          variant: 'destructive',
        });
        return;
      }
    }

    if (step < 3) {
      setStep(step + 1);
    } else {
      setShowConfirmation(true);
    }
  };

  const handleList = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: 'Success!',
        description: `Successfully listed ${formData.quantityToSell} ${selectedCredit?.unit} for sale`,
        variant: 'default',
      });

      router.push('/marketplace');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to list credits. Please try again.',
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
            onClick={() => router.push('/credits/manage')}
            className="mb-4 -ml-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Manage Credits
          </Button>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">List Credits for Sale</h1>
          </div>
          <p className="text-muted-foreground">
            List your environmental credits on the marketplace
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
              {step === 1 && 'Select Credits'}
              {step === 2 && 'Set Price & Details'}
              {step === 3 && 'Review Listing'}
            </CardTitle>
            <CardDescription>
              {step === 1 && 'Choose which credits you want to list for sale'}
              {step === 2 && 'Set your pricing and listing details'}
              {step === 3 && 'Review your listing before publishing'}
            </CardDescription>
          </CardHeader>
          <CardContent className="min-h-[400px]">
            {/* Step 1: Select Credits */}
            {step === 1 && (
              <div className="space-y-4">
                {availableCredits.map((credit) => (
                  <button
                    key={credit.id}
                    onClick={() => {
                      setFormData({ 
                        ...formData, 
                        creditId: credit.id,
                        totalQuantity: credit.quantity.toString(),
                      });
                    }}
                    className={`w-full p-6 border-2 rounded-lg text-left transition-all hover:shadow-md ${
                      formData.creditId === credit.id
                        ? 'border-primary bg-primary/5 shadow-md'
                        : 'border-border hover:border-gold/50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{credit.projectName}</h3>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground mb-1">Token ID</p>
                            <p className="font-semibold">{credit.tokenId}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1">Type</p>
                            <p className="font-semibold">{credit.type}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1">Available</p>
                            <p className="font-semibold text-primary">
                              {credit.quantity} {credit.unit}
                            </p>
                          </div>
                        </div>
                      </div>
                      {formData.creditId === credit.id && (
                        <div className="ml-4">
                          <div className="flex items-center text-primary text-sm font-medium bg-primary/10 px-3 py-1.5 rounded-full">
                            <Check className="h-4 w-4 mr-1" /> Selected
                          </div>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Step 2: Set Price & Details */}
            {step === 2 && selectedCredit && (
              <div className="space-y-6">
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">{selectedCredit.projectName}</h3>
                  <p className="text-sm text-muted-foreground">
                    Token: {selectedCredit.tokenId} • Available: {selectedCredit.quantity} {selectedCredit.unit}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantityToSell">Quantity to Sell *</Label>
                    <div className="relative">
                      <Input
                        id="quantityToSell"
                        type="number"
                        value={formData.quantityToSell}
                        onChange={(e) => setFormData({ ...formData, quantityToSell: e.target.value })}
                        placeholder="0"
                        max={selectedCredit.quantity}
                        className="pr-20"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                        {selectedCredit.unit}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Max: {selectedCredit.quantity} {selectedCredit.unit}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pricePerUnit">Price per Unit *</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="pricePerUnit"
                        type="number"
                        step="0.01"
                        value={formData.pricePerUnit}
                        onChange={(e) => setFormData({ ...formData, pricePerUnit: e.target.value })}
                        placeholder="0.00"
                        className="pl-10"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Price in USD per {selectedCredit.unit}
                    </p>
                  </div>
                </div>

                {formData.pricePerUnit && formData.quantityToSell && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-green-800">Total Listing Value:</span>
                      <span className="text-2xl font-bold text-green-700">${totalPrice}</span>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Listing Expiry Date (Optional)</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="expiryDate"
                      type="date"
                      value={formData.expiryDate}
                      onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                      className="pl-10"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Leave empty for no expiry date
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Add any additional information about this listing..."
                    className="w-full min-h-[100px] px-3 py-2 border border-input rounded-md bg-background resize-none"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && selectedCredit && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-6 border-2 border-primary/20">
                  <h3 className="text-lg font-semibold mb-4">Listing Summary</h3>
                  <dl className="space-y-3">
                    <div className="flex justify-between items-center pb-3 border-b">
                      <dt className="text-muted-foreground">Project:</dt>
                      <dd className="font-semibold">{selectedCredit.projectName}</dd>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b">
                      <dt className="text-muted-foreground">Token ID:</dt>
                      <dd className="quicksand-regular text-sm">{selectedCredit.tokenId}</dd>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b">
                      <dt className="text-muted-foreground">Credit Type:</dt>
                      <dd className="font-semibold">{selectedCredit.type}</dd>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b">
                      <dt className="text-muted-foreground">Quantity:</dt>
                      <dd className="font-semibold text-lg">
                        {formData.quantityToSell} {selectedCredit.unit}
                      </dd>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b">
                      <dt className="text-muted-foreground">Price per Unit:</dt>
                      <dd className="font-semibold">${formData.pricePerUnit}</dd>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b">
                      <dt className="text-muted-foreground">Total Value:</dt>
                      <dd className="font-bold text-2xl text-primary">${totalPrice}</dd>
                    </div>
                    {formData.expiryDate && (
                      <div className="flex justify-between items-center pb-3 border-b">
                        <dt className="text-muted-foreground">Expires:</dt>
                        <dd className="font-semibold">{formData.expiryDate}</dd>
                      </div>
                    )}
                    {formData.description && (
                      <div className="pt-2">
                        <dt className="text-muted-foreground mb-2">Description:</dt>
                        <dd className="text-sm">{formData.description}</dd>
                      </div>
                    )}
                  </dl>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">Important Information</h4>
                      <ul className="space-y-1 text-sm text-blue-800">
                        <li>• Your credits will be locked until sold or delisted</li>
                        <li>• Buyers can purchase partial quantities</li>
                        <li>• A 2.5% marketplace fee applies to all sales</li>
                        <li>• You can edit or delist at any time before sale</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t mt-6">
              <Button
                variant="outline"
                onClick={() => step > 1 ? setStep(step - 1) : router.push('/credits/manage')}
              >
                {step === 1 ? 'Cancel' : 'Back'}
              </Button>
              <Button onClick={handleNext}>
                {step === 3 ? 'Confirm & List' : 'Continue'}
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
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Confirm Listing</CardTitle>
                  <CardDescription>
                    List {formData.quantityToSell} {selectedCredit?.unit} for ${totalPrice}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-6">
                Your credits will be listed on the marketplace and locked until sold or delisted. 
                Are you sure you want to proceed?
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
                  onClick={handleList}
                  disabled={isLoading}
                >
                  {isLoading ? 'Listing...' : 'Confirm & List'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
