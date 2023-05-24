// Option 1-with-getServerSideProps: fetch products on the server side (in getServerSideProps)
import Head from 'next/head'
import React from 'react'
import Title from '../components/Title'
import { Product, getProducts } from '../lib/products';

interface HomePageProps {
  products: Product[];
}

// SSR
// refetch data at every requests
// server will still returns pre-rendered HTML to the browser
// page is generated at runtime so the response will be slower
// making request to the CSM every page refreshing => potentially a lot of requests to the backend
// can make app less scalable
export const getServerSideProps = async () => {
  const products = await getProducts();
  console.log('[getServerSideProps] ', products);

  return {
    props: {
      products
    }
  }
}

const HomePage: React.FC<HomePageProps> = ({products}) => {
  return (
    <>
      <Head>
        <title>Next shop</title>
      </Head>
      <main className="px-6 py-4">
        <Title>Next Shop</Title>
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      </main>
    </>
  );
}

export default HomePage