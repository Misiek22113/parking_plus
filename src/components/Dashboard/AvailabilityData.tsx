'use client';
import { useEffect, useState } from 'react';
import ParkingSlotCount from '../ParkingSlotCount/ParkingSlotCount';
import Image from 'next/image';
import BAR_CHART_ICON from '../../assets/icons/bar-chart-big.svg';

const AvailabilityData = () => {
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
        <ParkingSlotCount parkingSlotCount={10} isAvailableSlotCount={true} />
        <ParkingSlotCount parkingSlotCount={5} isAvailableSlotCount={false} />
        <div className="flex justify-between">
          <div className="min-h-12 min-w-12 bg-white">
            <Image src={BAR_CHART_ICON} alt="Parking" />
          </div>
          <div className="min-h-12 min-w-12 bg-white text-black">{ctime}</div>
        </div>
      </div>
    </>
  );
};

export default AvailabilityData;
