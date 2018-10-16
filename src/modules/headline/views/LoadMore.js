import React, { Component } from 'react';

import styles from './headline.less';

class LoadMore extends Component {
  state = {
    count: 1 // 当前控制下拉请求加载新闻数据的次数，因为初始化，默认一次，
  };
  componentDidMount() {
    // 开始监听
    this.startScrollListener();
  }
  componentWillReceiveProps() {
    this.startScrollListener();
  }
  componentWillUnmount() {
    // 卸载取消监听
    this.startScrollListener();
  }
  /**
   * 监听滚动条事件
   */
  listener = () => {
    // 关系是 scrollHeight = scrollTop + clientHeight
    // 变量s就是为内容可视区域的高度加上溢出（滚动）的距离。
    // 变量t就是滚动条在Y轴上的滚动距离。
    // 变量c就是内容可视区域的高度。
    const s = document.documentElement.scrollHeight;
    const t = document.documentElement.scrollTop || document.body.scrollTop;
    const c = document.documentElement.clientHeight;
    const isTrue = s - (t + c) <= 100;
    // isTrue表示滚动条离底部<100为真
    if (isTrue) {
      // 先停止监听，防止一直发送action
      this.stopScrollListener();
      // 加载更多数据
      if (this.props.handleGetMoreNewsData) {
        const payload = {
          pageSize: this.props.newsSettings.pageSize,
          currentPage: this.state.count
        };
        this.props.handleGetMoreNewsData(payload);
        this.setState({ count: this.state.count + 1 });
      }
    }
  };
  /**
   * 开始监听滚动条
   */
  startScrollListener = () => {
    window.addEventListener('scroll', this.listener);
  };
  /**
   * 停止监听滚动条
   */
  stopScrollListener = () => {
    window.removeEventListener('scroll', this.listener);
  };
  render() {
    const newDataArr = this.props.newsData;
    let ul = null;
    if (newDataArr) {
      ul = (
        <ul>
          {newDataArr.map((index, i) => {
            return (
              <li key={i}>
                <div className={(styles.buiBox, styles.singleMode)}>
                  <div className={(styles.fl, styles.singleModeLBox)}>
                    <a className={styles.imgWrap}>
                      <img src={index.images} />
                    </a>
                  </div>
                  <div className={(styles.fl, styles.singleModeRBox)}>
                    <div className={styles.singleModeRBoxInner}>
                      <div className={styles.titleBox}>
                        <a className={styles.link}>{index.title}</a>
                      </div>
                      <div className={styles.footerBar}>
                        <div className={styles.footerBarLeft}>
                          <a className={styles.other}>{index.other}</a>
                          <a className={styles.mediaAvatar}>
                            <img src={index.mediaAvatar} />
                          </a>
                          <a className={styles.source}>&nbsp;{index.media}&nbsp;</a>
                          <a className={styles.source}>&nbsp;{index.number}评论&nbsp;</a>
                          <span className={styles.footerBarAction}>&nbsp;{index.hour}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      );
    }
    return (
      <div className={styles.loadMore}>
        <div className={styles.msgAlertPlace}>
          <div className={styles.msgAlert}>
            <span>您有未读新闻，点击查看</span>
          </div>
        </div>
        {ul}
      </div>
    );
  }
}
export default LoadMore;
