import BAR_CHART_ICON from '../../assets/icons/bar-chart-big.svg';
import { useState } from 'react';
import Image from 'next/image';
import { useFormState, useFormStatus } from 'react-dom';
import { Input } from '../ui/input';
import { fetchFilteredActions } from '@/app/actions';
import { DatePicker } from './DatePicker';
import { ScrollArea } from '../ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { calculateAmount, getSimpleDateTime, getTimeSpent } from '@/lib/utils';
import { parkingActionStatusEnum } from '@/constants/enumConstants';

const ActionsTable = () => {
  const [formState, dispatchFilterActions] = useFormState(
    fetchFilteredActions,
    undefined
  );

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div
          className="flex min-h-12 min-w-12 cursor-pointer items-center justify-center rounded-lg bg-white"
          onClick={() => setIsOpen(true)}
        >
          <Image src={BAR_CHART_ICON} alt="Parking" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Parking Actions</DialogTitle>
          <DialogDescription>
            Filter and view all your parking actions.
          </DialogDescription>
        </DialogHeader>
        <form action={dispatchFilterActions} className="flex flex-col gap-8">
          <div className="flex gap-6">
            <Input placeholder="Spot" className="sm:max-w-[170px]" />
            <Input placeholder="Car license" className="sm:max-w-[170px]" />
            <DatePicker />
            <Select>
              <SelectTrigger className="w-[170px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="apple">pending</SelectItem>
                  <SelectItem value="banana">payed</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <ScrollArea className="h-full">
            <Table>
              <TableCaption>A list of your recent reservations.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Spot</TableHead>
                  <TableHead>Car license</TableHead>
                  <TableHead>Enter date</TableHead>
                  <TableHead>Time spent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {formState &&
                  formState.map((parkingAction, index) => (
                    <TableRow key={index}>
                      <TableCell>{parkingAction.parkingSpaceNumber}</TableCell>
                      <TableCell>
                        {parkingAction.carRegistrationPlate}
                      </TableCell>
                      <TableCell>
                        {getSimpleDateTime(parkingAction.parkTime)}
                      </TableCell>
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
                            parkingAction.status ===
                            parkingActionStatusEnum.pending
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
                          : `${calculateAmount(
                              parkingAction.parkTime,
                              parkingAction.leaveTime
                            )} PLN`}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </ScrollArea>
          <FilterButton />
        </form>
      </DialogContent>
    </Dialog>
  );
};

const FilterButton = () => {
  const { pending } = useFormStatus();

  const handleClick = (event: any) => {
    if (pending) {
      event.preventDefault();
    }
  };

  return (
    <Button aria-disabled={pending} type="submit" onClick={handleClick}>
      Login
    </Button>
  );
};

export default ActionsTable;
