import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App';
import './index.css';

const globalQuerySetting = {
  defaultOptions: {
    queries: {
      retry: 3,
      cacheTime: 300_000, //5m. if a query in 5 min does't used, will be removed from cache after 5 mins
      staleTime: 10 * 1000, // 10s
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    }
  }
}

// you can pass in the globalQuerySetting
const queryClient = new QueryClient();

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
