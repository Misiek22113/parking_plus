'use client';
import { logout } from '@/app/actions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { AccountInfoContext } from '@/context/AccountInfoContext';
import { ParkingActionsContext } from '@/context/ParkingActionsContext';
import { useContext } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

export default function AccountInfo() {
  const { accountInfo } = useContext(AccountInfoContext);
  const { parkingActions } = useContext(ParkingActionsContext);
  const [errorMessageLogout, dispatchLogout] = useFormState(logout, undefined);

  const getTimeSpent = (parkTimeEnter: Date, parkTimeLeave: Date) => {
    const differenceMs = parkTimeLeave.getTime() - parkTimeEnter.getTime();
    const hours = Math.floor(differenceMs / (1000 * 60 * 60));
    const minutes = Math.floor((differenceMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const calculateAmount = (parkTimeEnter: Date, parkTimeLeave: Date) => {
    const differenceMs = parkTimeLeave.getTime() - parkTimeEnter.getTime();
    const hours = Math.floor(differenceMs / (1000 * 60 * 60));
    const minutes = Math.floor((differenceMs % (1000 * 60 * 60)) / (1000 * 60));
    return hours * 2;
  };

  return (
    <Card title="Account info" className="row-span-3 h-full overflow-hidden">
      <CardHeader className="h-min bg-muted">
        <CardTitle>Your account information</CardTitle>
        <CardDescription>
          All of your account information is stored here. You can see your
          balance and other information.
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-4 h-1/2">
        <div className="text-lg">Your account balance</div>
        <div className="dy-2 text-4xl font-bold">
          {accountInfo && accountInfo.credits} PLN
        </div>
        <Separator className="my-4" />
        <div className="text-lg">Your reservations history</div>
        <ScrollArea className="h-full">
          <Table>
            <TableCaption>A list of your recent reservations.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Spot</TableHead>
                <TableHead>Car license</TableHead>
                <TableHead>Time spent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {parkingActions.map((parkingAction, index) => (
                <TableRow key={index}>
                  <TableCell>{parkingAction.parkingSpaceNumber}</TableCell>
                  <TableCell>{parkingAction.carRegistrationPlate}</TableCell>
                  <TableCell>
                    {parkingAction.leaveTime
                      ? getTimeSpent(
                          parkingAction.parkTime,
                          parkingAction.leaveTime
                        )
                      : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        parkingAction.status === 'pending'
                          ? 'default'
                          : 'outline'
                      }
                    >
                      {parkingAction.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {parkingAction.leaveTime === null
                      ? 'N/A'
                      : calculateAmount(
                          parkingAction.parkTime,
                          parkingAction.leaveTime
                        )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
        <Separator className="my-4" />
        <div className="text-lg">Account settings</div>
        <form action={dispatchLogout}>
          <LogoutButton />
        </form>
      </CardContent>
    </Card>
  );
}

const LogoutButton = () => {
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
      Logout
    </Button>
  );
};
