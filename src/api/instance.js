import axios from 'axios';

const appId = 'ed7311670c0e4a6a93c93a0cd75fc55b';

const api = axios.create({
  baseURL: 'http://182.92.92.250:714',
  headers: { 'Content-Type': 'application/json', app_id: appId },
});

api.interceptors.request.use((config) => {
  config.headers.app_token = localStorage.getItem('token');
  return config;
});

export default api;
