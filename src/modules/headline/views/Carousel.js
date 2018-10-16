import React from 'react';

import { interval } from './setInterval';

import styles from './headline.less';

class RightCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.myOlRef = React.createRef(); // 轮播图的ul
    this.myUlRef = React.createRef(); // 轮播菜单的ul
  }
  componentDidUpdate() {
    // 初始化，清空所有线程
    const pro = interval();
    pro.stop();
    // 组件在props更新后，开启定时器
    if (this.props.settings.carouselData && this.props.settings.infinite) {
      const node1 = this.myOlRef.current;
      const node2 = this.myUlRef.current;
      const setting = this.props.settings;
      const pro = interval(node1, node2, setting);
      pro.open(); // 生成定时器
    } else if (this.props.settings.carouselData && !this.props.settings.infinite) {
      // 有图片数据但禁止轮播
      const children1 = this.myOlRef.current.children;
      const children2 = this.myUlRef.current.children;
      // 给ul当前li添加active类
      children1[0].classList.add('slideItemActive___zDHko');
      // 轮播图菜单
      children2[0].classList.add('slideTabItemActive___2nI8P');
    }
  }
  componentWillUnmount() {
    // 组件被销毁的时候清除定时器
    const pro = interval();
    pro.stop(); // 关闭定时器
  }
  handleMouseOver() {
    // 鼠标停留在轮播图时，清除定时器
    const pro = interval();
    pro.stop(); // 关闭定时器
  }

  handleMouseOut() {
    // 鼠标离开轮播图后，开启定时器
    if (this.props.settings.carouselData && this.props.settings.infinite) {
      const node1 = this.myOlRef.current;
      const node2 = this.myUlRef.current;
      const setting = this.props.settings;
      const pro = interval(node1, node2, setting);
      pro.start(); // 开启定时器
    }
  }
  handleLiMouseOver(e) {
    // 鼠标停留在轮播图内导航菜单时，清除定时器
    const pro = interval(null);
    pro.stop(); // 关闭定时器
    // 同时让页面显示与导航菜单对应的图片
    let index = -1;
    const children1 = this.myOlRef.current.children;
    const children2 = this.myUlRef.current.children;
    for (let i = 0; i < children2.length; i++) {
      // 查找所需要显示的下标
      if (e.target.parentNode === children2[i]) {
        index = i;
      }
    }
    // 在第一个ul上先清除所有active类，然后给对应index添加active类
    for (let i = 0; i < children1.length; i++) {
      // 清除所有的li上的active类
      const result = ` ${children1[i].className} `.indexOf(' ' + 'slideItemActive___zDHko' + ' ') > -1;
      if (result) {
        // 当前的li含有active类,则把它清除掉
        children1[i].classList.remove('slideItemActive___zDHko');
        // 轮播图菜单的li actvie类也要清除
        children2[i].classList.remove('slideTabItemActive___2nI8P');
      }
    }
    // 给ul当前li添加active类
    children1[index].classList.add('slideItemActive___zDHko');
    // 轮播图菜单
    children2[index].classList.add('slideTabItemActive___2nI8P');
  }

  handleLiMouseOut() {
    // 鼠标离开轮播图内导航菜单后，生成定时器
    if (this.props.settings.carouselData && this.props.settings.infinite) {
      const node1 = this.myOlRef.current;
      const node2 = this.myUlRef.current;
      const setting = this.props.settings;
      const pro = interval(node1, node2, setting);
      pro.open(); // 开启定时器
    }
  }
  render() {
    const picture =
      this.props.settings.carouselData === undefined ? undefined : this.props.settings.carouselData.picture;
    const items = this.props.settings.carouselData === undefined ? undefined : this.props.settings.carouselData.items;
    // 输出轮播图组件
    let ulComponents = null;
    if (picture) {
      ulComponents = (
        <ul
          ref={this.myOlRef}
          className={styles.slideList}
          onMouseOver={this.handleMouseOver.bind(this)}
          onMouseLeave={this.handleMouseOut.bind(this)}>
          {picture.map((index, i) => {
            return (
              <li key={i} className={styles.slideItem}>
                <a>
                  <img src={index.imgUrl} alt="" />
                  <p className={styles.title}>{index.title}</p>
                </a>
              </li>
            );
          })}
        </ul>
      );
    } else {
      // 没有数据则先输出框模型，让用户看到框架可以耐心等待
      ulComponents = (
        <ul className={styles.slideList}>
          <li className={styles.slideItem}>
            <a>
              <img src="" alt="" />
              <p className={styles.title}>加载中</p>
            </a>
          </li>
          <li className={styles.slideItem}>2</li>
        </ul>
      );
    }
    // 输出菜单组件
    let menuComponents = null;
    if (items) {
      menuComponents = (
        <ul className={styles.slideTab} ref={this.myUlRef}>
          {items.map((index, i) => {
            return (
              <li
                key={i}
                className={styles.slideTabItem}
                onMouseOver={this.handleLiMouseOver.bind(this)}
                onMouseLeave={this.handleLiMouseOut.bind(this)}>
                <div>{index}</div>
              </li>
            );
          })}
        </ul>
      );
    }
    return (
      <div className={styles.carousel}>
        {ulComponents}
        {menuComponents}
      </div>
    );
  }
}
export default RightCarousel;
