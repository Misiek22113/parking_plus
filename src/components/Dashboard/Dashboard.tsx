import AvailabilityData from './AvailabilityData';
import ParkingSlotData from './ParkingSlotData';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <AvailabilityData />
      <div className="flex flex-1 items-center justify-center bg-[#4B5563]">
        <ParkingSlotData />
      </div>
    </div>
  );
};

export default Dashboard;
