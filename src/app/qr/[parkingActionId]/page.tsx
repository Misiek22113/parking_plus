'use client';

import Payment from '@/app/(user)/home/_components/payment/Payment';
import { getPendingPayment } from '@/app/actions';
import { FetchParkingAction } from '@/models/ParkingAction';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LoaderCircle } from 'lucide-react';

export default function QrPage() {
  const params = useParams<{ parkingActionId: string }>();
  const [pendingPayment, setPendingPayment] = useState<FetchParkingAction>();
  const [isFetching, setIsFetching] = useState<boolean>(true);

  useEffect(() => {
    getPendingPayment(params.parkingActionId).then((data) => {
      if (data.isSuccessful && data.data) {
        setPendingPayment(data.data);
      }
      setIsFetching(false);
    });
  }, [params.parkingActionId]);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-800">
      {isFetching ? (
        <LoaderCircle className="text-white animate-spin" size={64} />
      ) : (
        <>
          {pendingPayment ? (
            <Payment
              pendingPayment={pendingPayment}
              setPendingPayment={setPendingPayment}
            />
          ) : (
            <div className="rounded-lg bg-red-800 p-4 text-white">
              Invalid or expired QR code.
            </div>
          )}
        </>
      )}
    </div>
  );
}
