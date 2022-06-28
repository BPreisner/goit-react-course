import { initialState } from './constants';
import { createSlice } from '@reduxjs/toolkit';

export const cartReducerSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProductsToCart(state, action) {
      const {
        payload: { productInfo },
      } = action;

      if (state.itemsById[productInfo.id]) {
        state.itemsById[productInfo.id].count += 1;
      } else {
        state.itemsList.push(productInfo.id);

        state.itemsById[productInfo.id] = {
          ...productInfo,
          count: 1,
        };
      }
    },

    removeProductFromCart(state, action) {
      const {
        payload: { productId },
      } = action;

      state.itemsList = state.itemsList.filter((id) => id !== productId);

      delete state.itemsById[productId];
    },
  },
});

export default cartReducerSlice.reducer;
