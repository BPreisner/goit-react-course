import axios from 'axios';
import { JWT_TOKEN_STORAGE_KEY } from './constants';

export const storeApiClient = axios.create({
  baseURL: 'https://fakestoreapi.com',
});

export const authenticationApiClient = axios.create({
  baseURL: 'https://connections-api.herokuapp.com',
});

export const goItApiClient = axios.create({
  baseURL: 'https://connections-api.herokuapp.com',
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem(JWT_TOKEN_STORAGE_KEY),
  },
});
