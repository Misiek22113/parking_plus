'use client';
import { Input } from '@/components/ui/input';
import { login } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';
import { GoogleSignInButton } from '@/components/ui/authButton';

const LoginPage = () => {
  const [errorMessage, dispatch] = useFormState(login, undefined);

  return (
    <div className="flex w-1/2 flex-col items-center justify-center">
      <form
        action={dispatch}
        className="flex w-full flex-col items-start justify-center gap-4"
      >
        <div className="flex w-full flex-col gap-1.5">
          <Label htmlFor="username">Username</Label>
          <Input
            type="username"
            name="username"
            placeholder="Username"
            required
          />
        </div>
        <div className="flex w-full flex-col gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>
        {errorMessage && (
          <div className="text-sm text-red-500">{errorMessage}</div>
        )}
        <LoginButton />
      </form>
      <div className="flex flex-col items-center w-full">
        <div className="flex w-full items-center mt-5">
          <div className="flex-grow border-t-2 border-black"></div>
          <span className="mx-4 text-black">OR</span>
          <div className="flex-grow border-t-2 border-black"></div>
        </div>
        <GoogleSignInButton />
      </div>
      <div className="mt-16 flex flex-col items-center justify-center">
        Don&apos;t have an account?
        <Button variant="link">
          <Link href="/account/register" className="text-blue-500">
            Register
          </Link>
        </Button>
      </div>
    </div>
  );
};

const LoginButton = () => {
  const { pending } = useFormStatus();

  const handleClick = (event: any) => {
    if (pending) {
      event.preventDefault();
    }
  };

  return (
    <Button aria-disabled={pending} type="submit" onClick={handleClick}>
      Login
    </Button>
  );
};

export default LoginPage;
