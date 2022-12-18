import { post } from '@/utils/method';

const restful = '/api';
const loginGroup = `${restful}/login`;

// 登录请求
const login = (user: any) =>
  post({
    url: `${loginGroup}`,
    data: user,
  });

const loginApi = {
  login,
};

export default loginApi;
