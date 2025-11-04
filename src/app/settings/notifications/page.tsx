'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';

type NotificationPreference = {
  id: string;
  label: string;
  description: string;
  email: boolean;
  push: boolean;
  inApp: boolean;
};

export default function NotificationsPage() {
  const [preferences, setPreferences] = useState<NotificationPreference[]>([
    {
      id: 'account',
      label: 'Account Activity',
      description: 'Important updates about your account security',
      email: true,
      push: true,
      inApp: true,
    },
    {
      id: 'transactions',
      label: 'Transactions',
      description: 'Alerts for deposits, withdrawals, and transfers',
      email: true,
      push: true,
      inApp: true,
    },
    {
      id: 'market',
      label: 'Market Updates',
      description: 'News and updates about the market',
      email: true,
      push: false,
      inApp: false,
    },
    {
      id: 'promotions',
      label: 'Promotions',
      description: 'Special offers and promotions',
      email: true,
      push: false,
      inApp: false,
    },
  ]);

  const togglePreference = (id: string, type: 'email' | 'push' | 'inApp') => {
    setPreferences(preferences.map((pref: NotificationPreference) => 
      pref.id === id ? { ...pref, [type]: !pref[type] } : pref
    ));
  };

  return (
    <div className="space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Notification Preferences</h1>
        <p className="text-muted-foreground">
          Manage how you receive notifications
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>Customize your notification preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {preferences.map((pref) => (
              <div key={pref.id} className="space-y-4">
                <div>
                  <h3 className="font-medium">{pref.label}</h3>
                  <p className="text-sm text-muted-foreground">{pref.description}</p>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-5 items-center">
                      <input
                        id={`${pref.id}-email`}
                        type="checkbox"
                        checked={pref.email}
                        onChange={() => togglePreference(pref.id, 'email')}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                    <label htmlFor={`${pref.id}-email`} className="text-sm font-medium">
                      Email
                    </label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex h-5 items-center">
                      <input
                        id={`${pref.id}-push`}
                        type="checkbox"
                        checked={pref.push}
                        onChange={() => togglePreference(pref.id, 'push')}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                    <label htmlFor={`${pref.id}-push`} className="text-sm font-medium">
                      Push Notifications
                    </label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex h-5 items-center">
                      <input
                        id={`${pref.id}-inapp`}
                        type="checkbox"
                        checked={pref.inApp}
                        onChange={() => togglePreference(pref.id, 'inApp')}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                    <label htmlFor={`${pref.id}-inapp`} className="text-sm font-medium">
                      In-App Notifications
                    </label>
                  </div>
                </div>
                <div className="border-t border-gray-200" />
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button>
              <Icons.check className="mr-2 h-4 w-4" />
              Save Preferences
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
          <CardDescription>Manage your email notification settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Marketing Emails</h3>
                <p className="text-sm text-muted-foreground">
                  Receive updates about new features and promotions
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Security Alerts</h3>
                <p className="text-sm text-muted-foreground">
                  Get notified about important security updates
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
