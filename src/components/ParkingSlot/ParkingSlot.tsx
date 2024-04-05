'use client';
export type ParkingSlotProps = {
  isAvailable: boolean;
  slotNumber: number;
};

const ParkingSlot = ({ isAvailable, slotNumber }: ParkingSlotProps) => {
  const setIsSelected = () => {
    console.log('Slot number:', slotNumber);
  };

  return (
    <div
      className={`flex min-h-28 max-w-20 items-center justify-center rounded-lg text-5xl ${isAvailable ? ' bg-teal-500' : 'bg-red-500'}`}
      onClick={setIsSelected}
    >
      {slotNumber}
    </div>
  );
};

export default ParkingSlot;
