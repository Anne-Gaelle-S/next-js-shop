import Head from 'next/head'
import React from 'react'
import Title from '../components/Title'
import { GetStaticProps } from 'next'
import { Product, getProducts } from '../lib/products';
import ProductCard from '../components/ProductCard';

interface HomePageProps {
  products: Product[];
}

export const getStaticProps: GetStaticProps = async () => {
  const products = await getProducts();
  console.log('[getStaticProps] in index.tsx ');
  return {
    props: { products },
    revalidate: parseInt(process.env.REVALIDATE_SECONDS), // seconds
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
        <ul className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

export default HomePage