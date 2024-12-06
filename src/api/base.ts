import type { FetchOptions } from 'ofetch';
import { ofetch } from 'ofetch';

const BASE_URL = 'https://dummyjson.com';

export const createApiInstance = (options: FetchOptions = {}) => {
  return ofetch.create({
    baseURL: BASE_URL,
    ...options,
    async onRequest({ options }) {
      // Add any request interceptors here
      options.headers = {
        ...options.headers,
        'Content-Type': 'application/json',
      };
    },
    async onResponse({ response }) {
      // Add any response interceptors here
      return response._data;
    },
    async onResponseError({ response }) {
      // Handle response errors
      console.error('API Error:', response._data);
      throw new Error(response._data?.message || 'An error occurred');
    },
  });
};

export const baseApi = createApiInstance();
