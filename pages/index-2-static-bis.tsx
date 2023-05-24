// Option 2: fetch products on the client side (in useEffect)
// from an internal API route
import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import Title from '../components/Title'

const HomePage: React.FC = () => {
  const [products, setProducts] = useState([])
  // CSR
  useEffect(() => {
    (async () => {
      // this way we reduce the size of the data sent to the browser
      const response = await fetch('/api/products'); // content-length = 192
      const products = await response.json();
      setProducts(products);
    })();
  }, [])

  console.log('[HomePage] render ', products);
  return (
    <>
      <Head>
        <title>Next shop</title>
      </Head>
      <main className="px-6 py-4">
        <Title>Next Shop</Title>
        <ul>
          {products.map((product) => 
            <li key={product.id}>{product.title}</li>
          )}
        </ul>
      </main>
    </>
  );
}

export default HomePage