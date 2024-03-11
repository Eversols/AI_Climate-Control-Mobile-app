
// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: 'http://climate.axiscodingsolutions.com/api/v1',
// });

// export const get = (api, body) => axiosInstance.get(api, body);
// export const post = (api, body) => axiosInstance.post(api, body);

// export const put = (api, body) => axiosInstance.put(api, body);
// export const del = (api, body) => axiosInstance.delete(api, body);


// import axios from 'axios';

// const baseURL = 'https://digitalmining.com/demov3/api/user';
// const headers = {
//   'content-type': 'application/json',
// };

// const axiosInstance = axios.create({
//   baseURL,
//   headers,
// });
// axiosInstance.interceptors.request.use(async config => {
//   if (token) {
//     config.headers['Authorization'] = 'Bearer ' + token;

//   }
//   return config;
// }, error => {
//   Promise.reject(error);
// });


// const post = (url, body, options) => axiosInstance.post(url, body, {
//   ...options, headers: {
//     ...options?.headers,
//     'Content-Type': 'multipart/form-data', // Set Content-Type for the specific request
//   },
// });
// const get = (url, options) => axiosInstance.get(url, options);
// const put = (url, body, options) => axiosInstance.put(url, body, options);
// const del = (url, data, options) => axiosInstance.delete(url, { data }, options);

// export { axiosInstance, post, get, put, del };





import axios from "axios";
import { GetToken } from '../StorageToken';

const axiosInstant = axios.create({
  baseURL: "https://smartpest.godepth.com/backend/api/v1"
  // baseURL: "https://digitalmining.axiscodingsolutions.com/demo/api/user"
})


axiosInstant.interceptors.request.use(async config => {
  const token = await GetToken('token');
  if (token) {
    console.log('JJJJJJJJJJJJJJJJJJJJJ', token)
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  // console.log("tokem............", config.headers['Authorization'])
  return config;
}, error => {
  Promise.reject(error);

});

export const get = (api, body) => axiosInstant.get(api);
export const post = (api, body) => axiosInstant.post(api, body);
export const postForm = (url, body, options) => axiosInstant.post(url, body, {
  ...options, headers: {
    ...options?.headers,
    'Content-Type': 'multipart/form-data', // Set Content-Type for the specific request
  },
});

export const putForm = (url, body, options) => axiosInstant.put(url, body, {
  ...options, headers: {
    ...options?.headers,
    'Content-Type': 'multipart/form-data', // Set Content-Type for the specific request
  },
});
export const put = (api, body) => axiosInstant.put(api, body);
export const del = (api, body) => axiosInstant.delete(api, body);


