import { fetchJson } from "../lib/api";
import { User } from "../lib/user";
import { useMutation, useQuery, useQueryClient } from 'react-query';

const USER_QUERY_KEY = 'user';

interface SignInVariables {
  email: string;
  password: string;
}

interface UseSignInResult {
  signIn: (email: string, password: string) => Promise<boolean>;
  signInError: boolean;
  signInLoading: boolean;
}

export function useSignIn(): UseSignInResult {
  const queryClient = useQueryClient();
  const mutation = useMutation<User, Error, SignInVariables>(async ({ email, password }) =>
    fetchJson("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
  );
  return {
    signIn: async (email, password) => {
      try {
        const user = await mutation.mutateAsync({ email, password });
        queryClient.setQueryData(USER_QUERY_KEY, user);
        return true;
      } catch(err) {
        return false;
      }
    },
    signInError: mutation.isError,
    signInLoading: mutation.isLoading,
  }
}

export function useUser(): User {
  const query = useQuery<User>(USER_QUERY_KEY, async () => {
    try {
      return await fetchJson('/api/user');
    } catch (err) {
      return undefined;
    }
  }, {
    cacheTime: Infinity,
    staleTime: 30_000, // ms
  });
  return query.data;
}