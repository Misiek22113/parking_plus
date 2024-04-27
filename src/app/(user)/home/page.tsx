import ParkingPlace from './_components/parking-place/AccountPlace';
import AccountFunds from './_components/account-funds/AccountFunds';
import AccountInfo from './_components/account-info/AccountInfo';
import AccountCars from './_components/account_cars/page';

export default function Home() {
  return (
    <div className="grid h-full w-full grid-cols-2 gap-4 p-16">
      <div className="flex h-full w-full flex-1 flex-col gap-4">
        <ParkingPlace />
        <AccountCars />
        <AccountFunds />
      </div>
      <AccountInfo />
    </div>
  );
}
