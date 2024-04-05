type ParkingSlotCountProps = {
  parkingSlotCount: number;
  isAvailableSlotCount: boolean;
};

const ParkingSlotCount = ({
  parkingSlotCount,
  isAvailableSlotCount,
}: ParkingSlotCountProps) => {
  return (
    <div className="grid grid-cols-5">
      <div className="col-span-4 flex items-center justify-center rounded-l-lg bg-white px-4 text-center text-2xl text-black">
        {isAvailableSlotCount
          ? 'Ilość wolnych miejsc: '
          : 'Ilość zajętych miejsc:'}
      </div>
      <div
        className={`flex items-center justify-center self-center rounded-r-lg px-1 text-5xl ${isAvailableSlotCount ? ' bg-teal-500' : 'bg-red-500'}`}
      >
        {parkingSlotCount}
      </div>
    </div>
  );
};

export default ParkingSlotCount;
