import { routerRedux } from 'dva/router';

let _dvaApp = null;

function registerApp(dvaApp) {
  _dvaApp = dvaApp;
  window._dvaApp = dvaApp;
  _dvaApp.routerRedux = routerRedux;
}

function getApp() {
  if (!_dvaApp) {
    throw new Error('请在const app = dva(); 之后 registerApp(app);');
  }
  return _dvaApp;
}

function getStore() {
  return getApp()._store;
}

// 获取history对象(enhancedHistory)，用于push、replace url
function getHistory() {
  // 该history为 react-router-redux 组件 syncHistoryWithStore 封装dva({history})后的 enhancedHistory
  // 等同于每个Page页面的props.history
  return getApp()._history;
}

function dispatch() {
  const _store = getStore();
  // eslint-disable-next-line
  return _store.dispatch(...arguments);
}

// 用于在按需加载的路由中注册model，每个路由根据自己需要注册自己的model
const _cachedRegisterModel = {};

function registerModel(model) {
  if (!_cachedRegisterModel[model.namespace]) {
    getApp().model(model);
    _cachedRegisterModel[model.namespace] = 1;
  }
}

function createActionTypes(ACTION_TYPES_ARRAY) {
  // 将 ActionType 键值设为键名
  if (!(ACTION_TYPES_ARRAY instanceof Array)) {
    return {};
  }
  const ACTION_TYPES = {};
  ACTION_TYPES_ARRAY.forEach(item => {
    ACTION_TYPES[item] = item;
  });
  return ACTION_TYPES;
}

function createAction(type, payload) {
  return {
    type,
    payload,
  };
}

function putAction(put, type, payload) {
  // 貌似不能用全局的put，只能讲model上effects的put传进来
  // import {call, put} from 'redux-saga/effects'
  if (typeof put !== 'function') {
    throw new Error('请将effects中的put作为第一个参数传入！');
  }
  const actionJson = createAction(type, payload);
  return put(actionJson);
}

function createActionWithNamespace(namespace) {
  return function createActionNamespace(type, payload) {
    const newType = namespace ? `${namespace}/${type}` : type;
    return createAction(newType, payload);
  };
}

function createModelActionMethods(namespace) {
  const modelCreateAction = createActionWithNamespace(namespace);

  const modelDispatchAction = function modelDispatchAction(type, payload) {
    return dispatch(modelCreateAction(type, payload));
  };

  return {
    createAction: modelCreateAction,
    dispatchAction: modelDispatchAction,
    putAction,
  };
}

export {
  getHistory,
  registerApp, registerModel,
  createActionTypes, createAction, createActionWithNamespace, createModelActionMethods,
};
