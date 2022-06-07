import { useContext, createContext, useState } from 'react';

const CartContext = createContext();

export const CartContextProvider = ({ children }) => {


  return (
    <CartContext.Provider
      value={}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
