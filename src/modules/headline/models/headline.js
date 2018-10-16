import { getMenuResource, getCarouselResource, getNewsResource } from '../services/headline';
import { router as routerUtil } from '../../../utils/func';
import { NAMESPACE } from '../constants/Constants';

export default {
  /* 命名空间 */
  namespace: 'headline',

  /* 状态 */
  state: {
    list: [], // 查询的结果集

    menuData: [], // 左侧菜单栏数据
    carouselPicData: [], // 走马灯图片数据
    newsData: [] // 新闻数据
  },

  /* 订阅 */
  subscriptions: {
    // ?? 不理解这段的意思
    setup({ dispatch, history }) {
      routerUtil.subscriptionsHistoryListen(history, `/example/${NAMESPACE.toLowerCase()}`, () => {
        dispatch({ type: 'initData' });
      });
    }
  },

  effects: {
    /**
     * 页面初始化，请求数据
     * @param
     * */
    *initData(_, { put, call }) {
      // 适用于初始化查询条件（需要从后端请求获取初始化
      // 执行单个call，可以任意数量参数:
      //      const response = yield call(funName, para1, para2);
      // 同时执行多个call：
      //      const [response1, response2]  = yield [call(funName1, , para1, para2), call(funName2, para3, para4)];
      const [menuResourse, carouselResource, newsResource] = yield [
        call(getMenuResource),
        call(getCarouselResource),
        call(getNewsResource, { pageSize: 10, currentPage: 1 })
      ];
      yield put({ type: 'initDataEnd', payload: { menuResourse, carouselResource, newsResource } });
    },
    /**
     * 获取更多数据
     * @param payload
     * @param put 用于创建effect描述信息， 发起一个action 到 store
     */
    *getMoreNewsData({ payload }, { put, call }) {
      console.log('来了', payload);
      //      const [response1, response2]  = yield [call(funName1, , para1, para2), call(funName2, para3, para4)];
      const [newsResource] = yield [call(getNewsResource, payload)];
      yield put({ type: 'getMoreNewsDataEnd', payload: { newsResource } });
    }
  },

  reducers: {
    /**
     * state 中更新此次查询结果集，和分页信息
     * @param state redux中存储的state对象
     * @param action effects或页面发起的action对象
     * @returns {*} 更新后的state对象
     */
    initDataEnd(state, action) {
      return Object.assign({}, state, {
        menuData: action.payload.menuResourse,
        carouselData: action.payload.carouselResource,
        newsData: action.payload.newsResource
      });
    },
    /**
     * state 中更新newsData
     * @param state redux中存储的state对象
     * @param action effects或页面发起的action对象
     * @returns {*} 更新后的state对象
     */
    getMoreNewsDataEnd(state, action) {
      // 更新state: { menuData, carouselData, newsData }
      const resource = action.payload.newsResource;
      const data = state.newsData;
      const newsData = [...data, ...resource];
      return Object.assign({}, state, { newsData });
    }
  }
};
