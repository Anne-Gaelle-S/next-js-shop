import Head from 'next/head'
import React from 'react'
import Title from '../components/Title'
import { GetStaticProps } from 'next'
import { Product, getProducts } from '../lib/products';
import Link from 'next/link';

interface HomePageProps {
  products: Product[];
}

export const getStaticProps: GetStaticProps = async () => {
  const products = await getProducts();
  console.log('[getStaticProps] in index.tsx ', products);
  return {
    props: { products },
    revalidate: 30, // seconds
  }
}

const HomePage: React.FC<HomePageProps> = ({products}) => {
  console.log('[HomePage] render');
  return (
    <>
      <Head>
        <title>Next shop</title>
      </Head>
      <main className="px-6 py-4">
        <Title>Next Shop</Title>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <Link href={`/products/${product.id}`}>{product.title}</Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

export default HomePage