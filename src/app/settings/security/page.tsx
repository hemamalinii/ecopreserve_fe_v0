import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SecurityPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Security Settings</h1>
        <p className="text-muted-foreground">Manage your account security settings</p>
      </div>

      <div className="space-y-8 max-w-2xl">
        <section className="space-y-6 border-b pb-6">
          <h2 className="text-lg font-medium">Two-Factor Authentication</h2>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Add an extra layer of security to your account by enabling two-factor authentication.
            </p>
            <Button>Enable 2FA</Button>
          </div>
        </section>

        <section className="space-y-6 border-b pb-6">
          <h2 className="text-lg font-medium">Change Password</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
              <p className="text-xs text-muted-foreground">Must be at least 8 characters long</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
            <Button>Update Password</Button>
          </div>
        </section>

        <section className="space-y-6 border-b pb-6">
          <h2 className="text-lg font-medium">Login History</h2>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Chrome on macOS</p>
                  <p className="text-sm text-muted-foreground">San Francisco, CA, USA</p>
                  <p className="text-xs text-muted-foreground">Just now</p>
                </div>
                <Button variant="outline" size="sm">This Device</Button>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Safari on iPhone</p>
                  <p className="text-sm text-muted-foreground">New York, NY, USA</p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
                <Button variant="outline" size="sm">Sign out</Button>
              </div>
            </div>
          </div>
          <Button variant="outline">View All Activity</Button>
        </section>

        <section className="space-y-6">
          <h2 className="text-lg font-medium text-red-600">Danger Zone</h2>
          <div className="space-y-4 rounded-lg border border-red-200 bg-red-50 p-4">
            <div>
              <h3 className="font-medium">Delete Account</h3>
              <p className="text-sm text-red-800">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
            </div>
            <Button variant="destructive">Delete Account</Button>
          </div>
        </section>
      </div>
    </div>
  );
}
