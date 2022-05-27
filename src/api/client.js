import axios from 'axios';

export const storeApiClient = axios.create({
  baseURL: 'https://fakestoreapi.com',
});
