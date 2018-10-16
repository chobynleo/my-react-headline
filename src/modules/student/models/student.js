import { message } from 'antd';

import BaseService from '../../../utils/baseService';
import { tips, router as routerUtil } from '../../../utils/func';
import Constants from '../../../common/Constants';

import {
  RESOURCE_URL,
  PAGE_QUERY_URL,
  NAMESPACE,
  DICT_KIND_DEMO_STUDENT_CLASS_TYPE,
  DICT_KIND_DEMO_STUDENT_SEX_TYPE,
  SELECT_CLASS_TYPE
} from '../constants/Constants';
import { deleteBatch, queryValidDicts, updeteClassBatch } from '../services/student';

export default {
  /* 命名空间 */
  namespace: 'student',

  /* 状态 */
  state: {
    modalVisible: false, // 当前信息弹出框是否可见
    expandForm: false, // 查询表单是否展开
    editType: Constants.CREATE_TYPE, // 弹出框编辑类型（新增，更新）
    queryConditions: {}, // 当前查询条件
    list: [], // 查询的结果集
    item: {}, // 当前操作学生对象
    pagination: {
      page: Constants.DEFAULT_PAGE, // 查询页码
      pageSize: Constants.DEFAULT_PAGE_SIZE, // 每页显示的数量
      total: Constants.DEFAULT_PAGINATION_TOTAL // 查询数据的总数
    },
    loading: true, // 是否显示加载中标识
    selectedRowKeys: [], // 被选中的Rows的key 组成的数组
    selectedRows: [], // 被选中的Rows的数据源 组成的数组
    studentClassTypes: [], // 学生班级类型字典项，用于Table数据班级翻译和DicSelect字典组件翻译
    studentSexTypes: [] // 学生性别字典项，用于Table数据班级翻译
  },

  /*订阅*/
  subscriptions: {
    setup({ dispatch, history }) {
      routerUtil.subscriptionsHistoryListen(history, `/example/${NAMESPACE.toLowerCase()}`, () => {
        dispatch({ type: 'initQuery' });
      });
    }
  },

  effects: {
    /**
     * 初始查询
     * @param _ 调用需要，无实际意义，避免信息混乱
     * @param put 用于创建effect描述信息， 发起一个action 到 store
     */
    *initQuery(_, { put, call }) {
      // 适用于初始化查询条件（需要从后端请求获取初始化
      // 执行单个call，可以任意数量参数:
      //      const response = yield call(funName, para1, para2);
      // 同时执行多个call：
      //      const [response1, response2]  = yield [call(funName1, , para1, para2), call(funName2, para3, para4)];
      const [studentClassTypes, studentSexTypes] = yield [
        call(queryValidDicts, { kindCode: DICT_KIND_DEMO_STUDENT_CLASS_TYPE }),
        call(queryValidDicts, { kindCode: DICT_KIND_DEMO_STUDENT_SEX_TYPE })
      ];
      yield put({ type: 'initQueryEnd', payload: { studentClassTypes, studentSexTypes } });
      yield put({ type: 'reQuery' });
    },

    /**
     * 重新查询（条件 和分页 都是以当前state保存的为准）
     * @param _  调用需要，无实际意义，避免信息混乱
     * @param put 用于创建effect描述信息， 发起一个action 到 store
     * @param select saga选择器，用于获取state
     */
    *reQuery(_, { put, select }) {
      const studentState = yield select((state) => state[NAMESPACE]);
      const { queryConditions, pagination } = studentState;
      yield put({ type: 'query', payload: { queryConditions, pagination } });
    },

    /**
     * 查询
     * @param payload
     * @param put 用于创建effect描述信息， 发起一个action 到 store
     * @param call 用于创建effect描述信息，调用方法（第一个参数），后续参数作为方法的参数
     */
    *query({ payload }, { put, call }) {
      yield put({ type: 'queryStart' });
      // 发送查询学生请求
      const { queryConditions, pagination } = payload;
      let actionPayload = {};
      try {
        actionPayload = yield call(BaseService.query, PAGE_QUERY_URL, { queryConditions, pagination });
      } catch (error) {
        // 捕获查询过程中的异常，并提示
        message.error(`查询失败${tips.getErrorMsg(error)}`);
      }
      yield put({ type: 'setSelectedRows', payload: { selectedRowKeys: [], selectedRows: [] } });
      yield put({ type: 'queryEnd', payload: actionPayload });
      if (queryConditions) {
        yield put({ type: 'setQueryConditionsEnd', payload });
      }
    },
    /**
     * 打开新增对话框
     * @param payload
     * @param put 用于创建effect描述信息， 发起一个action 到 store
     */
    *openCreateView({ payload }, { put }) {
      yield put({ type: 'openCreateViewEnd', payload });
    },
    /**
     * 打开更新对话框
     * @param payload
     * @param put 用于创建effect描述信息， 发起一个action 到 store
     */
    *openUpdateView({ payload }, { put }) {
      yield put({ type: 'openUpdateViewEnd', payload });
    },
    /**
     * 打开选择班级对话框
     * @param payload
     * @param put 用于创建effect描述信息， 发起一个action 到 store
     */
    *openSelectClassView({ payload }, { put }) {
      yield put({ type: 'openSelectClassViewEnd', payload });
    },
    /**
     * 新增 || 保存
     * @param payload： { editType, item }
     * @param put 用于创建effect描述信息， 发起一个action 到 store
     * @param call 用于创建effect描述信息，调用方法（第一个参数），后续参数作为方法的参数
     */
    *saveOrUpdate({ payload }, { put, call }) {
      let msgPrefix = Constants.CREATE_LABEL;
      const { editType } = payload;
      if (editType === Constants.UPDATE_TYPE) {
        msgPrefix = Constants.UPDATE_LABEL;
      }
      if (editType === SELECT_CLASS_TYPE) {
        msgPrefix = Constants.UPDATE_LABEL;
      }
      try {
        // 新增|| 保存 || 选择班级
        if (editType === SELECT_CLASS_TYPE) {
          yield call(updeteClassBatch, payload);
        } else {
          yield call(BaseService.saveOrUpdate, RESOURCE_URL, payload);
        }
        message.info(`${msgPrefix}成功`);
      } catch (error) {
        // 捕获（新增|| 保存）过程中的异常，并提示
        message.error(`${msgPrefix}失败${tips.getErrorMsg(error)}`);
      }
      // 重新查询
      yield put({ type: 'reQuery' });
    },
    /**
     * 删除
     * @param payload: { id }
     * @param put 用于创建effect描述信息， 发起一个action 到 store
     * @param call 用于创建effect描述信息，调用方法（第一个参数），后续参数作为方法的参数
     */
    *delete({ payload }, { put, call }) {
      const { id } = payload;
      try {
        // 删除
        yield call(BaseService.deleteItem, RESOURCE_URL, { id });
        yield put({ type: 'afterDelete', payload: { deleteRowsNumber: 1 } });
        message.info('删除成功');
      } catch (error) {
        // 捕获删除过程中的异常，并提示
        message.error(`删除失败${tips.getErrorMsg(error)}`);
      }
      // 重新查询
      yield put({ type: 'reQuery' });
    },
    /**
     * 批量删除
     * @param payload { selectedRowKeys }
     * @param put 用于创建effect描述信息， 发起一个action 到 store
     */
    *deleteBatch({ payload }, { put, call }) {
      const { selectedRowKeys } = payload;
      try {
        // 批量删除
        yield call(deleteBatch, payload);
        message.info('删除成功');
        yield put({ type: 'afterDelete', payload: { deleteRowsNumber: selectedRowKeys.length } });
      } catch (error) {
        // 捕获删除过程中的异常，并提示
        message.error(`删除失败${tips.getErrorMsg(error)}`);
      }
      // 重新查询
      yield put({ type: 'reQuery' });
    },
    /**
     * 删除后当前页是否
     * @param payload { deleteRowsNumber }
     * @param put 用于创建effect描述信息， 发起一个action 到 store
     * @param select saga选择器，用于获取state
     */
    *afterDelete({ payload }, { put, select }) {
      const { deleteRowsNumber } = payload;
      const studentState = yield select((state) => state[NAMESPACE]);
      const { list, pagination } = studentState;
      const { page } = pagination;
      if (deleteRowsNumber === list.length) {
        yield put({ type: 'updatePagination', payload: { page: page - 1 ? page - 1 : page } });
      }
    }
  },

  reducers: {
    /**
     * 数据查询过开始，显示加载状态
     * @param state redux中存储的state对象
     * @param action effects或页面发起的action对象
     * @returns {*} 更新后的state对象
     */
    queryStart(state) {
      // 更新state: { loading }
      return Object.assign({}, state, { loading: true });
    },
    initQueryEnd(state, action) {
      const { studentClassTypes, studentSexTypes } = action.payload;
      return Object.assign({}, state, { studentClassTypes, studentSexTypes });
    },
    /**
     * state 中更新此次查询结果集，和分页信息
     * @param state redux中存储的state对象
     * @param action effects或页面发起的action对象
     * @returns {*} 更新后的state对象
     */
    queryEnd(state, action) {
      // 更新state: { list, pagination, loading }
      const { data, pagination } = action.payload;
      return Object.assign({}, state, { list: data, pagination, loading: false });
    },
    /**
     * state 中更新EditDialog 的展示状态为true
     * @param state redux中存储的state对象
     * @param action effects或页面发起的action对象
     * @returns {*} 更新后的state对象
     */
    openCreateViewEnd(state, action) {
      // 更新state: { editType, item, modalVisible }
      const { payload } = action;
      return Object.assign({}, state, { modalVisible: true }, payload);
    },

    /**
     * state 中更新EditDialog 的展示状态为true和当前待编辑的信息
     * @param state redux中存储的state对象
     * @param action effects或页面发起的action对象
     * @returns {*} 更新后的state对象
     */
    openUpdateViewEnd(state, action) {
      // 更新state: { editType, item, modalVisible }
      const { payload } = action;
      return Object.assign({}, state, { modalVisible: true }, payload);
    },
    /**
     * state 中更新EditDialog 的展示状态为true
     * @param state redux中存储的state对象
     * @param action effects或页面发起的action对象
     * @returns {*} 更新后的state对象
     */
    openSelectClassViewEnd(state, action) {
      // 更新state: { editType, item, modalVisible }
      const { payload } = action;
      return Object.assign({}, state, { modalVisible: true }, payload);
    },
    /**
     * state更新当前查询的条件
     * @param state redux中存储的state对象
     * @param action effects或页面发起的action对象
     * @returns {*} 更新后的state对象
     */
    setQueryConditionsEnd(state, action) {
      // 更新state: { queryConditions }
      return Object.assign({}, state, { queryConditions: action.payload.queryConditions });
    },
    /**
     *  保存当前已经选择的Rows 相关信息（selectedRowKeys，selectedRows ）
     * @param state redux中存储的state对象
     * @param action effects或页面发起的action对象
     * @returns {*} 更新后的state对象
     */
    setSelectedRows(state, action) {
      const { selectedRowKeys, selectedRows } = action.payload;
      // 更新state: { selectedRowKeys, selectedRows }
      return Object.assign({}, state, { selectedRowKeys, selectedRows });
    },
    /**
     *  更新当前需要查询页码数
     * @param state
     * @param action effects或页面发起的action对象
     * @returns {*} 更新后的state对象
     */
    updatePagination(state, action) {
      const { page } = action.payload;
      const { pagination } = state;
      pagination.page = page;
      // 更新state: { pagination: { page } }
      return Object.assign({}, state, { pagination });
    },
    /**
     * state 中更新EditDialog 的展示状态为false
     * @param state redux中存储的state对象
     * @returns {*} 更新后的state对象
     */
    closeModal(state) {
      // 更新state: {  modalVisible }
      return Object.assign({}, state, { modalVisible: false, modelVisible_class: false });
    },
    toggleQueryForm(state) {
      return Object.assign({}, state, { expandForm: !state.expandForm });
    },
    toggleTransferModal(state) {
      return Object.assign({}, state, { modelVisible_class: !state.modelVisible_class });
    }
  }
};
