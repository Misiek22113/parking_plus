import ParkingPlace from './_components/parking-place/ParkingPlace';
import AccountFunds from './_components/account-funds/AccountFunds';
import AccountInfo from './_components/account-info/AccountInfo';
import AccountCars from './_components/account_cars/AccountCars';
import getCars from '@/app/actions';

export default async function Home() {
  const cars = await getCars();

  return (
    <div className="relative grid h-screen w-full grid-cols-2 gap-4 overflow-hidden p-16">
      <div className="flex h-full w-full flex-col gap-4">
        <ParkingPlace />
        <AccountCars carList={cars} />
        <AccountFunds />
      </div>
      <AccountInfo />
    </div>
  );
}
