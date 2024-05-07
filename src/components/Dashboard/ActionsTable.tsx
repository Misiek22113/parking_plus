import BAR_CHART_ICON from '../../assets/icons/bar-chart-big.svg';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import Image from 'next/image';
import { useFormState } from 'react-dom';
import { Input } from '../ui/input';
import { fetchFilteredActions } from '@/app/actions';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const ActionsTable = () => {
  const [errorFilterActions, dispatchFilterActions] = useFormState(
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Parking Actions</DialogTitle>
          <DialogDescription>
            Filter and view all your parking actions.
          </DialogDescription>
        </DialogHeader>
        <form action={dispatchFilterActions}>
          <div className="flex gap-6">
            <Input placeholder="Spot" />
            <Input placeholder="Car license" />
            <Input placeholder="Data" />
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="apple">pending</SelectItem>
                  <SelectItem value="banana">payed</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ActionsTable;
