import { useContext, useEffect, useState } from 'react';
import ParkingSlotCount from '../ParkingSlotCount/ParkingSlotCount';
import Image from 'next/image';
import BAR_CHART_ICON from '../../assets/icons/bar-chart-big.svg';
import { ParkingSpacesContext } from '@/context/ParkingSpacesContext';
import { parkingSpaceStatusEnum } from '@/constants/enumConstants';

const AvailabilityData = () => {
  const { parkingSpaces } = useContext(ParkingSpacesContext);
  let time = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  const [ctime, setTime] = useState(time);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4 bg-[#374151] px-5 py-5">
        <ParkingSlotCount
          parkingSlotCount={
            parkingSpaces.filter(
              (space) => space.status === parkingSpaceStatusEnum.free
            ).length
          }
          isAvailableSlotCount={true}
        />
        <ParkingSlotCount
          parkingSlotCount={
            parkingSpaces.filter(
              (space) => space.status === parkingSpaceStatusEnum.occupied
            ).length
          }
          isAvailableSlotCount={false}
        />
        <div className="flex justify-between">
          <div className="flex min-h-12 min-w-12 items-center justify-center rounded-lg bg-white">
            <Image src={BAR_CHART_ICON} alt="Parking" />
          </div>
          <div className="flex items-center justify-center rounded-lg bg-white px-8 text-center text-lg font-bold text-black">
            {ctime}
          </div>
        </div>
      </div>
    </>
  );
};

export default AvailabilityData;
