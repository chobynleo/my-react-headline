import React, { PureComponent } from 'react';
import { Layout, Menu, Icon, Spin, Tag, Dropdown, Avatar } from 'antd';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import Debounce from 'lodash-decorators/debounce';
import { Link } from 'dva/router';
import NoticeIcon from '../NoticeIcon';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';

import defaultLogo from '../../resources/images/sinogear-logo.png';

const { Header } = Layout;
const dimensionMap = {
  xs: '480px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1600px'
};

export default class GlobalHeader extends PureComponent {
  constructor(props) {
    super();
    let matchMedia = '';
    if (typeof window !== 'undefined') {
      matchMedia = window.matchMedia; // eslint-disable-line
    }
    const { breakpoint } = props;
    if (matchMedia && breakpoint && breakpoint in dimensionMap) {
      this.mql = matchMedia(`(max-width: ${dimensionMap[breakpoint]})`);
    }
    window.onresize = (domEvent) => {
      const { onScreenChange } = this.props;
      const { clientWidth, clientHeight } = document.body;
      if (onScreenChange) {
        onScreenChange(domEvent, clientWidth, clientHeight);
      }
    };
  }
  componentDidMount() {
    if (this.mql) {
      this.mql.addListener(this.responsiveHandler);
      this.responsiveHandler(this.mql);
    }
  }
  componentWillUnmount() {
    if (this.mql) {
      this.mql.removeListener(this.responsiveHandler);
    }
    this.triggerResizeEvent.cancel();
  }
  getNoticeData() {
    const { notices = [] } = this.props;
    if (notices.length === 0) {
      return {};
    }
    const newNotices = notices.map((notice) => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      // transform id to item key
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold'
        }[newNotice.status];
        newNotice.extra = (
          <Tag color={color} style={{ marginRight: 0 }}>
            {newNotice.extra}
          </Tag>
        );
      }
      return newNotice;
    });
    return groupBy(newNotices, 'type');
  }
  responsiveHandler = (mql) => {
    const { collapsed, onCollapse } = this.props;
    if (collapsed !== mql.matches && onCollapse) {
      onCollapse(true);
    }
  };
  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    this.triggerResizeEvent();
  };
  @Debounce(600)
  triggerResizeEvent() {
    // eslint-disable-line
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }
  render() {
    const {
      currentUser,
      collapsed,
      fetchingNotices,
      isMobile,
      logo,
      onNoticeVisibleChange,
      onMenuClick,
      onNoticeClear,
      renderMenu,
      className,
      isNav = false,
      title = ''
    } = this.props;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item key="management/personalSetting">
          <Icon type="user" />个人中心
        </Menu.Item>
        <Menu.Item key="setting">
          <Icon type="setting" />设置
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="triggerError">
          <Icon type="close-circle" />触发报错
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" />退出登录
        </Menu.Item>
      </Menu>
    );
    const noticeData = this.getNoticeData();
    return (
      <Header className={`${styles.header} ${className}`}>
        <div className={isMobile ? styles.left_float : styles.left}>
          {!isMobile &&
            logo && [
              <Link to="/" className={styles.logo} key="logo">
                <img src={logo || defaultLogo} alt="logo" width="32" />
              </Link>,
              <Link to="/" key="title">
                <h1 className={styles.title}>{title}</h1>
              </Link>
            ]}
          {(!isNav || isMobile) && (
            <Icon className={styles.trigger} type={collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle} />
          )}
          <div className={styles.nav_menu}>{renderMenu && renderMenu()}</div>
        </div>

        <div className={styles.right}>
          <HeaderSearch
            className={`${styles.action} ${styles.search}`}
            placeholder="站内搜索"
            dataSource={['搜索提示一', '搜索提示二', '搜索提示三']}
            onSearch={(value) => {
              console.log('input', value); // eslint-disable-line
            }}
            onPressEnter={(value) => {
              console.log('enter', value); // eslint-disable-line
            }}
          />
          <NoticeIcon
            className={styles.action}
            count={currentUser.notifyCount}
            onItemClick={(item, tabProps) => {
              console.log(item, tabProps); // eslint-disable-line
            }}
            onClear={onNoticeClear}
            onPopupVisibleChange={onNoticeVisibleChange}
            loading={fetchingNotices}
            popupAlign={{ offset: [20, -16] }}>
            <NoticeIcon.Tab
              list={noticeData['通知']}
              title="通知"
              emptyText="你已查看所有通知"
              emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
            />
            <NoticeIcon.Tab
              list={noticeData['消息']}
              title="消息"
              emptyText="您已读完所有消息"
              emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
            />
            <NoticeIcon.Tab
              list={noticeData['待办']}
              title="待办"
              emptyText="你已完成所有待办"
              emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
            />
          </NoticeIcon>
          {currentUser.name ? (
            <Dropdown overlay={menu} trigger={['hover', 'click']}>
              <span className={`${styles.action} ${styles.account}`}>
                <Avatar
                  size="small"
                  className={styles.avatar}
                  src={currentUser.userAvatarUrl}
                  key={currentUser.userAvatarKey}
                />
                <span className={styles.name}>{currentUser.name}</span>
              </span>
            </Dropdown>
          ) : (
            <Spin size="small" style={{ marginLeft: 8 }} />
          )}
        </div>
      </Header>
    );
  }
}
