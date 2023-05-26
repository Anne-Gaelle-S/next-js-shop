import { useQuery } from 'react-query';
import Page from '../components/Page';
import { fetchJson } from '../lib/api';
import { CartItem } from '../lib/cart';

interface Cart {
  items: (CartItem & { total: number })[];
  total: number;
}

interface CartTableProps {
  cartItems: CartItem[];
}

function formatCurrency(value: number): string {
  return '$' + value.toFixed(2);
}

function buildCart(cartItems: CartItem[]): Cart {
  let total = 0.0;
  const items = [];
  for (const cartItem of cartItems) {
    const itemTotal = cartItem.product.price * cartItem.quantity;
    total += itemTotal;
    items.push({ ...cartItem, total: itemTotal });
  }
  return { items, total };
}

const CartTable:React.FC<CartTableProps> = ({cartItems}) => {
  const cart = buildCart(cartItems);
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
        {cart.items.map((cartItem) => (
          <tr key={cartItem.id}>
            <td className="min-w-[150px]">
              {cartItem.product.title}
            </td>
            <td className="min-w-[150px] text-right">
              {formatCurrency(cartItem.product.price)}
            </td>
            <td className="min-w-[150px] text-right">
              {cartItem.quantity}
            </td>
            <td className="px-4 py-2 text-right">
              {formatCurrency(cartItem.total)}
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th className="px-4 py-2 text-left">
            Total
          </th>
          <th></th>
          <th></th>
          <th className="px-4 py-2 text-right">
            {formatCurrency(cart.total)}
          </th>
        </tr>
      </tfoot>
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