import { query, remove, add } from '../services/tableList';

export default {
  namespace: 'tableList',
  state: {
    data: {
      list: [],
      pagination: {}
    }
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(query, payload);
      yield put({
        type: 'save',
        payload: response
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(add, payload);
      yield put({
        type: 'save',
        payload: response
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(remove, payload);
      yield put({
        type: 'save',
        payload: response
      });
      if (callback) callback();
    }
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload
      };
    }
  }
};
