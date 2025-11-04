import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Profile & Preferences</h1>
        <p className="text-muted-foreground">Manage your profile information and preferences</p>
      </div>

      <div className="space-y-8 max-w-2xl">
        <section className="space-y-6 border-b pb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Profile Information</h2>
          </div>
          
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">Change Photo</Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="user@example.com" disabled />
              <p className="text-xs text-muted-foreground">Contact support to change your email</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <select
                id="role"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                defaultValue="user"
              >
                <option value="user">User</option>
                <option value="developer">Project Developer</option>
                <option value="verifier">Verifier</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end pt-2">
            <Button>Save Changes</Button>
          </div>
        </section>

        <section className="space-y-6 border-b pb-6">
          <h2 className="text-lg font-medium">Wallet Settings</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-1">Connected Wallet</p>
              <div className="flex items-center space-x-2">
                <div className="px-3 py-2 bg-muted rounded-md text-sm font-mono">0x12F9...A5C</div>
                <Button variant="outline" size="sm">Disconnect</Button>
                <Button variant="outline" size="sm">Switch Wallet</Button>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6 border-b pb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium">KYC / Verification</h2>
              <p className="text-sm text-muted-foreground">Complete verification to unlock all features</p>
            </div>
            <div className="flex items-center">
              <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">
                Not Completed
              </span>
            </div>
          </div>
          
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">KYC Requirements:</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <span className="mr-2">•</span>
                <span>Government ID</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>
                <span>Address Proof</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>
                <span>Selfie Verification</span>
              </li>
            </ul>
            <Button>Start KYC Verification</Button>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-lg font-medium">Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive email notifications</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Transaction Alerts</p>
                <p className="text-sm text-muted-foreground">Get notified about transactions</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Market Updates</p>
                <p className="text-sm text-muted-foreground">Get the latest market news</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
