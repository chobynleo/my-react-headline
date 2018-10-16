import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { fakeSubmitForm } from '../services/stepForm';

export default {
  namespace: 'stepForm',

  state: {
    step: {
      payAccount: 'ant-design@alipay.com',
      receiverAccount: 'test@example.com',
      receiverName: 'Alex',
      amount: '500'
    }
  },

  effects: {
    *submitStepForm({ payload }, { call, put }) {
      /* yield call(fakeSubmitForm, payload);*/
      yield put({
        type: 'saveStepFormData',
        payload
      });
      yield put(routerRedux.push('/form/step-form/result'));
    }
  },

  reducers: {
    saveStepFormData(state, { payload }) {
      return {
        ...state,
        step: {
          ...state.step,
          ...payload
        }
      };
    }
  }
};
