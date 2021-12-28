import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL as string;

const api = axios.create({
  baseURL: BASE_URL,
});
api.defaults.headers.common = {
  Authorization: `Bearer ${localStorage.getItem('@toAllocate:token')}`,
};

export default api;
