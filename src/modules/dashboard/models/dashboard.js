import { config } from '../../../common/config';

export default {

  namespace: 'dashboard',

  state: {
    query: ''
  },

  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'query' });
    }
  },

  effects: {
    *query({ payload }, { put }) {
      yield put({
        type: 'querySuccess',
        payload: {
          ...payload,
          query: config.name
        }
      });
    }
  },

  reducers: {
    querySuccess(state, { payload }) {
      return Object.assign({}, state, payload);
    }
  }
};

