import { fetchJson } from './api';

const CMS_URL: string = process.env.CMS_URL;

export interface Product {
  id: number;
  title: string;
  description: string;
}

export async function getProduct(id): Promise<Product> {
  const product = await fetchJson(`${CMS_URL}/products/${id}`);
  return { id: product.id, title: product.title, description: product.description };
}


export async function getProducts(): Promise<Product[]> {
  const products = await fetchJson(`${CMS_URL}/products`);
  return products.map((product) => ({ id: product.id, title: product.title }));
}
