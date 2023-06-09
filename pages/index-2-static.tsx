// Option 2: fetch products on the client side (in useEffect)
// directly from an external API
import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import Title from '../components/Title'
import { getProducts } from '../lib/products'

const HomePage: React.FC = () => {
  const [products, setProducts] = useState([])
  // CSR
  // fetch data at every refresh
  // browser calls the CMS API directly
  // so API should be visible to anybody rather than just our own servers
  // add (maybe) many datas in response that we don't actually use
  useEffect(() => {
    getProducts().then(setProducts) // content-length = 9517
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