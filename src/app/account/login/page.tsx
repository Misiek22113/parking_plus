import { Input } from '@/components/ui/input';
import { login } from './actions';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center">
      <form
        action={login}
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
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default LoginPage;
