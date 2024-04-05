'use client';

import { SelectedSlotContext } from '@/context/SelectedSlotContext';
import { useContext } from 'react';

export type ParkingSlotProps = {
  isAvailable: boolean;
  slotNumber: number;
};

const ParkingSlot = ({ isAvailable, slotNumber }: ParkingSlotProps) => {
  const { selectedSlotNumber, setSelectedSlotNumber } =
    useContext(SelectedSlotContext);

  const setIsSelected = () => {
    setSelectedSlotNumber(selectedSlotNumber === slotNumber ? 0 : slotNumber);
  };

  return (
    <div
      className={`flex min-h-28 max-w-20 cursor-pointer items-center justify-center rounded-lg text-5xl ${isAvailable ? ' bg-teal-500' : 'bg-red-500'} 
      ${selectedSlotNumber === slotNumber && 'border-4'}`}
      onClick={setIsSelected}
    >
      {slotNumber}
    </div>
  );
};

export default ParkingSlot;
