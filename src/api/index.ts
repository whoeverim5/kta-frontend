import loginApi from './path/login_api';
import registerApi from './path/register_api';

const api = {
  ...loginApi,
  ...registerApi,
};

export default api;
