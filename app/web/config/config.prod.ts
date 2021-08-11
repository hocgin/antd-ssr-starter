import {defineConfig} from 'umi';

export default defineConfig({
  ssr: {
    devServerRender: true,
  },
  define: {
    baseUrl: 'http://127.0.0.1:8080',
  },
});
