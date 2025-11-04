'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';

export default function WalletSettingsPage() {
  return (
    <div className="space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Wallet Settings</h1>
        <p className="text-muted-foreground">
          Manage your connected wallets and payment methods
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Connected Wallets</CardTitle>
          <CardDescription>Manage your connected cryptocurrency wallets</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-blue-100 p-3">
                <Icons.wallet className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Ethereum Wallet</p>
                <p className="text-sm text-muted-foreground">0x12F9...A5C</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Disconnect
            </Button>
          </div>

          <div className="pt-4">
            <Button>
              <Icons.plus className="mr-2 h-4 w-4" />
              Connect New Wallet
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>View your recent transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="p-4 text-center text-muted-foreground">
              <p>No recent transactions</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
