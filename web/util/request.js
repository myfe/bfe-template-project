import { message } from 'antd';
import fetch from 'dva/fetch';
import * as $$ from './index';

function requestGlobalConfig(url, options = {}) {
  // 这里可以做一些全局的ajax请求配置
  const newUrl = $$.addUrlQuery(url, {});

  // 全局ajax添加头
  const newOptions = options;
  newOptions.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-CSRFToken': $$.getCookie('csrftoken'),
    ...options.headers,
  };
  // 为了保证ajax中的Set-Cookie可以正常工作
  newOptions.credentials = 'same-origin';

  return {
    url: newUrl,
    options: newOptions,
  };
}

function createBodyString(data) {
  // 以formData（querystring）形式提交
  // const bodyString = querystring.stringify(data);

  // 以JSON形式提交
  return (typeof data === 'string' ? data : JSON.stringify(data));
}

function parseJSON(response) {
  if (!response.redirected) {
    return response.json();
  }
  return response;
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  // if (response.status === 404) {
  //   appHelper.getHistory().replace('/404');
  // }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
function request(url, options) {
  const globalConfig = requestGlobalConfig(url, options);
  return fetch(globalConfig.url, globalConfig.options)
    .then(checkStatus)
    .then(parseJSON)
    .then(d => {
      if (!d.success) {
        message.error(d.msg || '服务器错误');
      }
      return {
        d,
      };
    })
    .catch(err => {
      let shouldToastErrorMessage = true;
      if (err.response && err.response.status === 404) {
        // 404不再弹出错误提示
        shouldToastErrorMessage = false;
      }
      if (shouldToastErrorMessage) {
        message.error(err.message || '服务器错误');
      }
      return { err };
    });
}

async function GET(url, query = {}, options) {
  let urlWithQuery = $$.addUrlQuery(url, query);

  urlWithQuery = await request(urlWithQuery, {
    method: 'GET',
    ...options,
  });
  return urlWithQuery;
}

async function DELETE(url, query = {}, options) {
  let urlWithQuery = $$.addUrlQuery(url, query);

  urlWithQuery = await request(urlWithQuery, {
    method: 'DELETE',
    ...options,
  });
  return urlWithQuery;
}

async function POST(url, data = {}, options) {
  const urlWithQuery = await request(url, {
    method: 'POST',
    body: createBodyString(data),
    ...options,
  });

  return urlWithQuery;
}

async function PATCH(url, data = {}, options) {
  const urlWithQuery = await request(url, {
    method: 'PATCH',
    body: createBodyString(data),
    ...options,
  });

  return urlWithQuery;
}

async function PUT(url, data = {}, options) {
  const urlWithQuery = await request(url, {
    method: 'PUT',
    body: createBodyString(data),
    ...options,
  });

  return urlWithQuery;
}

export {
  request,
  GET,
  POST,
  DELETE,
  PATCH,
  PUT,
};
