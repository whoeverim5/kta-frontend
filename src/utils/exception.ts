const handleResponseCodeError = (code: number) => {
  const authErrMap: Map<number, string> = new Map([
    /* --- 用户认证状态码错误 ---*/
    // token无效
    [10031, '您太久没登录，请重新登录'],
    // token过期
    [10032, '登录失效，请重新登录'],
    // 密码错误
    [10033, '密码错误'],
    // 账号不存在
    [10034, '账号不存在'],
    // 用户已存在
    [10035, '该账号已存在'],
    // 验证码错误
    [10036, '验证码错误'],

    /* --- 客户端请求错误 ---*/
    // 请求路径不存在
    [404, '不存在的请求路径'],

    /* --- 后端系统出错 ---*/
    // 系统出错
    [-1, '系统出错啦!'],
  ]);
  const message: string = authErrMap.get(code);
  return message !== undefined ? message : null;
};
export default handleResponseCodeError;
