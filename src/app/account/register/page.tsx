import { register } from './actions';

const RegisterPage = () => {
  return (
    <div className="flex items-center justify-center">
      <form
        action={register}
        className="flex items-center justify-center flex-col"
      >
        <input type="email" name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default RegisterPage;
