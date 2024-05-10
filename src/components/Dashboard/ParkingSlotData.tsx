'use client';

import Image from 'next/image';
import PARKING_ICON from '../../../public/icons/square-parking.svg';
import { useContext, useEffect, useState } from 'react';
import { SelectedSlotContext } from '@/context/SelectedSlotContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { getParkingSpaceInfo } from '@/app/actions';
import ParkingSpaceInfo from '@/app/interfaces/ParkingSpaceInfo';
import { CAR_IMAGES } from '@/constants/imagesConstants';

const ParkingSlotData = () => {
  const { selectedSlotNumber } = useContext(SelectedSlotContext);
  const [parkingSpotData, setParkingSpotData] = useState<ParkingSpaceInfo>({
    carRegistrationPlate: null,
    parkTime: null,
  });
  const isSpaceOccupied = parkingSpotData.carRegistrationPlate !== null;

  const getParkingSpaceInfoHeader = () => {
    if (selectedSlotNumber === 0) {
      return 'No slot selected';
    } else if (parkingSpotData.carRegistrationPlate === null) {
      return 'Slot is empty';
    } else {
      return parkingSpotData.carRegistrationPlate;
    }
  };

  useEffect(() => {
    async function fetchData() {
      if (selectedSlotNumber !== 0) {
        const data = await getParkingSpaceInfo(selectedSlotNumber);
        setParkingSpotData({
          carRegistrationPlate: data.carRegistrationPlate,
          parkTime: data.parkTime,
        });
      }
    }

    fetchData();
  }, [selectedSlotNumber]);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-12">
      <div className="flex w-full flex-row justify-center overflow-hidden">
        {selectedSlotNumber === 0 ? (
          <></>
        ) : (
          <Card
            title="Parking Slot"
            className={`relative border-8 border-white p-4 text-white ${isSpaceOccupied === null ? 'bg-teal-500' : 'bg-red-500'}`}
          >
            <div className="text-center text-3xl font-bold">
              {selectedSlotNumber}
            </div>
            <div className="absolute h-full w-4 bg-white -right-4 -top-4 py-20"></div>
          </Card>
        )}
        <Card title="Parking Slot" className="border-8 border-white p-4">
          <div className="text-center text-3xl">
            {getParkingSpaceInfoHeader()}
          </div>
        </Card>
      </div>
      {selectedSlotNumber !== 0 &&
      parkingSpotData.carRegistrationPlate !== null ? (
        <>
          <Card className="w-min whitespace-nowrap">
            <CardHeader>
              <CardTitle className="text-center">Time of entrance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-4xl">
                {parkingSpotData.parkTime?.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <CardDescription className="text-center text-lg">
                {parkingSpotData.parkTime?.toLocaleDateString()}
              </CardDescription>
            </CardFooter>
          </Card>
          <Image
            src={
              CAR_IMAGES[
                ((parkingSpotData.carRegistrationPlate.charCodeAt(0) +
                  parkingSpotData.carRegistrationPlate.charCodeAt(2)) %
                  18) +
                  1
              ]
            }
            width={500}
            height={50}
            className=" w-4/5 rounded-lg"
            alt="Parking Icon"
          />
        </>
      ) : (
        <Image src={PARKING_ICON} alt="Parking Icon" />
      )}
    </div>
  );
};

export default ParkingSlotData;
