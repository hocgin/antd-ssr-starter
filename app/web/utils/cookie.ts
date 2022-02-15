import { isBrowser } from 'umi';

const setCookie = (name: string, value: any, path: any, days: number) => {
  if (!isBrowser()) {
    return;
  }
  const Days = days || 30;
  const exp: any = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  if (path) {
    document.cookie = `${name}=${encodeURIComponent(
      value,
    )};path=${path};expires=${exp.toGMTString()}`;
  } else {
    document.cookie = `${name}=${encodeURIComponent(
      value,
    )};expires=${exp.toGMTString()}`;
  }
};

const getCookie = (name: string) => {
  let cookie;
  if (!isBrowser()) {
    // 这里需要在服务端处理好cookie，处理成{key:value}
    // @ts-ignore
    cookie = global._cookies[name] || null;
  } else {
    const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
    const arr = document.cookie.match(reg);
    if (arr) {
      cookie = decodeURIComponent(arr[2]);
    }
  }
  return cookie;
};

export { setCookie, getCookie };
