import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { MainNav } from "@/components/main-nav";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "carbonready.earth - Sustainable Carbon Credits Marketplace",
  description: "Buy, sell, and retire verified carbon credits on our transparent marketplace",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="min-h-screen bg-background poiret-one-regular antialiased">
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <MainNav />
            <main className="flex-1">
              {children}
            </main>
            <Toaster />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
