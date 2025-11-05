import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { MainNav } from "@/components/main-nav";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "EcoPreserve - Sustainable Carbon Credits Marketplace",
  description: "Trade and manage carbon credits with transparency and efficiency",
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
      <body className={`${inter.className} antialiased flex flex-col min-h-screen bg-background`}>
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
