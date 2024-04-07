import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import * as jose from 'jose';

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

export class AppError extends Error {
  constructor(message: string) {
    super(message);
    console.error(`Error: ${message}, ${this.stack?.split('\n')[1].trim()}`);
  }
}
