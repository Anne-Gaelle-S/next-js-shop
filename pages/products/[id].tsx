import { GetStaticPaths, GetStaticProps } from 'next'
import { Product, getProducts, getProduct } from "../../lib/products";
import { ParsedUrlQuery } from "querystring";
import { ApiError } from "../../lib/api";
import Image from "next/image";
import Page from "../../components/Page";
import { useUser } from '../../hooks/user';

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
      revalidate: parseInt(process.env.REVALIDATE_SECONDS), // seconds
    };
  } catch(err){
    if(err instanceof ApiError && err.status === 404) {
      return { notFound: true };
    }
    throw err;
  }
}

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  console.log('[ProductPage] render');
  return (
    <Page title={product.title}>
      <div className="flex flex-col lg:flex-row">
        <div>
          <Image src={product.pictureUrl} alt="" width={640} height={480} />
        </div>
        <div className="flex-1 lg:ml-4">
          <p className="text-sm">{product.description}</p>
          <p className="text-lg font-bold mt-2">{product.price}</p>
        </div>
      </div>
    </Page>
  );
}

export default ProductPage;