import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ProductsList from './components/ProductsList/ProductsList';
// import OrderForm from './OrderForm/OrderForm';

import 'rsuite/dist/rsuite.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <>
    {/* <OrderForm /> */}
    <ProductsList />
  </>,
);
