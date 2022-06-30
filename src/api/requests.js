import { storeApiClient } from './client';

export const getProductsRequest = async ({ sortDirection } = {}) => {
  const { data } = await storeApiClient.get('/products', {
    params: {
      sort: sortDirection,
    },
  });

  return data;
};

export const getProductByIdRequest = async ({ productId }) => {
  const { data } = await storeApiClient.get(`/products/${productId}`);

  return data;
};

export const createUser = async (payload) => {
  const { data } = await storeApiClient.post('/users', payload);

  return data;
};

export const authenticateUserRequest = async (payload) => {
  const { data } = await storeApiClient.post('/auth/login', payload);

  return data;
};
