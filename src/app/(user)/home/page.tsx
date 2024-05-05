'use client';
import ParkingPlace from './_components/parking-place/ParkingPlace';
import AccountFunds from './_components/account-funds/AccountFunds';
import AccountInfo from './_components/account-info/AccountInfo';
import AccountCars from './_components/account_cars/AccountCars';
import { getCars, getUserCredits, getUserParkingActions } from '@/app/actions';
import { useEffect, useState } from 'react';
import { CarsListContext } from '@/context/CarsListContext';
import { AccountInfoContext } from '@/context/AccountInfoContext';
import { FetchUser } from '@/models/User';
import { FetchCar } from '@/models/Car';
import { ParkingActionsContext } from '@/context/ParkingActionsContext';
import { FetchParkingAction } from '@/models/ParkingActions';

export default function Home() {
  const [carsList, setCarsList] = useState<FetchCar[]>([]);
  const [accountInfo, setAccountInfo] = useState<FetchUser>({} as FetchUser);
  const [parkingActions, setParkingActions] = useState<FetchParkingAction[]>(
    []
  );
  const [hasPendingPayments, setHasPendingPayments] = useState(false);

  useEffect(() => {
    getCars().then((cars) => setCarsList(cars));
    getUserCredits().then((userInfo) => setAccountInfo(userInfo));
    getUserParkingActions().then((actions) => {
      setParkingActions(actions);
      setHasPendingPayments(
        actions.some((action) => action.status === 'pending')
      );
    });
  }, [setCarsList, setAccountInfo]);

  return (
    <AccountInfoContext.Provider value={{ accountInfo, setAccountInfo }}>
      <CarsListContext.Provider value={{ carsList, setCarsList }}>
        <ParkingActionsContext.Provider
          value={{ parkingActions, setParkingActions }}
        >
          <div className="relative grid h-screen w-full grid-cols-2 gap-4 overflow-x-hidden p-16 max-lg:grid-cols-1">
            <div className="flex h-full w-full flex-col gap-4">
              {hasPendingPayments ? (
                <div className="rounded-lg bg-red-500 p-4 text-white">
                  You have pending payments. Please pay them to continue using
                  the service.
                </div>
              ) : (
                <>
                  {carsList.length > 0 && (
                    <>
                      <ParkingPlace
                        setHasPendingPayments={setHasPendingPayments}
                      />
                      <AccountCars />
                    </>
                  )}
                </>
              )}
              <AccountFunds />
            </div>
            <AccountInfo />
          </div>
        </ParkingActionsContext.Provider>
      </CarsListContext.Provider>
    </AccountInfoContext.Provider>
  );
}
