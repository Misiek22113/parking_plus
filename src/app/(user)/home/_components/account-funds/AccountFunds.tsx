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

export default function AccountFunds() {
  return (
    <Card title="Account funds">
      <CardHeader>
        <CardTitle>Add funds to your account</CardTitle>
        <CardDescription>
          Your fundings are used to pay for parking spots. You can add funds to
          the account here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        Select the payment method to add funds to your account
      </CardContent>
      <CardFooter className="flex gap-4">
        <DemoPaymentDialog />
        <Button disabled>Google Pay</Button>
        <Button disabled>BLIK</Button>
      </CardFooter>
    </Card>
  );
}
