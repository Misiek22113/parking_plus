'use client';
import { Input } from '@/components/ui/input';
import { login } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';

const LoginPage = () => {
  const [errorMessage, dispatch] = useFormState(login, undefined);

  return (
    <div className="flex flex-col items-center justify-center w-1/2">
      <form
        action={dispatch}
        className="flex items-start justify-center flex-col gap-4 w-full"
      >
        <div className="flex flex-col gap-1.5 w-full">
          <Label htmlFor="username">Username</Label>
          <Input
            type="username"
            name="username"
            placeholder="Username"
            required
          />
        </div>
        <div className="flex flex-col gap-1.5 w-full">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>
        {errorMessage && (
          <div className="text-red-500 text-sm">{errorMessage}</div>
        )}
        <LoginButton />
      </form>
      <div className="flex flex-col items-center justify-center mt-16">
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
