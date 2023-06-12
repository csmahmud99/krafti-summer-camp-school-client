import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// React Helmet Async
import { HelmetProvider } from 'react-helmet-async';

// Importing react-router configurations for Route-setup
import { RouterProvider } from "react-router-dom";
import router from './routes/BasicRoutes/BasicRoutes.jsx';
import AuthProvider from './providers/AuthProvider/AuthProvider';

// Importing 'TanStack Query/React Query'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client (TanStack Query/React Query Client)
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Authentication Provider */}
    <AuthProvider>
      {/* TanStack Query/React Query Provider */}
      <QueryClientProvider client={queryClient}>
        {/* React Helmet Async Provider */}
        <HelmetProvider>
          {/* All Contents */}
          <RouterProvider router={router} />
        </HelmetProvider>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
);
