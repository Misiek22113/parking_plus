import { FetchParkingSpace } from '@/models/ParkingSpace';
import { createContext } from 'react';

interface ParkingSpacesContext {
  parkingSpaces: FetchParkingSpace[];
  setParkingSpaces: (ParkinSpaces: FetchParkingSpace[]) => void;
}

const parkingSpacesContext = createContext<ParkingSpacesContext>({
  parkingSpaces: [],
  setParkingSpaces: () => {},
});

export const ParkingSpacesContext = parkingSpacesContext;
