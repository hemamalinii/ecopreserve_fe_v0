import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ecopreserve",
  description: "Ecopreserve application",
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
    <html lang="en" className="h-full">
      <body className="antialiased flex flex-col min-h-screen">
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
