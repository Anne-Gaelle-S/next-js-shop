import { fetchJson } from "../lib/api";
import { User } from "../lib/user";
import { useQuery } from 'react-query';

export function useUser(): User {
  const query = useQuery<User>('user', async () => {
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