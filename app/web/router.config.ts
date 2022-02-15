export default [{
  path: '/',
  component: '@/layouts/BasicLayout/index',
  routes: [{
    routes: [
      { path: '/', component: '@/pages/index' },
      { path: '/test2', component: '@/pages/test2/index' },
      { path: '/test', component: '@/pages/test/index' },
    ],
  }],
}, { component: '@/pages/404' }];
