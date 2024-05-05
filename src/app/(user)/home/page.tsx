'use client';
import ParkingPlace from './_components/parking-place/ParkingPlace';
import AccountFunds from './_components/account-funds/AccountFunds';
import AccountInfo from './_components/account-info/AccountInfo';
import AccountCars from './_components/account_cars/AccountCars';
import { getCars, getUserCredits } from '@/app/actions';
import { useEffect, useState } from 'react';
import { CarsListContext } from '@/context/CarsListContext';
import { AccountInfoContext } from '@/context/AccountInfoContext';
import { FetchUser } from '@/models/User';
import { FetchCar } from '@/models/Car';

export default function Home() {
  const [carsList, setCarsList] = useState<FetchCar[]>([]);
  const [accountInfo, setAccountInfo] = useState<FetchUser>({} as FetchUser);

  const hasPendingPayments = false;

  useEffect(() => {
    getCars().then((cars) => setCarsList(cars));
    getUserCredits().then((userInfo) => setAccountInfo(userInfo));
  }, [setCarsList, setAccountInfo]);

  return (
    <AccountInfoContext.Provider value={{ accountInfo, setAccountInfo }}>
      <CarsListContext.Provider value={{ carsList, setCarsList }}>
        <div className="relative grid h-screen w-full grid-cols-2 gap-4 overflow-x-hidden p-16 max-lg:grid-cols-1">
          <div className="flex h-full w-full flex-col gap-4">
            {hasPendingPayments ? (
              <div className="rounded-lg bg-red-500 p-4 text-white">
                You have pending payments. Please pay them to continue using the
                service.
              </div>
            ) : (
              <>
                <ParkingPlace />
                <AccountCars />
                <AccountFunds />
              </>
            )}
          </div>
          <AccountInfo />
        </div>
      </CarsListContext.Provider>
    </AccountInfoContext.Provider>
  );
}
