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
import ParkingPlace from './_components/parking-place/AccountPlace';
import AccountFunds from './_components/account-funds/AccountFunds';
import AccountInfo from './_components/account-info/AccountInfo';

export default function Home() {
  return (
    <div className="grid h-full w-full grid-flow-col grid-rows-2 gap-4 p-16">
      <ParkingPlace />
      <AccountFunds />
      <AccountInfo />
    </div>
  );
}
