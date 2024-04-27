'use client';

import { orderParkingSpace, cancelParkingSpace } from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useFormState, useFormStatus } from 'react-dom';

export default function ParkingPlace() {
  const [errorMessageOrder, dispatchOrder] = useFormState(
    orderParkingSpace,
    undefined
  );
  const [errorMessageCancel, dispatchCancel] = useFormState(
    cancelParkingSpace,
    undefined
  );

  return (
    <Card title="Parking places">
      <CardHeader>
        <CardTitle>Order parking place</CardTitle>
        <CardDescription>
          In order to park your car, you need to order a parking spot. You can
          do it here. The parking spot will be reserved for you till the time
          you leave the parking lot. The parking spot will be picked
          automatically for you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Separator className="my-4" />
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-5">
            <p className="text-lg">Order place for your car</p>
            <CardDescription className="pb-4">
              Select the parking lot you want to park in:
            </CardDescription>
            <form action={dispatchOrder}>
              <Select name="selectedCar">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a car" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Your cars</SelectLabel>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <SelectItem key={index} value={`car-${index}`}>
                        Car {index}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <OrderButton />
            </form>
          </div>
          <Separator className="col-span-2 mx-4" orientation="vertical" />
          <div className="col-span-5">
            <p className="text-lg">Cancel the reservation</p>
            <CardDescription className="pb-4">
              Use this only if your car is not in the parking, either way
              parking fee will be charged.
            </CardDescription>
            <form action={dispatchCancel}>
              <Select name="selectedReservation">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a reservation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Your current reservations</SelectLabel>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <SelectItem key={index} value={`reservation-${index}`}>
                        Reservation {index}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <CancelButton />
            </form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const OrderButton = () => {
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
      className="mt-4"
    >
      Order
    </Button>
  );
};

const CancelButton = () => {
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
      className="mt-4"
      variant="destructive"
    >
      Cancel
    </Button>
  );
};
