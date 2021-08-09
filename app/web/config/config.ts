import {defineConfig} from 'umi';
import routerConfig from '../router.config';

export default defineConfig({
  ssr: {
    devServerRender: false,
  },
  alias: {
    '@': '/app/web',
    '@@': '/app/web/.umi',
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
  antd: {},
  dva: {
    immer: true,
    // hmr: false,
  },
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
  routes: [...routerConfig],
});
