// Option 2: fetch products on the client side (in useEffect)
import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import Title from '../components/Title'
import { getProducts } from '../lib/products'

const HomePage: React.FC = () => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    getProducts().then(setProducts)
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