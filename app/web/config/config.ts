import {defineConfig} from 'umi';

export default defineConfig({
  ssr: {
    devServerRender: false,
  },
  define: {
    baseUrl: 'http://127.0.0.1:8080',
  },
  hash: true,
  outputPath: '../public',
  manifest: {
    fileName: '../../config/manifest.json',
    // 为 ''，不然会有两个 /
    publicPath: '',
  },
  locale: {
    default: 'zh-CN',
    antd: false,
    title: false,
    baseNavigator: true,
    baseSeparator: '-',
  },
  dva: {
    immer: true,
    // hmr: false,
  },
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
  routes: [
    {path: '/', component: '@/pages/index'},
    {path: '/test', component: '@/pages/test/index'}
  ],
});
