import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ProductsList from './ProductsList/ProductsList';
import OrderForm from './OrderForm/OrderForm';

const products = [
  {
    id: 'id-1',
    name: 'Tacos With Lime',
    price: 14.2,
    quantity: 22,
    imgUrl:
      'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?dpr=2&h=480&w=640',
  },
  {
    id: 'id-2',
    name: 'Pizza',
    price: 17,
    quantity: 100,
  },
  {
    id: 'id-3',
    name: 'Fries and Burger',
    price: 15,
    quantity: 10,
    imgUrl:
      'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?dpr=2&h=480&w=640',
  },
  {
    id: 'id-4',
    name: 'Burrito',
    price: 0,
    quantity: 0,
  },
];

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <OrderForm />
    <ProductsList products={products}>
      <h1>Enjoy your meal!</h1>
    </ProductsList>
  </React.StrictMode>,
);
