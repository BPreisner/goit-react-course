import { createAsyncThunk } from '@reduxjs/toolkit';
import { getProductByIdRequest, getProductsRequest } from '../../api/requests';

export const getProductById = createAsyncThunk(
  'products/getProductById',
  getProductByIdRequest,
);

export const getProducts = createAsyncThunk(
  'products/getProducts',
  getProductsRequest,
);
