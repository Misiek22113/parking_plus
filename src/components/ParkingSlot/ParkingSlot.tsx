'use client';

import { parkingSpaceStatusEnum } from '@/constants/enumConstants';
import { SelectedSlotContext } from '@/context/SelectedSlotContext';
import { useContext } from 'react';

export type ParkingSlotProps = {
  status: string;
  spaceNumber: number;
};

const ParkingSlot = ({ status, spaceNumber }: ParkingSlotProps) => {
  const { selectedSlotNumber, setSelectedSlotNumber } =
    useContext(SelectedSlotContext);

  const setIsSelected = () => {
    setSelectedSlotNumber(selectedSlotNumber === spaceNumber ? 0 : spaceNumber);
  };

  return (
    <div
      className={`flex min-h-28 max-w-28 cursor-pointer items-center justify-center rounded-lg text-3xl font-medium transition-all duration-200 ease-in-out ${status === parkingSpaceStatusEnum.free ? ' border-teal-900 bg-teal-500' : 'border-red-900 bg-red-500'} 
      ${selectedSlotNumber === spaceNumber && 'border-8'}`}
      onClick={setIsSelected}
    >
      {spaceNumber}
    </div>
  );
};

export default ParkingSlot;
