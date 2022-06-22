import { storeApiClient } from './client';

export const getProducts = async ({ sortDirection } = {}) => {
  const { data } = await storeApiClient.get('/products', {
    params: {
      sort: sortDirection,
    },
  });

  return data;
};

export const getProductById = async (id) => {
  const { data } = await storeApiClient.get(`/products/${id}`);

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
