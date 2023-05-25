import { GetStaticProps } from 'next'
import { Product, getProducts } from '../lib/products';
import ProductCard from '../components/ProductCard';
import Page from '../components/Page';

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
    <Page title="Indoor Plants">
      <ul className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </Page>
  );
}

export default HomePage