import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './constants';
import { getProductById } from './actions';

export const productsReducerSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductById.pending, (state, action) => {
        state.entities[action.meta.arg.productId] = {
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
      });
  },
});

export default productsReducerSlice.reducer;
