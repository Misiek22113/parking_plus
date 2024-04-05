import { createContext } from 'react';

interface SlotContext {
  slotNumber: number;
  setSlotNumber: (slotNumber: number) => void;
}

const slotContext = createContext<SlotContext>({
  slotNumber: 0,
  setSlotNumber: () => {},
});

export const SelectedSlotContext = slotContext;
