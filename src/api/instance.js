import axios from 'axios';
import { store } from '@/assets/store';

const instance = axios.create({
  baseURL: 'http://182.92.92.250:714',
  headers: { 'Content-Type': 'application/json', app_id: store.appId },
});

instance.interceptors.request.use((config) => {
  config.headers.app_token = store.appInfo.app_token;
  return config;
});

const api = {
  post: instance.post,
  get: (url, data) => {
    const params = data
      ? Object.keys(data)
          .map((key) => {
            return `${key}=${data[key]}`;
          })
          .join('&')
      : '';
    const _url = params ? `${url}?${params}` : url;
    return instance.get(_url);
  },
};

export default api;
