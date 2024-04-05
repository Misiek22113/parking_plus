import Image from 'next/image';
import PARKING_ICON from '../../assets/icons/square-parking.svg';
import { useContext } from 'react';
import { SelectedSlotContext } from '@/context/SelectedSlotContext';

const ParkingSlotData = () => {
  const { selectedSlotNumber } = useContext(SelectedSlotContext);

  return (
    <div className="h-full">
      {selectedSlotNumber !== 0 ? (
        <div className="grid grid-cols-5">
          <div className="col-span-2">{selectedSlotNumber}</div>
        </div>
      ) : (
        <Image src={PARKING_ICON} alt="Parking Icon" />
      )}
    </div>
  );
};

export default ParkingSlotData;
