import axios from 'axios';
export const readToken = (): string => {
  return localStorage.getItem('accessToken') || '';
};

function createAxios() {
  const axiosInstant = axios.create({});

  axiosInstant.interceptors.request.use(
    async (config) => {
      config.baseURL = import.meta.env.VITE_REQUEST_URL;
      axiosInstant.defaults.timeout = 20000;
      config.headers.Authorization = `Bearer ${readToken()}`;
      config.headers['Access-Control-Allow-Credentials'] = true;
      config.headers['Content-Type'] = 'application/json';
      config.headers['Referrer-Policy'] = 'no-referrer';

      return config;
    },
    (error) => Promise.reject(error),
  );
  return axiosInstant;
}

export const axiosClient = createAxios();

export default axiosClient;