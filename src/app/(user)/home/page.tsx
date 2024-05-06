'use client';
import ParkingPlace from './_components/parking-place/ParkingPlace';
import AccountFunds from './_components/account-funds/AccountFunds';
import AccountInfo from './_components/account-info/AccountInfo';
import AccountCars from './_components/account-cars/AccountCars';
import { getCars, getUserCredits, getUserParkingActions } from '@/app/actions';
import { useEffect, useState } from 'react';
import { CarsListContext } from '@/context/CarsListContext';
import { AccountInfoContext } from '@/context/AccountInfoContext';
import { FetchUser } from '@/models/User';
import { FetchCar } from '@/models/Car';
import { ParkingActionsContext } from '@/context/ParkingActionsContext';
import { FetchParkingAction } from '@/models/ParkingAction';
import { parkingActionStatusEnum } from '@/constants/enumConstants';
import Payment from './_components/payment/Payment';

export default function Home() {
  const [carsList, setCarsList] = useState<FetchCar[]>([]);
  const [accountInfo, setAccountInfo] = useState<FetchUser>({} as FetchUser);
  const [parkingActions, setParkingActions] = useState<FetchParkingAction[]>(
    []
  );
  const [pendingPayment, setPendingPayment] = useState<
    FetchParkingAction | undefined
  >();

  useEffect(() => {
    getUserParkingActions().then((actions) => {
      setParkingActions(actions);
      setPendingPayment(
        actions.find(
          (action) => action.status === parkingActionStatusEnum.pending
        )
      );
    });
    getCars().then((cars) => setCarsList(cars));
    getUserCredits().then((userInfo) => setAccountInfo(userInfo));
  }, [setCarsList, setAccountInfo]);

  return (
    <AccountInfoContext.Provider value={{ accountInfo, setAccountInfo }}>
      <CarsListContext.Provider value={{ carsList, setCarsList }}>
        <ParkingActionsContext.Provider
          value={{ parkingActions, setParkingActions }}
        >
          <div className="relative grid h-screen w-full grid-cols-2 gap-4 overflow-x-hidden p-16 max-lg:grid-cols-1">
            <div className="flex h-full w-full flex-col gap-4">
              {pendingPayment !== undefined ? (
                <>
                  <div className="rounded-lg bg-red-800 p-4 text-white">
                    You have pending payments. Please pay them to continue using
                    the service.
                  </div>
                  <Payment
                    pendingPayment={pendingPayment}
                    setPendingPayment={setPendingPayment}
                    shouldShowPaymentButton
                  />
                </>
              ) : (
                <>
                  <ParkingPlace setPendingPayment={setPendingPayment} />
                  <AccountCars />
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
