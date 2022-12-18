import service from './axios';

type ConfigType = {
  url: string;
  params?: unknown | null;
  data?: unknown | null;
};
// get请求
const get = (config: ConfigType) =>
  service({
    url: config.url,
    method: 'get',
    params: config.params,
  });

// post请求
const post = (config: ConfigType) =>
  service({
    url: config.url,
    method: 'post',
    params: config.params,
    data: config.data,
  });

export { get, post };

export type ApiType = {
  params?: unknown;
  data?: unknown;
};
