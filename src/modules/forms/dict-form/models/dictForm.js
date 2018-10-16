import { getFormDatas, getProjectSimpleName } from '../services/dicForm';

export default {
  namespace: 'dictForms',
  state: {
    formData: [],
    ProjectSimpleName: [],
    page: 1,
    pageSize: 10,
    total: 0
  },
  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({ type: 'getFormData' });
    }
  },
  effects: {
    *getFormData(_, { call, put }) {
      const formData = yield call(getFormDatas);
      yield put({
        type: 'getProjectSimpleName',
        payload: { page: 1, pageSize: 10 }
      });
      yield put({
        type: 'getFormDataEnd',
        payload: formData
      });
    },
    *getProjectSimpleName({ payload }, { call, put }) {
      const data = yield call(getProjectSimpleName, payload);
      yield put({
        type: 'getProjectSimpleNameEnd',
        payload: data
      });
    }
  },
  reducers: {
    getFormDataEnd(state, { payload }) {
      return {
        ...state,
        formData: payload
      };
    },
    getProjectSimpleNameEnd(state, { payload }) {
      return {
        ...state,
        projectSimpleName: payload.data,
        total: payload.pagination.total,
        page: payload.pagination.page,
        pageSize: payload.pagination.pageSize
      };
    }
  }
};
