import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

export default function ParkingPlace() {
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
      <CardContent>Click the button to order parking spot</CardContent>
      <CardFooter>
        <Button>Order</Button>
      </CardFooter>
    </Card>
  );
}
