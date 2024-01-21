
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://restapi.adequateshop.com/api/authaccount',
});

export const get = (api, body) => axiosInstance.get(api, body);
export const post = (api, body) => axiosInstance.post(api, body);
export const put = (api, body) => axiosInstance.put(api, body);
export const del = (api, body) => axiosInstance.delete(api, body);


