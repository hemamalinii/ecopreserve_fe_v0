'use client';

import { SidebarNav } from '@/components/settings/sidebar-nav';

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-64">
            <SidebarNav />
          </aside>
          <main className="flex-1">
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg shadow-sm p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
