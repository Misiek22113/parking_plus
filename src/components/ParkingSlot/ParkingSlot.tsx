export type ParkingSlotProps = {
  isAvailable: boolean;
  slotNumber: number;
};

const ParkingSlot = ({ isAvailable, slotNumber }: ParkingSlotProps) => {
  return (
    <div
      className={`flex min-h-28 max-w-20 items-center justify-center rounded-lg text-5xl ${isAvailable ? ' bg-teal-500' : 'bg-red-500'}`}
    >
      {slotNumber}
    </div>
  );
};

export default ParkingSlot;
