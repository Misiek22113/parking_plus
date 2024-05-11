'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import QRCode from 'qrcode.react';
import { useState } from 'react';

export default function DemoPaymentDialog({
  parkingActionId,
}: {
  parkingActionId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setIsOpen(true)}>Qr Code</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Qr Code</DialogTitle>
            <DialogDescription>
              Scan the QR code to see current parking details.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center">
            <QRCode value={`http://localhost:3000/qr/${parkingActionId}`} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
