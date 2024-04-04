import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Dashboard from '@/components/Dashboard/Dashboard';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Parking Plus',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`h-screen ${inter.className}`}>
        <div className="flex h-full flex-row justify-between">
          {children}
          <Dashboard />
        </div>
      </body>
    </html>
  );
}
