import * as appHelper from '../util/appHelper';

// 申明model的命名空间
export const NAMESPACE = 'home';

// 声明model的所有ACTION类型
export const ACTION_TYPES = appHelper.createActionTypes([
  'add',
  'delete',
  'update',
  'saveEnv',
  'fetchEnv',
]);

// 创建model的操作action快捷方法
export const {
  createAction,
  dispatchAction,
  putAction,
} = appHelper.createModelActionMethods(NAMESPACE);
