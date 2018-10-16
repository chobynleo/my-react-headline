import React, { Component } from 'react';

import styles from './headline.less';

class LeftMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.indexChannel = React.createRef(); // 固定层
    this.channel = React.createRef(); // fixed层
  }
  componentDidMount() {
    // 开始监听
    this.startScrollListener();
  }
  componentWillUnmount() {
    // 卸载取消监听
    this.stopScrollListener();
  }
  /**
   * 监听滚动条事件
   */
  listener = () => {
    // 变量t就是滚动条在Y轴上的滚动距离。
    // 变量o就是今日头条div元素距离body的距离，因为样式添加margin:30px，那么这里也要算上去。
    // 变量c就是表示fixed层的元素
    const t = document.documentElement.scrollTop || document.body.scrollTop;
    const o = this.indexChannel.current.offsetTop + 30;
    const c = this.channel.current;
    if (t > o) {
      // 表示需要左侧菜单需要跟着一起动，需要给它加上fixed类
      c.classList.add('fixed___3NYDh');
    } else {
      // 默认样式，去掉fixed类
      c.classList.remove('fixed___3NYDh');
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
    const imgUrl = this.props.menuData.logoPic === undefined ? '/' : this.props.menuData.logoPic;
    const items = this.props.menuData.items === undefined ? [] : this.props.menuData.items;
    let ul = null;
    if (items) {
      ul = (
        <ul>
          {items.map((index, i) => {
            return (
              <li key={i}>
                <a className={styles.channelItem}>
                  <span>{index}</span>
                </a>
              </li>
            );
          })}
        </ul>
      );
    }
    return (
      <div className={styles.indexChannel} ref={this.indexChannel}>
        <div className={styles.channel} ref={this.channel}>
          <div>
            <a href="/" className={styles.logo}>
              <img src={imgUrl} alt="今日头条" />
            </a>
          </div>
          {ul}
        </div>
      </div>
    );
  }
}
export default LeftMenu;
