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
      <body className={`${inter.className}`}>
        <div className="grid h-full grid-cols-12">
          <div className="col-span-9">{children}</div>
          <div className="col-span-3 col-start-10">
            <Dashboard />
          </div>
        </div>
      </body>
    </html>
  );
}
