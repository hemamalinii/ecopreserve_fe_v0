import type { Metadata } from "next";
import { Josefin_Slab, Montserrat } from 'next/font/google';
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { MainNav } from "@/components/main-nav";
import { Toaster } from "@/components/ui/toaster";

const josefinSlab = Josefin_Slab({ subsets: ['latin'], variable: '--font-josefin-slab' });
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });

export const metadata: Metadata = {
  title: "carbonready.earth - Sustainable Carbon Credits Marketplace",
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
      <body className={`${josefinSlab.variable} ${montserrat.variable} min-h-screen bg-background font-sans antialiased`}>
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
