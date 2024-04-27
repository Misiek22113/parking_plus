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
import { useFormState, useFormStatus } from 'react-dom';

export default function AccountInfo() {
  const [errorMessageLogout, dispatchLogout] = useFormState(logout, undefined);

  return (
    <Card title="Account info" className="row-span-3 h-full overflow-hidden">
      <CardHeader className="h-min bg-muted">
        <CardTitle>Your account information</CardTitle>
        <CardDescription>
          All of your account information is stored here. You can see your ID,
          balance and other information.
          <p className="pt-2 text-lg">Your account ID: 123456</p>
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-4 h-1/2">
        <p className="text-lg">Your account balance</p>
        <p className="py-2 text-4xl font-bold">100 PLN</p>
        <Separator className="my-4" />
        <p className="text-lg">Your reservations history</p>
        <ScrollArea className="h-full">
          <Table>
            <TableCaption>A list of your recent reservations.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Reservation</TableHead>
                <TableHead>Spot</TableHead>
                <TableHead>Car license</TableHead>
                <TableHead>Time spent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 20 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">1239012</TableCell>
                  <TableCell>17</TableCell>
                  <TableCell>CT2180X</TableCell>
                  <TableCell>1h 37min</TableCell>
                  <TableCell>
                    <Badge variant={index === 0 ? 'default' : 'outline'}>
                      {index === 0 ? 'Active' : 'Paid'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
        <Separator className="my-4" />
        <p className="text-lg">Account settings</p>
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
