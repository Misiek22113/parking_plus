import Image from 'next/image';
import PARKING_ICON from '../../assets/icons/square-parking.svg';

const ParkingSlotData = () => {
  return (
    <div className="h-full">
      <Image src={PARKING_ICON} alt="Parking Icon" />
    </div>
  );
};

export default ParkingSlotData;
