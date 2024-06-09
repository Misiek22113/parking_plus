import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import DemoPaymentDialog from './DemoPaymentDialog';
import { paymentConstants } from '@/constants/paymentConstants';
import Link from 'next/link';

export default function AccountFunds() {
  return (
    <Card title="Account funds">
      <CardHeader>
        <CardTitle>Add funds to your account</CardTitle>
        <CardDescription>
          Your balance is used to pay for parking spots. You can add funds to
          the account here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        Select the payment method to add funds to your account
      </CardContent>
      <CardFooter className="flex gap-4">
        <DemoPaymentDialog />
        <Button><Link href={paymentConstants.paymentLinks.clientsChoicePayment}>Add funds</Link></Button>
        {/* <Button disabled>Google Pay</Button>
        <Button disabled>BLIK</Button> */}
      </CardFooter>
    </Card>
  );
}
