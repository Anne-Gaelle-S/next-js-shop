import { FormEventHandler, useState } from 'react';
import Button from '../components/Button';
import Field from '../components/Field';
import Input from '../components/Input';
import Page from '../components/Page';
import { fetchJson } from '../lib/api';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';

const SignInPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const mutation = useMutation(async () => fetchJson('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
  }))

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    try {
      const user = await mutation.mutateAsync();
      console.log('sign in : ', user);
      router.push('/');
    } catch(err) {
      // mutation.isError will be true
    }
  };

  return (
    <Page title="Sign In">
      <form onSubmit={handleSubmit}>
        <Field label="Email">
          <Input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </Field>
        <Field label="Password">
          <Input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </Field>
        {mutation.isError && <p className="text-red-700">Invalid credentials</p>}
        {mutation.isLoading
          ? (<p>Loading...</p>)
          : (<Button type="submit">Sign In</Button>)
        }
      </form>
    </Page>
  );
};

export default SignInPage;