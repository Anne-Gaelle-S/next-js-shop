import { NextApiHandler } from 'next';
import { fetchJson } from '../../lib/api';
import { CartItem } from '../../lib/cart';

const { CMS_URL } = process.env;

function stripCartItem(item) {
  return {
    id: item.id,
    product: {
      id: item.product.id,
      title: item.product.title,
      price: item.product.price,
    },
    quantity: item.quantity
  };
}

const handleCart: NextApiHandler<CartItem[]> = async (req, res) => {
  const { jwt } = req.cookies;
  if (!jwt) {
    res.status(401).end();
    return;
  }
  try {
    const cart = await fetchJson(`${CMS_URL}/cart-items`, {
      headers: { 'Authorization': `Bearer ${jwt}` },
    });
    res.status(200).json(cart.map(stripCartItem));
  } catch (err) {
    res.status(401).end();
  }
}

export default handleCart;