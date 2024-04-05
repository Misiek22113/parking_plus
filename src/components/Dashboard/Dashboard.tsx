import ParkingSlotCount from '../ParkingSlotCount/ParkingSlotCount';
import ParkingSlotData from './ParkingSlotData';

const Dashboard = () => {
  return (
    <div className="h-full">
      <div className="flex flex-col gap-4 bg-[#374151] py-5">
        <ParkingSlotCount parkingSlotCount={10} isAvailableSlotCount={true} />
        <ParkingSlotCount parkingSlotCount={5} isAvailableSlotCount={false} />
      </div>
      <div className="flex items-center justify-center bg-[#4B5563]">
        <ParkingSlotData />
      </div>
    </div>
  );
};

export default Dashboard;
