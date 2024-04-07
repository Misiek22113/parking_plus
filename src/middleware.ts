import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { decrypt } from './lib/utils';

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/_next')) {
    return NextResponse.next();
  }

  if (
    process.env.NODE_ENV === 'development' &&
    process.env.OMIT_AUTH === 'true'
  ) {
    return NextResponse.next();
  }

  const cookie = req.cookies.get('session')?.value;

  try {
    if (cookie) {
      const decrypted = decrypt(cookie);
      console.log('decrypted', decrypted);
    }
  } catch (error: any) {
    console.log('error', error.message);
    return NextResponse.redirect(new URL('/account/login', req.url));
  }

  if (!cookie && !req.nextUrl.pathname.startsWith('/account')) {
    console.log('redirecting');
    return NextResponse.redirect(new URL('/account/login', req.url));
  }

  // if (cookie && req.nextUrl.pathname.startsWith('/account')) {
  //   return NextResponse.redirect(new URL('/', req.url));
  // }

  return NextResponse.next();
}
