import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { calculateAmount, getTimeSpent } from '@/lib/utils';
import { FetchParkingAction } from '@/models/ParkingAction';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useContext, useEffect, useState } from 'react';
import { AccountInfoContext } from '@/context/AccountInfoContext';
import { useFormState, useFormStatus } from 'react-dom';
import { payParking } from '@/app/actions';
import { useToast } from '@/components/ui/use-toast';
import { ParkingActionsContext } from '@/context/ParkingActionsContext';
import { parkingActionStatusEnum } from '@/constants/enumConstants';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { parkingCostArray } from '@/constants/parkingConstants';
import QrCodeDialog from './QrCodeDialog';

export default function Payment({
  pendingPayment,
  shouldShowPaymentButton = false,
  shouldShowQrCode = false,
  setPendingPayment,
}: {
  pendingPayment: FetchParkingAction;
  shouldShowPaymentButton?: boolean;
  shouldShowQrCode?: boolean;
  setPendingPayment: (value: FetchParkingAction | undefined) => void;
}) {
  const { toast } = useToast();
  const [currentTime, setCurrentTime] = useState(new Date());
  const { accountInfo, setAccountInfo } = useContext(AccountInfoContext);
  const { parkingActions, setParkingActions } = useContext(
    ParkingActionsContext
  );
  const [errorPay, dispatchPayPayment] = useFormState(payParking, undefined);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (errorPay && errorPay.isSuccessful && errorPay.data) {
      setAccountInfo({
        ...accountInfo,
        credits: errorPay.data.newUserCredits,
      });
      setPendingPayment(undefined);
      toast({
        variant: 'success',
        title: 'Success',
        description: 'Payment successful.',
      });
      setParkingActions(
        parkingActions.map((action) => {
          if (errorPay.data && action._id === errorPay.data.parkingActionId) {
            return {
              ...action,
              leaveTime: currentTime,
              status: parkingActionStatusEnum.paid,
            };
          }
          return action;
        })
      );
    }
    if (errorPay && !errorPay.isSuccessful) {
      toast({
        variant: 'destructive',
        title: 'Failed to pay for parking.',
        description: errorPay?.message,
      });
    }
    if (errorPay && errorPay.isSuccessful && errorPay.data) {
    }
  }, [errorPay]);

  return (
    <Card title="Pending Payment">
      <form action={dispatchPayPayment}>
        <CardHeader>
          <CardTitle>Your current parking information</CardTitle>
          <CardDescription>
            You have parked in the parking lot. Please pay for your spot before
            leaving.
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="mt-4">
          <div className="flex gap-8">
            <div className="grid w-1/2 items-center gap-1.5">
              <Label htmlFor="spot">Spot</Label>
              <Input
                name="spot"
                type="text"
                id="spot"
                readOnly
                value={pendingPayment.parkingSpaceNumber}
              />
            </div>
            <div className="grid w-1/2 items-center gap-1.5">
              <Label htmlFor="car-license">Car license</Label>
              <Input
                type="text"
                id="car-license"
                name="carLicense"
                readOnly
                value={pendingPayment.carRegistrationPlate}
              />
            </div>
          </div>
          <div className="flex gap-8 pt-4">
            <div className="grid w-1/2 items-center gap-1.5">
              <Label htmlFor="time-spent">Current time spent</Label>
              <Input
                type="text"
                id="time-spent"
                name="timeSpent"
                readOnly
                value={getTimeSpent(pendingPayment.parkTime, currentTime)}
              />
            </div>
            <div className="grid w-1/2 items-center gap-1.5">
              <Label htmlFor="current-amount">Current amount</Label>
              <Input
                type="text"
                id="current-amount"
                name="currentAmount"
                readOnly
                value={`${calculateAmount(pendingPayment.parkTime, currentTime)} PLN`}
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex gap-4">
          {shouldShowPaymentButton && <PayButton />}
          {shouldShowQrCode && (
            <QrCodeDialog parkingActionId={pendingPayment._id} />
          )}
          <PaymentPlanHoverButton />
        </CardFooter>
      </form>
    </Card>
  );
}

const PayButton = () => {
  const { pending } = useFormStatus();

  const handleClick = (event: any) => {
    if (pending) {
      event.preventDefault();
    }
  };

  return (
    <Button aria-disabled={pending} type="submit" onClick={handleClick}>
      Pay
    </Button>
  );
};

export const PaymentPlanHoverButton = () => {
  return (
    <HoverCard>
      <HoverCardTrigger className="flex h-10 items-center rounded-md bg-muted px-4 py-2 text-sm font-medium">
        Payment Plan
      </HoverCardTrigger>
      <HoverCardContent>
        <div>
          <h3>Price per hour in a given range</h3>
        </div>
        <Separator className="mb-2 mt-1" />
        {parkingCostArray.map((costEntry, index) => {
          return (
            <div key={index}>
              <h3>
                {index === 0
                  ? `First ${costEntry.maxTimeSpent}h - ${costEntry.amount} PLN`
                  : index === parkingCostArray.length - 1
                    ? `Next hours - ${costEntry.amount} PLN`
                    : `Next ${costEntry.maxTimeSpent}h - ${costEntry.amount} PLN`}
              </h3>
            </div>
          );
        })}
      </HoverCardContent>
    </HoverCard>
  );
};
