import axios from 'axios';
import handleResponseCodeError from './exception';

const TIMEOUT = 1000 * 30;
const HOST = 'http://localhost:8888';

export interface ResType {
  code: number;
  message: string;
  data: any;
}

const service = axios.create({
  // 设置baseURL
  baseURL: HOST,
  // 设置请求超时时间
  timeout: TIMEOUT,
  // 请求头
  headers: {
    'Content-Type': 'application/json',
  },
  // 允许跨域
  withCredentials: true,
});
// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 为请求头设置token
    const token = sessionStorage.getItem('token');
    config.headers.Authorization = token !== null ? token : '';
    return config;
  },
  (err) => Promise.reject(err)
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    const { status } = response;
    // 网络异常状态码
    if (status !== 200) return Promise.reject(res);

    // 后端返回的异常状态码处理
    const authErrMessage: string = handleResponseCodeError(res.code);
    if (authErrMessage) {
      res.message = authErrMessage;
      return Promise.reject(res);
    }
    return res;
  },
  (err) => Promise.reject(err)
);

export default service;
