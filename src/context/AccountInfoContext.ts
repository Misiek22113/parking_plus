import { FetchUser } from '@/models/User';
import { createContext } from 'react';

interface AccountInfoContext {
  accountInfo: FetchUser;
  setAccountInfo: (FetchUser: FetchUser) => void;
}

const accountInfoContext = createContext<AccountInfoContext>({
  accountInfo: {} as FetchUser,
  setAccountInfo: () => {},
});

export const AccountInfoContext = accountInfoContext;
