export interface Product {
  id: number;
  title: string;
  description: string;
}

export async function getProduct(id): Promise<Product> {
  const response = await fetch(`http://localhost:1337/products/${id}`)
  const product = await response.json();
  return { id: product.id, title: product.title, description: product.description };
}


export async function getProducts(): Promise<Product[]> {
  const response = await fetch('http://localhost:1337/products')
  const products = await response.json();
  return products.map((product) => ({ id: product.id, title: product.title }));
}
