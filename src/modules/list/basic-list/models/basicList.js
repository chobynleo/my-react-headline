import { query } from '../services/basicList';

export default {
  namespace: 'basicList',

  state: {
    list: []
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(query, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : []
      });
    },
    *appendFetch({ payload }, { call, put }) {
      const response = yield call(query, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : []
      });
    }
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload
      };
    },
    appendList(state, action) {
      return {
        ...state,
        list: state.list.concat(action.payload)
      };
    }
  }
};
