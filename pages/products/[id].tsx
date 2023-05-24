import Head from "next/head";
import Title from "../../components/Title";
import { GetStaticPaths, GetStaticProps } from 'next'
import { Product, getProducts, getProduct } from "../../lib/products";
import { ParsedUrlQuery } from "querystring";

interface ProductPageParams extends ParsedUrlQuery {
  id: string;
}

interface ProductPageProps {
  product: Product;
}

export const getStaticPaths: GetStaticPaths<ProductPageParams> = async (ctx) => {
  const products = await getProducts() // your fetch function here 

  return {
    paths: products.map((product) => ({
      params: {id: product.id.toString() }
    })),
    fallback: false //  if none paths above matches the request URL we will show 404 Not Found page
  }
}

export const getStaticProps: GetStaticProps<ProductPageProps, ProductPageParams> = async ({ params: {id}}) => {
  const product = await getProduct(id) // your fetch function here 
  return { props: { product } };
}

function ProductPage() {
  return (
  <>
    <Head>
      <title>Next shop</title>
    </Head>
    <main className="px-6 py-4">
      <Title>Product</Title>
    </main>
  </>);
}

export default ProductPage;