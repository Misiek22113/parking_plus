import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import * as jose from 'jose';
import { parkingCostArray } from '@/constants/parkingConstants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function encrypt(payload: any) {
  const key = new TextEncoder().encode(process.env.JWT_SECRET);
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .sign(key);
}

export async function decrypt(token: string) {
  const key = new TextEncoder().encode(process.env.JWT_SECRET);
  const { payload } = await jose.jwtVerify(token, key, {
    algorithms: ['HS256'],
  });
  return payload;
}

export async function getUserInfoFromCookie(
  cookie?: string
): Promise<TokenPayload> {
  if (!cookie) {
    throw new AppError('Cookie is not defined');
  }
  try {
    const decrypted = await decrypt(cookie);
    const tokenPayload = decrypted as unknown as TokenPayload;
    return tokenPayload;
  } catch (error: any) {
    throw new AppError('Error getting user role from cookie');
  }
}

export class AppError extends Error {
  constructor(message: string) {
    super(message);
    console.error(`Error: ${message}, ${this.stack?.split('\n')[1].trim()}`);
  }
}

export const getTimeSpent = (parkTimeEnter: Date, parkTimeLeave: Date) => {
  const differenceMs = parkTimeLeave.getTime() - parkTimeEnter.getTime();
  const hours = Math.floor(differenceMs / (1000 * 60 * 60));
  const minutes = Math.floor((differenceMs % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
};

export const calculateAmount = (parkTimeEnter: Date, parkTimeLeave: Date) => {
  const differenceMs = parkTimeLeave.getTime() - parkTimeEnter.getTime();
  let hours = Math.ceil(differenceMs / (1000 * 60 * 60));

  let cost = 0;

  for (let i = 0; i < parkingCostArray.length - 1; i++) {
    const currentResult = hours - parkingCostArray[i].maxTimeSpent;
    if (currentResult > 0) {
      cost += parkingCostArray[i].amount * parkingCostArray[i].maxTimeSpent;
      hours -= parkingCostArray[i].maxTimeSpent;
    } else {
      cost += parkingCostArray[i].amount * hours;
      hours = 0;
      break;
    }
  }
  if (hours > 0) {
    cost += parkingCostArray[parkingCostArray.length - 1].amount * hours;
  }

  return cost;
};

export const getSimpleDateTime = (date: Date) => {
  return date.toLocaleDateString([], {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};
