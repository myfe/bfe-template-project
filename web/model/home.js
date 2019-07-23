import Immutable from 'immutable';
import * as homeMeta from './home.meta';
import * as homeService from '../service/home';

const actionTypes = homeMeta.ACTION_TYPES;

function getIndexByContent(state, value) {
  const foundKeys = [];
  state.get('todoList').forEach((item, key) => {
    if (item.get('content') === value) {
      foundKeys.push(key);
    }
  });
  return foundKeys;
}

export default {
  namespace: homeMeta.NAMESPACE,
  // initialState 注意，这里统一使用Immutable生成数据
  state: Immutable.fromJS({
    env: '',
    todoList: [{
      checked: true,
      content: 'todolist示例1'
    }, {
      checked: false,
      content: 'todolist示例2'
    }],
  }),
  // pure function called by action
  // (state,action) => newState
  reducers: {
    [actionTypes.add](state, { payload }) {
      return state.updateIn(['todoList'], list => Immutable.fromJS([payload]).concat(list));
    },
    [actionTypes.delete](state, { payload }) {
      const foundKeys = getIndexByContent(state, payload.content);
      let newState = state;
      foundKeys.forEach(key => {
        newState = newState.deleteIn(['todoList', key]);
      });
      return newState;
    },
    [actionTypes.update](state, { payload }) {
      const foundKeys = getIndexByContent(state, payload.content);
      let newState = state;
      foundKeys.forEach(key => {
        newState = newState.setIn(['todoList', key], Immutable.fromJS(payload));
      });
      return newState;
    },
    [actionTypes.saveEnv](state, { payload }) {
      const newState = state.update('env', () => payload);
      return newState;
    },
  },

  // methods triggered by action
  effects: {
    * [actionTypes.fetchEnv]({ payload }, { call, put }) {
      // 调用服务器api查询
      const data = yield call(homeService.fetchEnv, payload);
      // 将结果保存到state
      if (data) {
        yield put({ type: actionTypes.saveEnv, payload: data });
      }
    },
  },
};
