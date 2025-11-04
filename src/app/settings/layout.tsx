import { SidebarNav } from '@/components/settings/sidebar-nav';

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/5">
          <SidebarNav />
        </aside>
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
