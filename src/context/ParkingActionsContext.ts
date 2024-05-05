import { FetchParkingAction } from '@/models/ParkingActions';
import { createContext } from 'react';

interface ParkingActionsContext {
  parkingActions: FetchParkingAction[];
  setParkingActions: (ParkingActions: FetchParkingAction[]) => void;
}

const parkingActionsContext = createContext<ParkingActionsContext>({
  parkingActions: [],
  setParkingActions: () => {},
});

export const ParkingActionsContext = parkingActionsContext;
