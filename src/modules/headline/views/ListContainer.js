import React, { Component } from 'react';
// dva封装的redux 数据管理
import { connect } from 'dva';

// Antd的组件使用引入
import { Layout } from 'antd';

import { NAMESPACE } from '../constants/Constants';
import LeftMenu from './LeftMenu';
import RightBody from './RightBody';
import { wrapWithPageHeaderLayout } from '../../layouts/views/wrapWithPageHeaderLayout';

import styles from './headline.less';

const { Content } = Layout;
const content = '本模块为今日头条演示模块，通过代理从今日头条API后台获取数据，包含基本的数据下拉加载，轮播等功能';

// 定义页面
class ListContainer extends Component {
  /**
   * 加载更多数据，且当前操作为：Constants.CREATE_TYPE
   * （点击"新增"按钮触发）
   */
  handleGetMoreNewsData = (payload) => {
    // dispatch 一个action请求, action格式为： {type:"类型"， payload: {数据对象}}
    // "类型" 为: 命名空间/effects下方法名
    this.props.dispatch({
      type: `${NAMESPACE}/getMoreNewsData`,
      payload: { payload }
    });
  };
  render() {
    return (
      <div>
        <Content className={styles.headline}>
          <LeftMenu menuData={this.props.menuData} />
          <RightBody
            carouselData={this.props.carouselData}
            newsData={this.props.newsData}
            handleGetMoreNewsData={this.handleGetMoreNewsData}
          />
        </Content>
      </div>
    );
  }
}

// 将状态state中的数据转为参数,传递给页面
const mapStateToProps = ({ headline }) => ({
  menuData: headline.menuData, // 左侧菜单栏数据
  carouselData: headline.carouselData, // 走马灯数据
  newsData: headline.newsData // 新闻数据
});

// 页面出口
export default wrapWithPageHeaderLayout(connect(mapStateToProps)(ListContainer), { title: '今日头条', content });
