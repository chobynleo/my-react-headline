import React, { Component } from 'react';

import RightCarousel from './Carousel';
import LoadMore from './LoadMore';

import styles from './headline.less';

class RightBody extends Component {
  handleGetMoreNewsData(payload) {
    if (this.props.handleGetMoreNewsData) {
      this.props.handleGetMoreNewsData(payload);
    }
  }
  render() {
    // 轮播图的设置
    const settings = {
      infinite: true, // 是否自动开启轮播
      speed: 2500, // 轮播图速率
      carouselData: this.props.carouselData // 轮播图的数据
    };
    // 每次加载新闻数据的设置
    const newsSettings = {
      pageSize: 10 // 每次加载10条新闻数据
    };
    return (
      <div className={styles.RightBody}>
        <RightCarousel settings={settings} />
        <LoadMore
          newsData={this.props.newsData}
          handleGetMoreNewsData={this.handleGetMoreNewsData.bind(this)}
          newsSettings={newsSettings}
        />
      </div>
    );
  }
}
export default RightBody;
