import React from 'react';
import { connect } from 'dva';
import { Link, Route, Redirect } from 'dva/router';
import DocumentTitle from 'react-document-title';
import { Icon } from 'antd';
import GlobalFooter from '../../../components/GlobalFooter';
import styles from './UnauthorizedLayout.less';
import { router as routerUtil } from '../../../utils/func';
import { config } from '../../../common/config';

import defaultLogo from './../../../resources/images/sinogear-logo.png';

const links = [
  {
    title: '帮助',
    href: ''
  },
  {
    title: '隐私',
    href: ''
  },
  {
    title: '条款',
    href: ''
  }
];

const copyright = (
  <div>
    Copyright <Icon type="copyright" /> 2017 @华资软件
  </div>
);
@connect((state) => ({
  menus: state.global.menus
}))
class UnauthorizedLayout extends React.PureComponent {
  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = config.name;
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name}`;
    }
    return title;
  }
  render() {
    const { routerData, match, menus } = this.props;
    this.redirectData = routerUtil.getRedirect(routerUtil.formatter(menus) || []);
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className={styles.container}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="" className={styles.logo} src={defaultLogo} />
                <span className={styles.title}>{config.name}</span>
              </Link>
            </div>
            <p className={styles.desc}>--公司级别的应用开发框架产品</p>
          </div>
          {this.redirectData.map((item) => <Redirect key={item.from} exact from={item.from} to={item.to} />)}
          {routerUtil
            .getRoutes(match.path, routerData)
            .map((item) => <Route key={item.key} path={item.path} component={item.component} exact={item.exact} />)}
          <GlobalFooter className={styles.footer} links={links} copyright={copyright} />
        </div>
      </DocumentTitle>
    );
  }
}

export default UnauthorizedLayout;
