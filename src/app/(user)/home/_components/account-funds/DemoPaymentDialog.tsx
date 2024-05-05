'use client';

import { addFunds } from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AccountInfoContext } from '@/context/AccountInfoContext';
import { useContext, useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useToast } from '@/components/ui/use-toast';

export default function DemoPaymentDialog() {
  const { toast } = useToast();
  const { accountInfo, setAccountInfo } = useContext(AccountInfoContext);
  const [errorAdd, dispatchAdd] = useFormState(addFunds, undefined);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (errorAdd?.isSuccessful) {
      setAccountInfo({
        ...accountInfo,
        credits: accountInfo.credits + errorAdd.data.credits,
      });
    }
    if (errorAdd && !errorAdd.isSuccessful) {
      toast({
        variant: 'destructive',
        title: 'Failed to add funds',
        description: errorAdd?.message,
      });
    }
  }, [errorAdd, setAccountInfo]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setIsOpen(true)}>Demo</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add funds</DialogTitle>
            <DialogDescription>
              Input the amount you want to transfer to your account.
            </DialogDescription>
          </DialogHeader>
          <form action={dispatchAdd}>
            <div className="grid grid-cols-4 items-center gap-4 py-4">
              <Label htmlFor="moneyAmount" className="text-right">
                Amount
              </Label>
              <Input
                type="number"
                name="moneyAmount"
                id="moneyAmount"
                defaultValue="10"
                className="col-span-3"
              />
            </div>
            <AddButton setIsDialogOpen={setIsOpen} />
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

const AddButton = ({
  setIsDialogOpen,
}: {
  setIsDialogOpen: (isOpen: boolean) => void;
}) => {
  const { pending } = useFormStatus();

  const handleClick = (event: any) => {
    if (pending) {
      event.preventDefault();
    }
    setIsDialogOpen(false);
  };

  return (
    <Button
      aria-disabled={pending}
      type="submit"
      onClick={handleClick}
      className="mt-4 w-full"
    >
      Add
    </Button>
  );
};
