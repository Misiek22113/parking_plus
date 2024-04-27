import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableCaption,
} from '@/components/ui/table';

export default function Home() {
  return (
    <div className="grid h-full w-full grid-flow-col grid-rows-2 gap-4 p-16">
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
      <Card title="Account funds">
        <CardHeader>
          <CardTitle>Add funds to your account</CardTitle>
          <CardDescription>
            Your fundings are used to pay for parking spots. You can add funds
            to the account here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          Select the payment method to add funds to your account
        </CardContent>
        <CardFooter className="flex gap-4">
          <Button>Demo</Button>
          <Button disabled>Google Pay</Button>
          <Button disabled>BLIK</Button>
        </CardFooter>
      </Card>
      <Card title="Account info" className="row-span-2">
        <CardHeader className=" bg-muted">
          <CardTitle>Your account information</CardTitle>
          <CardDescription>
            All of your account information is stored here. You can see your ID,
            balance and other information.
            <p className="pt-2 text-lg">Your account ID: 123456</p>
          </CardDescription>
        </CardHeader>
        <CardContent className="h-1/2 pt-4">
          <p className="text-lg">Your account balance</p>
          <p className="py-2 text-4xl font-bold">100 PLN</p>
          <Separator className="my-4" />
          <p className="text-lg">Your account history</p>
          <ScrollArea className="h-full">
            <Table>
              <TableCaption>A list of your recent reservations.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Reservation</TableHead>
                  <TableHead>Spot</TableHead>
                  <TableHead>Car license</TableHead>
                  <TableHead>Time spent</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 10 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">1239012</TableCell>
                    <TableCell>17</TableCell>
                    <TableCell>CT2180X</TableCell>
                    <TableCell>1h 37min</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
