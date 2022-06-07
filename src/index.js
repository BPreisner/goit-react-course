import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import ProductsList from './components/ProductsList/ProductsList';
import { AuthneticationContextProvider } from './components/AuthenticationProvider/AuthenticationProvider';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import LoginForm from './components/LoginForm/LoginForm';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Layout from './components/Layout/Layout';

import 'rsuite/dist/rsuite.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <AuthneticationContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Add Home */}
          <Route path="registration" element={<RegistrationForm />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="products" element={<ProductsList />} />
          <Route path="product/:productId" element={<ProductDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthneticationContextProvider>,
);
