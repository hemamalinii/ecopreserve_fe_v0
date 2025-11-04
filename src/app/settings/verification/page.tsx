'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';

export default function VerificationPage() {
  return (
    <div className="space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Identity Verification</h1>
        <p className="text-muted-foreground">
          Complete your identity verification to access all features
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Verification Status</CardTitle>
          <CardDescription>Complete your KYC/AML verification</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border p-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="rounded-full bg-amber-100 p-4">
                <Icons.shieldCheck className="h-8 w-8 text-amber-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Identity Not Verified</h3>
                <p className="text-sm text-muted-foreground">
                  Complete identity verification to access all features and higher transaction limits.
                </p>
              </div>
              <Button className="mt-4">
                <Icons.shieldCheck className="mr-2 h-4 w-4" />
                Start Verification
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Verification Levels</CardTitle>
          <CardDescription>Available verification tiers and their benefits</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          {[
            {
              name: 'Basic',
              description: 'Email & Phone Verification',
              features: ['Basic transactions', 'Limited features'],
              active: true,
            },
            {
              name: 'Verified',
              description: 'ID Verification',
              features: ['Higher limits', 'More features', 'Basic trading'],
              active: false,
            },
            {
              name: 'Advanced',
              description: 'Address & Additional Documents',
              features: ['Highest limits', 'All features', 'Advanced trading'],
              active: false,
            },
          ].map((tier) => (
            <div
              key={tier.name}
              className={`rounded-lg border p-6 ${tier.active ? 'border-blue-500 ring-1 ring-blue-500' : ''}`}
            >
              <div className="space-y-2">
                <h3 className="text-lg font-medium">{tier.name}</h3>
                <p className="text-sm text-muted-foreground">{tier.description}</p>
                <ul className="space-y-2 pt-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center space-x-2">
                      <Icons.check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button variant={tier.active ? 'default' : 'outline'} className="mt-4 w-full">
                  {tier.active ? 'Current Tier' : 'Upgrade'}
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
