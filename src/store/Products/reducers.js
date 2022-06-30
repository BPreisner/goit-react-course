import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './constants';
import { getProductById, getProducts } from './actions';

export const productsReducerSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductById.pending, (state, action) => {
        state.entities[action.meta.arg.productId] = {
          ...state.entities[action.meta.arg.productId],
          status: 'fetching',
        };
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.entities[action.meta.arg.productId] = {
          status: 'error',
        };
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.entities[action.payload.id] = {
          entity: action.payload,
          status: 'success',
        };
      })
      .addCase(getProducts.pending, (state) => {
        state.status = 'fetching';
      })
      .addCase(getProducts.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.entitiesList = [];

        action.payload.forEach((product) => {
          state.entities[product.id] = {
            entity: product,
          };

          state.entitiesList.push(product.id);
        });

        state.status = 'success';
      });
  },
});

export default productsReducerSlice.reducer;
