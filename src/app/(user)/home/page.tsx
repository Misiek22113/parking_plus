import ParkingPlace from './_components/parking-place/AccountPlace';
import AccountFunds from './_components/account-funds/AccountFunds';
import AccountInfo from './_components/account-info/AccountInfo';

export default function Home() {
  return (
    <div className="grid h-full w-full grid-flow-col grid-rows-2 gap-4 p-16">
      <ParkingPlace />
      <AccountFunds />
      <AccountInfo />
    </div>
  );
}
