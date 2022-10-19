import axios from "axios";
// import { queryString } from 'query-string';

const axiosClient = axios.create({
  baseURL: `https://api-placeholder.herokuapp.com/`,
  headers: {
    'content-type': 'application/json',
  },
  // paramsSerializer: (params: any) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  const customHeaders: any = {};

  const accessToken = localStorage.getItem('access_token');
  console.log('accessToken', accessToken)
  if (accessToken) {
    customHeaders.Authorization = `Bearer ${accessToken}`;
  }

  return {
    ...config,
    headers: {
      ...customHeaders,
      ...config.headers,
    }
  };
});

export default axiosClient;