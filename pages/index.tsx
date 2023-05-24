import Head from 'next/head'
import React from 'react'
import Title from '../components/Title'
import { GetStaticProps } from 'next'
import { Product, getProducts } from '../lib/products';

interface HomePageProps {
  products: Product[];
}

export const getStaticProps: GetStaticProps = async () => {
  const products = await getProducts();
  return {
    props: { products },
    revalidate: 5 * 60, // seconds
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