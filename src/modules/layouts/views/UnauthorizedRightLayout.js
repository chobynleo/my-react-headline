import React from 'react';
import { Link, Route, Redirect } from 'dva/router';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import styles from './UnauthorizedRightLayout.less';
import { router as routerUtil } from '../../../utils/func';
import { config } from '../../../common/config';

import defaultLogo from './../../../resources/svg/logo_SinoGear4.svg';

@connect((state) => ({
  menus: state.global.menus
}))
class UnauthorizedRightLayout extends React.PureComponent {
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
    const { routerData = [], match, location, menus } = this.props;
    this.redirectData = routerUtil.getRedirect(menus || []);
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className={styles.container}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <div>
                  <img alt="" className={styles.logo} src={defaultLogo} />
                </div>
                <div className={styles.title}>SinoGear</div>
                <div className={styles.logo_text}>赛姬</div>
              </Link>
            </div>
          </div>
          <div className={styles.login_form}>
            {location.pathname === match.path
              ? this.redirectData.map((item) => <Redirect key={item.from} exact from={item.from} to={item.to} />)
              : ''}
            {routerUtil
              .getRoutes(match.path, routerData)
              .map((item) => <Route key={item.key} path={item.path} component={item.component} exact={item.exact} />)}
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default UnauthorizedRightLayout;
