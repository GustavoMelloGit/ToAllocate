import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL as string;

const api = axios.create({
  baseURL: BASE_URL,
});

export const setAuthToken = (token: string) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('@toAllocate:token');
  }
};
export default api;
