'use client';

import ParkingSlot from '@/components/ParkingSlot/ParkingSlot';
import { ParkingSpacesContext } from '@/context/ParkingSpacesContext';
import { useContext } from 'react';

export default function Dashboard() {
  const { parkingSpaces } = useContext(ParkingSpacesContext);

  return (
    <div className="grid h-full grid-cols-10 gap-4 px-20 py-10 ">
      {parkingSpaces.map((space) => (
        <ParkingSlot key={space.spaceNumber} {...space} />
      ))}
    </div>
  );
}
