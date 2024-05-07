'use client';
import { Inter } from 'next/font/google';
import '../../globals.css';
import Dashboard from '@/components/Dashboard/Dashboard';
import { SelectedSlotContext } from '@/context/SelectedSlotContext';
import { useEffect, useState } from 'react';
import { FetchParkingSpace } from '@/models/ParkingSpace';
import { ParkingSpacesContext } from '@/context/ParkingSpacesContext';
import { getParkingSpaces } from '@/app/actions';

const inter = Inter({ subsets: ['latin'] });

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [selectedSlot, setSelectedSlot] = useState(0);
  const [parkingSpaces, setParkingSpaces] = useState<FetchParkingSpace[]>([]);

  useEffect(() => {
    getParkingSpaces().then((spaces) => setParkingSpaces(spaces));

    const interval = setInterval(() => {
      getParkingSpaces().then((spaces) => setParkingSpaces(spaces));
    }, 1000 * 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <SelectedSlotContext.Provider
      value={{
        selectedSlotNumber: selectedSlot,
        setSelectedSlotNumber: setSelectedSlot,
      }}
    >
      <ParkingSpacesContext.Provider
        value={{ parkingSpaces, setParkingSpaces }}
      >
        <div className="grid h-full grid-cols-12">
          <div className="col-span-9 h-full items-center justify-items-center">
            {children}
          </div>
          <div className="col-span-3 col-start-10">
            <Dashboard />
          </div>
        </div>
      </ParkingSpacesContext.Provider>
    </SelectedSlotContext.Provider>
  );
}
