import { FetchCar } from '@/models/Car';
import { createContext } from 'react';

interface CarsListContext {
  carsList: FetchCar[];
  setCarsList: (FetchCar: FetchCar[]) => void;
}

const carsListContext = createContext<CarsListContext>({
  carsList: [],
  setCarsList: () => {},
});

export const CarsListContext = carsListContext;
