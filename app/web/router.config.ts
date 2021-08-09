export default [{
  path: '/',
  component: '@/layouts/index',
  routes: [{
    routes: [
      {path: '/', component: '@/pages/index'},
      {path: '/test', component: '@/pages/test/index'}
    ],
  }]
}, {component: '@/pages/404'}];
