import { get, post } from '@/utils/method';

const restful = '/api';
const registerGroup = `${restful}/register`;

// 注册请求
const register = (form: any, code: any) =>
  post({
    url: `${registerGroup}/${code}`,
    data: form,
  });
// 发送邮箱验证码请求
const code = (email: any) =>
  get({
    url: `${registerGroup}/code?email=${email}`,
  });

const registerApi = {
  register,
  code,
};

export default registerApi;
