// Option 1-with-regeration: fetch products on the server side
// but with Incremental Static Regeneration (in getStaticProps)
import Head from 'next/head'
import React from 'react'
import Title from '../components/Title'
import { GetStaticProps } from 'next'
import { Product, getProducts } from '../lib/products';

interface HomePageProps {
  products: Product[];
}

// SSG + ISR
// getStaticProps is better than getServerSideProps whenever possible 
export const getStaticProps: GetStaticProps = async () => {
  const products = await getProducts();
  return {
    props: { products },
    revalidate: 30, // valid value expire every 30 seconds
    // if server receives a request for this page && previous props have expired
    // => it will call getStaticProps
    // revalidate works only in production mode
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