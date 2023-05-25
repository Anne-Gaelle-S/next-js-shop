import { fetchJson } from './api';

const CMS_URL: string = process.env.CMS_URL;

export interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  pictureUrl: string;
}

export async function getProduct(id): Promise<Product> {
  const product = await fetchJson(`${CMS_URL}/products/${id}`);
  return stripProduct(product);
}


export async function getProducts(): Promise<Product[]> {
  const products = await fetchJson(`${CMS_URL}/products`);
  return products.map((product) => stripProduct(product));
}

function stripProduct(product): Product {
  return {
    id: product.id,
    title: product.title,
    description: product.description,
    price: '$' + product.price.toFixed(2), // use Internationalization API would be better
    pictureUrl: CMS_URL + product.picture.url,
  };
}
