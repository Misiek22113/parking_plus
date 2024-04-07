import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/_next')) {
    return NextResponse.next();
  }
  console.log('Middleware running');

  if (
    process.env.NODE_ENV === 'development' &&
    process.env.OMIT_AUTH === 'true'
  ) {
    return NextResponse.next();
  }

  const cookie = req.cookies.get('session');

  if (!cookie && !req.nextUrl.pathname.startsWith('/account')) {
    console.log('redirecting');
    return NextResponse.redirect(new URL('/account/login', req.url));
  }

  return NextResponse.next();
}
