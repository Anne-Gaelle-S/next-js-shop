import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { useMutation, useQueryClient } from "react-query";
import { fetchJson } from "../lib/api";
import { CartItem } from "../lib/cart";
import { useAddToCart } from "../hooks/cart";
import { useRouter } from "next/router";

interface AddToCartWidgetProps {
  productId: number;
}

interface AddToCartVariables {
  productId: number;
  quantity: number;
}


const AddToCartWidget: React.FC<AddToCartWidgetProps> = ({ productId }) => {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const {addToCart, addToCartError, addToCartLoading} = useAddToCart();

  const handleAddToCart = async () => {
    const valid = await addToCart(productId, quantity);
    if (valid) {
      router.push('/cart');
    }
  }

  return (
    <div>
      <Input
        type="number"
        min="1"
        value={quantity}
        onChange={(event) => setQuantity(parseInt(event.target.value))}
      />
      { addToCartError && <p className="text-red-700">An error occured...</p>}
      { addToCartLoading 
        ? <p>Loading...</p>
        : <Button onClick={handleAddToCart}>Add to cart</Button>
      }
    </div>
  );
}

export default AddToCartWidget;
