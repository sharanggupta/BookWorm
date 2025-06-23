import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// API base URLs from environment variables
const USER_API_URL = process.env.NEXT_PUBLIC_USER_API_URL || 'http://localhost:8081';
const RECIPE_API_URL = process.env.NEXT_PUBLIC_RECIPE_API_URL || 'http://localhost:8082';
const INTERACTION_API_URL = process.env.NEXT_PUBLIC_INTERACTION_API_URL || 'http://localhost:8083';
const CATEGORY_API_URL = process.env.NEXT_PUBLIC_CATEGORY_API_URL || 'http://localhost:8084';

// Create axios instances for different services
export const userApi: AxiosInstance = axios.create({
  baseURL: USER_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const recipeApi: AxiosInstance = axios.create({
  baseURL: RECIPE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const interactionApi: AxiosInstance = axios.create({
  baseURL: INTERACTION_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const categoryApi: AxiosInstance = axios.create({
  baseURL: CATEGORY_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth token interceptor
function addAuthToken(config: InternalAxiosRequestConfig) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}

function handleResponseError(error: any) {
  // Handle error globally
  return Promise.reject(error);
}

// Apply interceptors to all API instances
[userApi, recipeApi, interactionApi, categoryApi].forEach(api => {
  api.interceptors.request.use(addAuthToken);
  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    handleResponseError
  );
}); 