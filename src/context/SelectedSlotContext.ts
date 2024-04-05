import { createContext } from 'react';

interface SlotContext {
  selectedSlotNumber: number;
  setSelectedSlotNumber: (slotNumber: number) => void;
}

const slotContext = createContext<SlotContext>({
  selectedSlotNumber: 0,
  setSelectedSlotNumber: () => {},
});

export const SelectedSlotContext = slotContext;
