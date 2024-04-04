import ParkingSlot from '@/components/ParkingSlot/ParkingSlot';

export default function Home() {
  const parkingSlots = [
    {
      isAvailable: true,
      slotNumber: 1,
    },
    {
      isAvailable: false,
      slotNumber: 2,
    },
    {
      isAvailable: true,
      slotNumber: 3,
    },
    {
      isAvailable: true,
      slotNumber: 4,
    },
    {
      isAvailable: false,
      slotNumber: 5,
    },
    {
      isAvailable: true,
      slotNumber: 6,
    },
    {
      isAvailable: true,
      slotNumber: 7,
    },
    {
      isAvailable: false,
      slotNumber: 8,
    },
    {
      isAvailable: true,
      slotNumber: 9,
    },
    {
      isAvailable: true,
      slotNumber: 10,
    },
    {
      isAvailable: false,
      slotNumber: 11,
    },
    {
      isAvailable: true,
      slotNumber: 12,
    },
    {
      isAvailable: true,
      slotNumber: 13,
    },
    {
      isAvailable: false,
      slotNumber: 14,
    },
    {
      isAvailable: true,
      slotNumber: 15,
    },
    {
      isAvailable: true,
      slotNumber: 16,
    },
    {
      isAvailable: false,
      slotNumber: 17,
    },
    {
      isAvailable: true,
      slotNumber: 18,
    },
    {
      isAvailable: true,
      slotNumber: 19,
    },
    {
      isAvailable: false,
      slotNumber: 20,
    },
    {
      isAvailable: true,
      slotNumber: 21,
    },
    {
      isAvailable: true,
      slotNumber: 22,
    },
    {
      isAvailable: false,
      slotNumber: 23,
    },
    {
      isAvailable: true,
      slotNumber: 24,
    },
    {
      isAvailable: true,
      slotNumber: 25,
    },
    {
      isAvailable: false,
      slotNumber: 26,
    },
    {
      isAvailable: true,
      slotNumber: 27,
    },
    {
      isAvailable: true,
      slotNumber: 28,
    },
    {
      isAvailable: false,
      slotNumber: 29,
    },
    {
      isAvailable: true,
      slotNumber: 30,
    },
    {
      isAvailable: true,
      slotNumber: 31,
    },
    {
      isAvailable: false,
      slotNumber: 32,
    },
    {
      isAvailable: true,
      slotNumber: 33,
    },
    {
      isAvailable: true,
      slotNumber: 34,
    },
    {
      isAvailable: false,
      slotNumber: 35,
    },
    {
      isAvailable: true,
      slotNumber: 36,
    },
    {
      isAvailable: true,
      slotNumber: 37,
    },
    {
      isAvailable: false,
      slotNumber: 38,
    },
    {
      isAvailable: true,
      slotNumber: 39,
    },
    {
      isAvailable: true,
      slotNumber: 40,
    },
    {
      isAvailable: false,
      slotNumber: 41,
    },
    {
      isAvailable: true,
      slotNumber: 42,
    },
    {
      isAvailable: true,
      slotNumber: 43,
    },
    {
      isAvailable: false,
      slotNumber: 44,
    },
    {
      isAvailable: true,
      slotNumber: 45,
    },
    {
      isAvailable: true,
      slotNumber: 46,
    },
    {
      isAvailable: false,
      slotNumber: 47,
    },
    {
      isAvailable: true,
      slotNumber: 48,
    },
    {
      isAvailable: true,
      slotNumber: 49,
    },
    {
      isAvailable: false,
      slotNumber: 50,
    },
  ];

  return (
    <main className="flex items-center justify-center">
      <div className="grid grid-cols-10 gap-2 px-20 py-10 ">
        {parkingSlots.map((slot) => (
          <ParkingSlot key={slot.slotNumber} {...slot} />
        ))}
      </div>
    </main>
  );
}
