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
      className={`flex min-h-28 max-w-28 cursor-pointer items-center justify-center rounded-lg text-3xl font-medium transition-all duration-200 ease-in-out ${isAvailable ? ' border-teal-900 bg-teal-500' : 'border-red-900 bg-red-500'} 
      ${selectedSlotNumber === slotNumber && 'border-8'}`}
      onClick={setIsSelected}
    >
      {slotNumber}
    </div>
  );
};

export default ParkingSlot;
