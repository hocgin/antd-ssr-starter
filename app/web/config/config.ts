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
  outputPath: '../public',
  hash: true,
  manifest: {
    fileName: '../../config/manifest.json',
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
