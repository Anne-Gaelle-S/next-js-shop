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

// run at build time
export const getStaticPaths: GetStaticPaths<ProductPageParams> = async (ctx) => {
  const products = await getProducts() // your fetch function here 
  console.log('[getStaticPaths] in [id].tsx ', products);
  return {
    paths: products.map((product) => ({
      params: {id: product.id.toString() }
    })),
    fallback: 'blocking' // if given path does not match paths given at build time
    // we will try to request data from server
    // the client will wait until the server has generated the new page
  }
}

export const getStaticProps: GetStaticProps<ProductPageProps, ProductPageParams> = async ({ params: {id}}) => {
  try {
    const product = await getProduct(id) // your fetch function here 
    console.log('[getStaticProps] in [id].tsx ', product);
    return {
      props: { product },
    };
  } catch(err){
    return { notFound: true };
  }
}

function ProductPage({product}) {
  console.log('[ProductPage] render');
  return (
    <>
      <Head>
        <title>Next shop</title>
      </Head>
      <main className="px-6 py-4">
        <Title>{product.title}</Title>
        <p>{product.description}</p>
      </main>
    </>
  );
}

export default ProductPage;