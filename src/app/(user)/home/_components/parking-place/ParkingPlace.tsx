'use client';
import { orderParkingSpace } from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
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
import { CarsListContext } from '@/context/CarsListContext';
import { useContext, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useToast } from '@/components/ui/use-toast';

export default function ParkingPlace() {
  const { toast } = useToast();
  const { carsList } = useContext(CarsListContext);
  const [errorOrder, dispatchOrder] = useFormState(
    orderParkingSpace,
    undefined
  );

  useEffect(() => {
    if (errorOrder && !errorOrder.isSuccessful) {
      toast({
        variant: 'destructive',
        title: 'Failed to order parking space',
        description: errorOrder?.message,
      });
    }
  }, [errorOrder]);

  return (
    <Card title="Parking places" className="relative">
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
        <div className="grid grid-cols-1 gap-4">
          <div className="col-span-1">
            <p className="text-lg">Order place for your car</p>
            <CardDescription className="pb-4">
              Select the car you want to park:
            </CardDescription>
            <form action={dispatchOrder}>
              <Select name="selectedCar">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a car" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Your cars</SelectLabel>
                    {Array.isArray(carsList) &&
                      carsList.map((car, index) => (
                        <SelectItem key={index} value={`${car._id}`}>
                          {car.registrationPlate}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <OrderButton />
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
