'use client';

import { addCar, getCars, removeCar } from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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

export default function AccountCars() {
  const { toast } = useToast();
  const { carsList, setCarsList } = useContext(CarsListContext);
  const [errorAdd, dispatchAdd] = useFormState(addCar, undefined);
  const [errorRemove, dispatchRemove] = useFormState(removeCar, undefined);

  useEffect(() => {
    if (errorAdd?.isSuccessful || errorRemove?.isSuccessful) {
      getCars().then((cars) => setCarsList(cars));
    }
    if (errorAdd && !errorAdd.isSuccessful) {
      console.log(errorAdd?.message);
      toast({
        variant: 'destructive',
        title: 'Failed to add car',
        description: errorAdd?.message,
      });
    }
    if (errorRemove && !errorRemove.isSuccessful) {
      toast({
        variant: 'destructive',
        title: 'Failed to remove car',
        description: errorRemove?.message,
      });
    }
  }, [errorAdd, errorRemove, setCarsList]);

  return (
    <Card title="Manage cars">
      <CardHeader>
        <CardTitle>Manage your cars</CardTitle>
        <CardDescription>
          Here you can manage your cars. You can add a new car or remove an
          existing one.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Separator className="my-4" />
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-5">
            <p className="text-lg">Add a car</p>
            <CardDescription className="pb-4">
              Input your car&apos;s license plate to add it to your account.
            </CardDescription>
            <form action={dispatchAdd}>
              <Input placeholder="Car license plate" name="addedCar" />
              <AddButton />
            </form>
          </div>
          <Separator className="col-span-2 mx-4" orientation="vertical" />
          <div className="col-span-5">
            <p className="text-lg">Remove a car</p>
            <CardDescription className="pb-4">
              Select the car you want to remove from your account.
            </CardDescription>
            <form action={dispatchRemove}>
              <Select name="removedCar">
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
              <RemoveButton />
            </form>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-4"></CardFooter>
    </Card>
  );
}

const AddButton = () => {
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
      Add
    </Button>
  );
};

const RemoveButton = () => {
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
      Remove
    </Button>
  );
};
