import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Importing react-router configurations for Route-setup
import { RouterProvider } from "react-router-dom";
import router from './routes/BasicRoutes/BasicRoutes.jsx';
import AuthProvider from './providers/AuthProvider/AuthProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
