import axios from 'axios';
import { JWT_TOKEN_STORAGE_KEY } from './constants';

export const storeApiClient = axios.create({
  baseURL: 'https://fakestoreapi.com',
});

export const goItApiClient = axios.create({
  baseURL: 'https://connections-api.herokuapp.com',
});

goItApiClient.interceptors.request.use(function (config) {
  const authToken = localStorage.getItem(JWT_TOKEN_STORAGE_KEY);

  if (authToken) {
    return {
      ...config,
      headers: {
        Authorization: 'Bearer ' + authToken,
      },
    };
  }

  return config;
});
