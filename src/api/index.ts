import { URL_API } from '@/utils/consts';

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: URL_API,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15_000,
});

export default axiosInstance;
