import { fetchJson } from "../lib/api";
import { CartItem } from "../lib/cart";
import { useMutation } from 'react-query';

interface AddToCartVariables {
  productId: number;
  quantity: number;
}

interface UseAddToCartResult {
  addToCart: (productId: number, quantity: number) => Promise<boolean>;
  addToCartError: boolean;
  addToCartLoading: boolean;
}

export function useAddToCart(): UseAddToCartResult {
  const mutation = useMutation<CartItem[], Error, AddToCartVariables>(
    async ({ productId, quantity }) =>
      fetchJson("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
      })
  );
  return {
    addToCart: async (productId, quantity) => {
      try {
        await mutation.mutateAsync({ productId, quantity });
        return true;
      } catch(err) {
        return false;
      }
    },
    addToCartError: mutation.isError,
    addToCartLoading: mutation.isLoading,
  }
}