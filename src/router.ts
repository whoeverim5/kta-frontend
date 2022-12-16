import {
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw,
} from 'vue-router';

const routes: readonly RouteRecordRaw[] = [
  // 全局路由
  {
    name: '/',
    path: '/',
    redirect: '/home',
  },
  {
    name: '404',
    path: '/:pathMatch(.*)*',
    component: () => import('@/pages/NotFound.vue'),
  },
];

const router: Router = createRouter({
  // web
  history: createWebHistory('/'),
  routes,
});

// 应该有登录认证才能访问的路由
const destination: string[] = ['/home'];

// token的数据类型
type TokenType = string | null;

// 路由跳转前的拦截
router.beforeEach((to, from, next) => {
  // 若目的路由存在于需要登录认证才能访问的路由的数组中则需检查token
  if (destination.includes(to.path)) {
    const token: TokenType = sessionStorage.getItem('token');
    if (token !== null) {
      // 允许路由跳转
      next();
    } else {
      // 否则返回登录页面
      next('/login');
    }
  } else {
    // 如果是《用户协议》和《隐私政策》页面就修改title
    if (to.meta.title !== undefined) {
      document.title = to.meta.title as string;
    }
    // 不需要登录认证的路由直接跳转
    next();
  }
});

export default router;
