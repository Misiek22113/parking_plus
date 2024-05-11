import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getUserInfoFromCookie } from './lib/utils';
import { userRoleEnum } from './constants/enumConstants';

export async function middleware(req: NextRequest) {
  const cookie = req.cookies.get('session')?.value;

  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    (process.env.NODE_ENV === 'development' && process.env.OMIT_AUTH === 'true')
  ) {
    return NextResponse.next();
  } else if (req.nextUrl.pathname.startsWith('/account')) {
    console.info('User is trying to access account page');
    try {
      const { userRole } = await getUserInfoFromCookie(cookie);
      switch (userRole) {
        case userRoleEnum.admin:
          return NextResponse.redirect(new URL('/dashboard', req.url));
        case userRoleEnum.user:
          return NextResponse.redirect(new URL('/home', req.url));
        default:
          return NextResponse.redirect(new URL('/account/login', req.url));
      }
    } catch (error: any) {
      return NextResponse.next();
    }
  } else if (req.nextUrl.pathname.startsWith('/dashboard')) {
    console.info('User is trying to access dashboard page');
    try {
      const { userRole } = await getUserInfoFromCookie(cookie);
      switch (userRole) {
        case userRoleEnum.admin:
          return NextResponse.next();
        case userRoleEnum.user:
          return NextResponse.redirect(new URL('/home', req.url));
        default:
          return NextResponse.redirect(new URL('/account/login', req.url));
      }
    } catch (error: any) {
      return NextResponse.redirect(new URL('/account/login', req.url));
    }
  } else if (req.nextUrl.pathname.startsWith('/home')) {
    console.info('User is trying to access home page');
    try {
      const { userRole } = await getUserInfoFromCookie(cookie);
      switch (userRole) {
        case userRoleEnum.admin:
          return NextResponse.redirect(new URL('/dashboard', req.url));
        case userRoleEnum.user:
          return NextResponse.next();
        default:
          return NextResponse.redirect(new URL('/account/login', req.url));
      }
    } catch (error: any) {
      return NextResponse.redirect(new URL('/account/login', req.url));
    }
  } else {
    try {
      if (req.nextUrl.pathname.substring(0, 3) === '/qr') {
        return NextResponse.next();
      }
      const { userRole } = await getUserInfoFromCookie(cookie);
      switch (userRole) {
        case userRoleEnum.admin:
          return NextResponse.redirect(new URL('/dashboard', req.url));
        case userRoleEnum.user:
          return NextResponse.redirect(new URL('/home', req.url));
        default:
          return NextResponse.redirect(new URL('/account/login', req.url));
      }
    } catch (error: any) {
      return NextResponse.redirect(new URL('/account/login', req.url));
    }
  }
}
