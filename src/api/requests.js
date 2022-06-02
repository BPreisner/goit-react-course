import { storeApiClient } from './client';

export const getProducts = async ({ sortDirection } = {}) => {
  const { data } = await storeApiClient.get('/products', {
    params: {
      sort: sortDirection,
    },
  });

  return data;
};
