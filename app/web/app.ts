import { isBrowser } from 'umi';
import { setCookie, getCookie } from '@/utils/cookie';
import { RequestConfig, ErrorShowType } from 'umi';
import Config from './config';
import moment from 'moment';

/**
 *  在运行时扩展语言plugin，语言顺序，cookie > 浏览器默认语言 > 默认语言
 *  切换语言时会同时设置localStorage 和cookie，key保持一致。
 *  封装好了cookie方法，同时试用与服务端和客户端，客户端取cookie的方法
 *  见serverHelper.js，只是将koa的方法进行扩展，koa试用请自行学习
 *  客户端获取cookie的方法见utils/cookie
 *
 */
export const locale = {
  getLocale() {
    let lang;
    if (isBrowser()) {
      const navigatorLang = window.navigator.language.includes('zh')
        ? 'zh-CN'
        : 'en-US';
      /**
       *  最后默认是中文，这里可以根据自身项目需要修改
       *  或者可以将locale单独定义一个config，即给umirc
       *  也可以导入到这里，赋值给默认语言，这样修改一个地方
       *  就可以完成默认语言的修改
       *
       */
      lang = getCookie('umi_locale') || navigatorLang || 'zh-CN';
    } else {
      // @ts-ignore
      lang = getCookie('umi_locale') || global._navigatorLang || 'zh-CN';
    }
    return lang;
  },
  setLocale({ lang, realReload = false, updater }: any) {
    if (!isBrowser()) {
      console.error('---------设置语音失败非浏览器环境--------');
      return;
    }
    if (!lang) {
      console.error('---------必须输入要切换的语言，否则无法切换--------');
      return;
    }
    localStorage.setItem('umi_locale', lang);
    setCookie('umi_locale', lang, null, 10000);
    if (realReload) {
      window.location.reload();
    }
    updater();
  },
};

// moment
if (moment) {
  moment.locale('zh-cn');
}

// dva
export const dva = {
  config: {
    onError(err: any) {
      err.preventDefault();
      console.error(err.message);
    },
  },
};

// request
export const request: RequestConfig = {
  timeout: 5 * 10000,
  errorConfig: {
    adaptor: (preData: any) => {
      let result: any = {
        showType: ErrorShowType.ERROR_MESSAGE,
      };

      try {
        result = {
          ...result,
          errorMessage: preData?.message,
          ...preData,
        };
      } catch (e) {
        result = {
          ...result,
          success: false,
          errorMessage: '响应数据格式解析错误',
        };
      }
      return result;
    },
  },
  middlewares: [
    async (ctx: any, next: any) => {
      await next();
    },
  ],
  requestInterceptors: [
    // 默认请求头
    (url: string, options: any) => {
      url = `${Config.getBaseUrl()}${url}`;
      console.debug('[请求拦截器]::', '附带请求头');
      const defaultOptions = {
        credentials: 'include',
      };
      const newOptions = {
        ...defaultOptions,
        ...options,
      } as any;

      if (Config.isDev()) {
        newOptions.headers['X-Username'] = 'hocgin';
      }

      newOptions.headers = {
        'X-Page-Url': window.location.href,
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json; charset=UTF-8',
        Origin: url,
        ...newOptions.headers,
      };

      return { url, options: newOptions };
    },
  ],
  responseInterceptors: [
    // 认证检查
    (response: Response, options: any) => {
      console.debug('[响应拦截器]::', '认证检查');
      if (response.status === 401) {
        response.clone().json().then(({ redirectUrl }: any) => {
          window.location.href = `${Config.getSsoServerUrl()}?redirectUrl=${
            redirectUrl ?? window.location.href
          }`;
        });
        throw new Error('认证失败');
      }
      return response;
    },
    async (response: Response, options: any) => {
      try {
        await response.clone().json();
      } catch (e) {
        throw new Error('响应数据格式解析错误');
      }
      return response;
    },
  ],
};
