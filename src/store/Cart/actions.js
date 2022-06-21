import { ActionTypes } from './constants';

export const addProductsToCart = (productInfo) => ({
  type: ActionTypes.AddProductsToCart,
  payload: {
    productInfo,
  },
});

export const removeProductFromCart = (productId) => ({
  type: ActionTypes.RemoveProductFromCart,
  payload: {
    productId,
  },
});
