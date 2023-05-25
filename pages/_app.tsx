import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { QueryClient, QueryClientProvider } from 'react-query';

// Global setup comes here :
const queryClient = new QueryClient();

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default App
