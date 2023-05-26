import { useQuery } from 'react-query';
import Page from '../components/Page';
import { fetchJson } from '../lib/api';
import { CartItem } from '../lib/cart';

interface CartTableProps {
  cartItems: CartItem[];
}

const CartTable:React.FC<CartTableProps> = ({cartItems}) => {
  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th className="px-4 py-2">Product</th>
          <th className="px-4 py-2">Price</th>
          <th className="px-4 py-2">Quantity</th>
        </tr>
      </thead>
      <tbody>
        {cartItems?.map((cartItem) => (
          <tr key={cartItem.id}>
            <td className="min-w-[150px]">
              {cartItem.product.title}
            </td>
            <td className="min-w-[150px] text-right">
              {cartItem.product.price}
            </td>
            <td className="min-w-[150px] text-right">
              {cartItem.quantity}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const CartPage: React.FC = () => {
  const query = useQuery<CartItem[]>('cartItems', () => fetchJson('/api/cart'))
  const cartItems = query.data;
  console.log({cartItems});

  return (
    <Page title="Cart">
      {cartItems?.length
        ? <CartTable cartItems={cartItems} /> 
        : <p>Vous n&apos;avez rien dans votre panier</p>
      }
    </Page>
  );
};

export default CartPage;