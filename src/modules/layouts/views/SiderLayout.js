import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Icon, message, Spin } from 'antd';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { Route, Redirect, Switch } from 'dva/router';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import { enquireScreen } from 'enquire-js';
import { router } from 'SinoGear';
import GlobalHeader from '../../../components/GlobalHeader';
import GlobalFooter from '../../../components/GlobalFooter';
import SiderMenu from '../../../components/SiderMenu';
import Exception404 from '../../exception/views/404';
import { router as routerUtil, version as VersionUtil } from '../../../utils/func';
import { config } from '../../../common/config';

import logo from '../../../resources/images/sinogear-logo.png';
import styles from './SiderLayout.less';

const { Content } = Layout;

const query = {
  'screen-xs': {
    maxWidth: 575
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199
  },
  'screen-xl': {
    minWidth: 1200
  }
};

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

@connect((state) => ({
  collapsed: state.global.collapsed,
  fetchingNotices: state.global.fetchingNotices,
  notices: state.global.notices,
  menus: state.global.menus,
  loading: state.loading.global,
  currentUser: state.global.currentUser,
  versionItem: state.global.versionItem
}))
class SiderLayout extends React.Component {
  static childContextTypes = {
    location: PropTypes.object,
    breadcrumbNameMap: PropTypes.object,
    menus: PropTypes.array
  };
  state = {
    isMobile
  };
  getChildContext() {
    const { location, routerData, menus } = this.props;
    return {
      location,
      breadcrumbNameMap: routerData,
      menus
    };
  }
  componentWillMount() {
    const { menus } = this.props;
    this.redirectData = routerUtil.getRedirect(menus || []);
  }
  componentDidMount() {
    enquireScreen((b) => {
      this.setState({
        isMobile: !!b
      });
    });
  }
  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = config.name;
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name}`;
    }
    return title;
  }
  handleMenuCollapse = (collapsed) => {
    this.props.dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed
    });
  };
  handleNoticeClear = (type) => {
    message.success(`清空了${type}`);
    this.props.dispatch({
      type: 'global/clearNotices',
      payload: type
    });
  };
  handleMenuClick = ({ key }) => {
    if (key === 'logout') {
      this.props.dispatch({
        type: 'login/logout'
      });
    } else if (key === 'setting') {
      router.go('/setting');
    } else if (key === 'triggerError') {
      router.go('/exception/trigger');
    } else if (key === 'management/personalSetting') {
      router.go('/management/personalSetting');
    }
  };
  handleNoticeVisibleChange = (visible) => {
    if (visible) {
      this.props.dispatch({
        type: 'global/fetchNotices'
      });
    }
  };

  getTitle = () => {
    if (this.props.versionItem && this.props.versionItem.isShowVersion) {
      const showVersion = VersionUtil.getSiderShowVersion(this.props.versionItem.version);
      return `${config.name} ${showVersion}`;
    } else {
      return config.name;
    }
  };

  render() {
    const {
      collapsed,
      fetchingNotices,
      notices,
      routerData,
      match,
      location,
      menus,
      loading,
      currentUser
    } = this.props;

    const title = this.getTitle();

    const layout = (
      <Layout>
        <SiderMenu
          logo={logo}
          title={title}
          menuData={menus}
          collapsed={collapsed}
          location={location}
          isMobile={this.state.isMobile}
          onCollapse={this.handleMenuCollapse}
        />
        <Layout>
          <GlobalHeader
            currentUser={currentUser}
            fetchingNotices={fetchingNotices}
            notices={notices}
            collapsed={collapsed}
            isMobile={this.state.isMobile}
            onNoticeClear={this.handleNoticeClear}
            onCollapse={this.handleMenuCollapse}
            onMenuClick={this.handleMenuClick}
            onNoticeVisibleChange={this.handleNoticeVisibleChange}
          />
          <Content className={this.state.isMobile ? styles.content_mobile : styles.content}>
            <div
              style={{
                minHeight: 'calc(100vh - 260px)',
                width: collapsed ? 'calc(100vw - 128px)' : 'calc(100vw - 290px)'
              }}>
              <Spin spinning={loading} delay={100}>
                <Switch>
                  {this.redirectData.map((item) => <Redirect key={item.from} exact from={item.from} to={item.to} />)}
                  {routerUtil
                    .getRoutes(match.path, routerData)
                    .map((item) => (
                      <Route key={item.key} path={item.path} component={item.component} exact={item.exact} />
                    ))}
                  <Redirect exact from="/" to="/home" />
                  <Route component={Exception404} />
                </Switch>
              </Spin>
            </div>
            <GlobalFooter
              links={[
                {
                  title: 'SinoGear GitBook',
                  href: 'http://192.168.14.47:8002/',
                  blankTarget: true
                },
                {
                  title: 'GitLab',
                  href: 'http://gitlab.ggjs.sinobest.cn/SinoGear/sinogear-frontend-blank',
                  blankTarget: true
                },
                {
                  title: 'SinoGear App',
                  href: 'http://192.168.14.47:8001/',
                  blankTarget: true
                }
              ]}
              copyright={
                <div>
                  Copyright <Icon type="copyright" /> 2017 @华资软件出品
                </div>
              }
            />
          </Content>
        </Layout>
      </Layout>
    );

    return (
      <DocumentTitle title={this.getPageTitle()}>
        <ContainerQuery query={query}>{(params) => <div className={classNames(params)}>{layout}</div>}</ContainerQuery>
      </DocumentTitle>
    );
  }
}

export default SiderLayout;
