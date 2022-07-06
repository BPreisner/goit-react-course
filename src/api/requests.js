import {
  storeApiClient,
  authenticationApiClient,
  goItApiClient,
} from './client';
import { JWT_TOKEN_STORAGE_KEY } from './constants';

export const getProductsRequest = async ({ sortDirection } = {}) => {
  const { data } = await storeApiClient.get('/products', {
    params: {
      sort: sortDirection,
    },
  });

  const { data: data2 } = await goItApiClient.get('/users/current');

  console.log(data2);

  return data;
};

export const getProductByIdRequest = async ({ productId }) => {
  const { data } = await storeApiClient.get(`/products/${productId}`);

  return data;
};

export const createUserRequest = async (payload) => {
  const { data } = await authenticationApiClient.post('/users/signup', payload);

  localStorage.setItem(JWT_TOKEN_STORAGE_KEY, data.token);

  return data;
};

export const authenticateUserRequest = async (payload) => {
  const { data } = await authenticationApiClient.post('/users/login', payload);

  localStorage.setItem(JWT_TOKEN_STORAGE_KEY, data.token);

  return data;
};
