import { createAsyncThunk } from '@reduxjs/toolkit';
import { getProductByIdRequest } from '../../api/requests';

export const getProductById = createAsyncThunk(
  'products/getProductById',
  getProductByIdRequest,
);
