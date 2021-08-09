import Config from '../config';
import hash from 'hash.js';

export default function Request(
  url,
  options,
) {
  url = `${Config.getBaseUrl()}${url}`;

  const defaultOptions = {
    credentials: 'include',
  };
  const newOptions = { ...defaultOptions, ...options };

  if (
    newOptions.method === 'POST' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'DELETE'
  ) {

    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };

      newOptions.headers['X-Page-Url'] = window.location.href;
      newOptions.headers['X-Requested-With'] = 'XMLHttpRequest';
      newOptions.headers['Content-Type'] = 'application/json; charset=UTF-8';
      newOptions.headers['Origin'] = url;
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    }
  }

  // 设置
  // let token = localStorage.getItem(LOCAL_STORAGE.USER_TOKEN);
  // if (token && !`${url}`.includes('/login')) {
  //   newOptions.headers = {
  //     ...newOptions.headers,
  //     Authorization: `Bearer ${token}`,
  //   };
  // }

  // 请求缓存
  const fingerprint = url + (options.body ? JSON.stringify(options.body) : '');
  const hashcode = hash.sha256()
    .update(fingerprint)
    .digest('hex');
  const expirys = options.expirys && 60;
  if (options.expirys !== false) {
    const cached = sessionStorage.getItem(hashcode);
    const whenCached = sessionStorage.getItem(`${hashcode}:timestamp`);
    if (cached !== null && whenCached !== null) {
      const age = (Date.now() - whenCached) / 1000;
      if (age < expirys) {
        const response = new Response(new Blob([cached]));
        return response.json();
      }
      sessionStorage.removeItem(hashcode);
      sessionStorage.removeItem(`${hashcode}:timestamp`);
    }
  }

  return fetch(url, newOptions)
    .then(response => cachedSave(response, hashcode))
    // 响应状态检查
    .then((response) => {
      if (Config.isDev()) {
        console.log(`${response.status}:[请求地址]:${response.url}`);
      }
      if (response.status >= 200 && response.status < 500) {
        return response;
      }

      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    })
    // 响应结果转JSON
    .then(response => {
      return response.json();
    })
    // 异常响应处理
    .catch((e) => {
      console.log('[请求出现异常]', e);
    });
};

/**
 * 结果缓存
 * @param response
 * @param hashcode
 * @returns {*}
 */
const cachedSave = (response, hashcode) => {
  /**
   * Clone a response data and store it in sessionStorage
   * Does not support data other than json, Cache only json
   */
  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.match(/application\/json/i)) {
    // All data is saved as text
    response
      .clone()
      .text()
      .then(content => {
        sessionStorage.setItem(hashcode, content);
        sessionStorage.setItem(`${hashcode}:timestamp`, Date.now());
      });
  }
  return response;
};
