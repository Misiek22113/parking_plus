'use client';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Dashboard from '@/components/Dashboard/Dashboard';
import { SelectedSlotContext } from '@/context/SelectedSlotContext';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [selectedSlot, setSelectedSlot] = useState(0);

  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <SelectedSlotContext.Provider
          value={{
            selectedSlotNumber: selectedSlot,
            setSelectedSlotNumber: setSelectedSlot,
          }}
        >
          <div className="grid h-full grid-cols-12">
            <div className="col-span-9 h-full items-center justify-items-center">
              {children}
            </div>
            <div className="col-span-3 col-start-10">
              <Dashboard />
            </div>
          </div>
        </SelectedSlotContext.Provider>
      </body>
    </html>
  );
}
