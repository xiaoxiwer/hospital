import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '就医陪诊后台管理',
  },
  routes: [
    {
      path: '/',
      redirect: '/login',

    },
    {
      path: '/login',
      component: './Login',
      layout: false,
    },
    {
      name: '订单管理',
      path: '/order',
      component: './Order',
    },
    {
      name: '医院管理',
      path: '/hospital',
      component: './Hospital',
    },
    {
      name: '陪诊员管理',
      path: '/escort',
      component: './Escort',
    },
    {
      name: '审核管理',
      path: '/audit',
      component: './Audit',
    },
    {
      name: '福利管理',
      path: '/welfare',
      component: './Welfare',
    },
  ],
  npmClient: 'pnpm',
  proxy: {
    '/api': {
      target: 'http://47.98.201.46:18080',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
});
