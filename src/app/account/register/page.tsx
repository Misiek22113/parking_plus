'use client';
import { Input } from '@/components/ui/input';
import { register } from './actions';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useFormState, useFormStatus } from 'react-dom';

const RegisterPage = () => {
  const [errorMessage, dispatch] = useFormState(register, undefined);

  return (
    <div className="flex items-center justify-center">
      <form
        action={dispatch}
        className="flex items-start justify-center flex-col gap-4"
      >
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="username">Username</Label>
          <Input
            type="username"
            name="username"
            placeholder="Username"
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
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
        <RegisterButton />
      </form>
    </div>
  );
};

const RegisterButton = () => {
  const { pending } = useFormStatus();

  const handleClick = (event: any) => {
    if (pending) {
      event.preventDefault();
    }
  };

  return (
    <Button aria-disabled={pending} type="submit" onClick={handleClick}>
      Register
    </Button>
  );
};

export default RegisterPage;
