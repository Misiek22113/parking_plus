import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { AppError, decrypt } from './lib/utils';

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
      const userRole = await getUserRoleFromCookie(cookie);
      switch (userRole) {
        case 'admin':
          return NextResponse.redirect(new URL('/dashboard', req.url));
        case 'user':
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
      const userRole = await getUserRoleFromCookie(cookie);
      switch (userRole) {
        case 'admin':
          return NextResponse.next();
        case 'user':
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
      const userRole = await getUserRoleFromCookie(cookie);
      switch (userRole) {
        case 'admin':
          return NextResponse.redirect(new URL('/dashboard', req.url));
        case 'user':
          return NextResponse.next();
        default:
          return NextResponse.redirect(new URL('/account/login', req.url));
      }
    } catch (error: any) {
      return NextResponse.redirect(new URL('/account/login', req.url));
    }
  } else {
    try {
      const userRole = await getUserRoleFromCookie(cookie);
      switch (userRole) {
        case 'admin':
          return NextResponse.redirect(new URL('/dashboard', req.url));
        case 'user':
          return NextResponse.redirect(new URL('/home', req.url));
        default:
          return NextResponse.redirect(new URL('/account/login', req.url));
      }
    } catch (error: any) {
      return NextResponse.redirect(new URL('/account/login', req.url));
    }
  }
}

async function getUserRoleFromCookie(cookie?: string) {
  if (!cookie) {
    throw new AppError('Cookie is not defined');
  }
  try {
    const decrypted = await decrypt(cookie);
    const tokenPayload = decrypted as unknown as TokenPayload;
    return tokenPayload.userRole;
  } catch (error: any) {
    throw new AppError('Error getting user role from cookie');
  }
}
