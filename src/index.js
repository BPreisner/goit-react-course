import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ProductsList from './components/ProductsList/ProductsList';
import { AuthneticationContextProvider } from './components/AuthenticationProvider/AuthenticationProvider';
// import OrderForm from './components/OrderForm/OrderForm';

import 'rsuite/dist/rsuite.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <>
    {/* <OrderForm /> */}
    <AuthneticationContextProvider>
      <ProductsList />
    </AuthneticationContextProvider>
  </>,
);
