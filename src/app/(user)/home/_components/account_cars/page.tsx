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

export default function AccountCars() {
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
            <form>
              <Input placeholder="Car license plate" />
              <Button className="mt-4">Add</Button>
            </form>
          </div>
          <Separator className="col-span-2 mx-4" orientation="vertical" />
          <div className="col-span-5">
            <p className="text-lg">Remove a car</p>
            <CardDescription className="pb-4">
              Select the car you want to remove from your account.
            </CardDescription>
            <form>
              <Select>
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
            </form>
            <Button className="mt-4" variant="destructive">
              Remove
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-4"></CardFooter>
    </Card>
  );
}
