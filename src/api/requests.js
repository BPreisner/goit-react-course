import { storeApiClient, goItApiClient } from './client';
import { JWT_TOKEN_STORAGE_KEY } from './constants';

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

export const createUserRequest = async (payload) => {
  const { data } = await goItApiClient.post('/users/signup', payload);

  localStorage.setItem(JWT_TOKEN_STORAGE_KEY, data.token);

  return data;
};

export const authenticateUserRequest = async (payload) => {
  const { data } = await goItApiClient.post('/users/login', payload);

  localStorage.setItem(JWT_TOKEN_STORAGE_KEY, data.token);

  return data;
};

export const checkIfStillAuthenticatedRequest = async () => {
  const { data } = await goItApiClient.get('/users/current');

  return data;
};

export const logoutUserRequest = async (arg, thunkAPI) => {
  try {
    await goItApiClient.post('/users/logout');
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  } finally {
    localStorage.removeItem(JWT_TOKEN_STORAGE_KEY);
  }
};
