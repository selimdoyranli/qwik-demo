import type { FetchOptions } from 'ofetch';
import { ofetch } from 'ofetch';

const BASE_URL = 'https://dummyjson.com';

export const createApiInstance = (options: FetchOptions = {}) => {
  return ofetch.create({
    baseURL: BASE_URL,
    ...options,
    async onRequest({ options }) {
      options.headers = new Headers({
        ...Object.fromEntries(options.headers),
        'Content-Type': 'application/json',
      });
    },
    async onResponse({ response }) {
      return response._data;
    },
    async onResponseError({ response }) {
      console.error('API Error:', response._data);
      throw new Error(response._data?.message || 'An error occurred');
    },
  });
};

export const baseApi = createApiInstance(); 
