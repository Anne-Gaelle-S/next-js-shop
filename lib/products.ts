export interface Product {
  id: number;
  title: string;
}

export async function getProducts(): Promise<Product[]> {
  const response = await fetch('http://localhost:1337/products')
  const products = await response.json();
  return products.map((product) => ({ id: product.id, title: product.title }));
}
