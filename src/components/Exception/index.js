import React, { createElement, Component } from 'react';
import classNames from 'classnames';
import { Button } from 'antd';
import { router } from 'SinoGear';

import config from './typeConfig';
import styles from './index.less';

class Exception extends React.Component {
  constructor() {
    super();
    this.state = { time: 5 };
  }
  componentDidMount() {
    if (this.props.type === '401') {
      this.autoRedirectLogin();
    }
  }

  autoRedirectLogin = () => {
    const time = this.state.time;
    if (time - 1 <= 0) {
      this.goLogin();
    } else {
      const self = this;
      this.setState({ time: time - 1 }, () => {
        self.timeId = setTimeout(self.autoRedirectLogin, 1000);
      });
    }
  };

  goLogin = () => {
    router.go('/user/login');
  };

  render() {
    const { className, linkElement = 'a', type, title, desc, img, actions, ...rest } = this.props;
    const pageType = type in config ? type : '404';
    const clsString = classNames(styles.exception, className);
    return (
      <div className={clsString} {...rest}>
        <div className={styles.imgBlock}>
          <div className={styles.imgEle} style={{ backgroundImage: `url(${img || config[pageType].img})` }} />
        </div>
        <div className={styles.content}>
          <h1>{title || config[pageType].title}</h1>
          <div className={styles.desc}>{desc || config[pageType].desc}</div>
          <div className={styles.actions}>
            {actions ||
              createElement(
                linkElement,
                {
                  to: type === '401' ? '/user/login' : '/',
                  href: type === '401' ? '/user/login' : '/'
                },
                <Button type="primary">{type === '401' ? '返回登录页面' : '返回首页'}</Button>
              )}
          </div>
        </div>
      </div>
    );
  }
}

export default Exception;

/*
export default () => {
  const pageType = type in config ? type : '404';
  const clsString = classNames(styles.exception, className);
  return (
    <div className={clsString} {...rest}>
      <div className={styles.imgBlock}>
        <div
          className={styles.imgEle}
          style={{ backgroundImage: `url(${img || config[pageType].img})` }}
        />
      </div>
      <div className={styles.content}>
        <h1>{title || config[pageType].title}</h1>
        <div className={styles.desc}>{desc || config[pageType].desc}</div>
        <div className={styles.actions}>
          {
            actions ||
              createElement(linkElement, {
                to: '/',
                href: '/',
              }, <Button type="primary">返回首页</Button>)
          }
        </div>
      </div>
    </div>
  );
};
*/
