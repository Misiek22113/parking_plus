import ParkingSlotCount from '../ParkingSlotCount/ParkingSlotCount';

const Dashboard = () => {
  return (
    <div className="h-full">
      <div className="flex flex-col gap-4 bg-[#374151] py-5">
        <ParkingSlotCount parkingSlotCount={10} isAvailableSlotCount={true} />
        <ParkingSlotCount parkingSlotCount={5} isAvailableSlotCount={false} />
      </div>
      <div className="h-full bg-[#4B5563]">
        <h1>GÓWNO</h1>
      </div>
    </div>
  );
};

export default Dashboard;
