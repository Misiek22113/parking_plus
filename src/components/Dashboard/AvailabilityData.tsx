import { useContext, useEffect, useState } from 'react';
import ParkingSlotCount from '../ParkingSlotCount/ParkingSlotCount';
import Image from 'next/image';
import BAR_CHART_ICON from '../../../public/icons/bar-chart-big.svg';
import { ParkingSpacesContext } from '@/context/ParkingSpacesContext';
import { parkingSpaceStatusEnum } from '@/constants/enumConstants';
import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '../ui/button';
import { logout } from '@/app/actions';
import ActionsTable from './ActionsTable';

const AvailabilityData = () => {
  const { parkingSpaces } = useContext(ParkingSpacesContext);
  const [errorMessageLogout, dispatchLogout] = useFormState(logout, undefined);
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
          <ActionsTable />
          <div className="flex min-h-12 items-center gap-4">
            <div className="flex h-full items-center justify-center rounded-lg bg-white px-4 text-center text-lg font-bold text-black">
              <h2>{ctime}</h2>
            </div>
            <form action={dispatchLogout} className="h-full">
              <LogoutButton />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AvailabilityData;

const LogoutButton = () => {
  const { pending } = useFormStatus();

  const handleClick = (event: any) => {
    if (pending) {
      event.preventDefault();
    }
  };

  return (
    <Button
      aria-disabled={pending}
      type="submit"
      onClick={handleClick}
      className="h-full bg-white text-center text-lg font-bold text-black hover:text-white"
    >
      Logout
    </Button>
  );
};
