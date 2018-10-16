import React, { PureComponent } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import styles from './index.less';
import '../../resources/images/slider-bg.png'; // 打包主题切换背景图引入，不要去掉

const { Sider } = Layout;
const { SubMenu } = Menu;

// Allow menu.js config icon as string or ReactNode
//   icon: 'setting',
//   icon: 'http://demo.com/icon.png',
//   icon: <Icon type="setting" />,
const getIcon = (icon) => {
  if (typeof icon === 'string' && icon.indexOf('http') === 0) {
    return <img src={icon} alt="icon" className={styles.icon} />;
  }
  if (typeof icon === 'string') {
    return <Icon type={icon} />;
  }
  return icon;
};

export default class SiderMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.menus = props.menuData || [];
    this.state = {
      openKeys: this.getDefaultCollapsedSubMenus(props)
    };
  }
  componentWillReceiveProps(nextProps) {
    this.menus = nextProps.menuData || [];
    // if (nextProps.location.pathname !== this.props.location.pathname) {
    this.setState({
      openKeys: this.getDefaultCollapsedSubMenus(nextProps)
    });
    // }
  }
  getDefaultCollapsedSubMenus(props) {
    const { location: { pathname } } = props || this.props;
    const snippets = pathname.split('/').slice(1, -1);
    const currentPathSnippets = snippets.map((item, index) => {
      const arr = snippets.filter((_, i) => i <= index);
      return arr.join('/');
    });
    let currentMenuSelectedKeys = [];
    currentPathSnippets.forEach((item) => {
      currentMenuSelectedKeys = currentMenuSelectedKeys.concat(this.getSelectedMenuKeys(`/${item}`));
    });
    if (currentMenuSelectedKeys.length === 0) {
      return ['dashboard'];
    }
    return currentMenuSelectedKeys;
  }
  getFlatMenuKeys(menus) {
    let keys = [];
    menus.forEach((item) => {
      if (item.children) {
        keys.push(item.path ? item.path : `/${item.name}`);
        keys = keys.concat(this.getFlatMenuKeys(item.children));
      } else {
        keys.push(item.path ? item.path : `/${item.name}`);
      }
    });
    return keys;
  }
  getSelectedMenuKeys = (path) => {
    const flatMenuKeys = this.getFlatMenuKeys(this.menus);
    if (flatMenuKeys.indexOf(path) > -1) {
      return [path];
    }
    if (flatMenuKeys.indexOf(path.replace(/\/$/, '')) > -1) {
      return [path.replace(/\/$/, '')];
    }
    return flatMenuKeys.filter((item) => {
      const itemRegExpStr = `^${item.replace(/:[\w-]+/g, '[\\w-]+')}$`;
      const itemRegExp = new RegExp(itemRegExpStr);
      return itemRegExp.test(path.replace(/\/$/, ''));
    });
  };
  /**
   * 判断是否是http链接.返回 Link 或 a
   * Judge whether it is http link.return a or Link
   * @memberof SiderMenu
   */
  getMenuItemPath = (item) => {
    const itemPath = this.conversionPath(item.path);
    const icon = getIcon(item.icon);
    const { target, name } = item;
    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          {icon}
          <span>{name}</span>
        </a>
      );
    }
    return (
      <Link
        to={itemPath || '/exception/404'}
        target={target}
        replace={itemPath === this.props.location.pathname}
        onClick={
          this.props.isMobile
            ? () => {
                this.props.onCollapse(true);
              }
            : undefined
        }>
        {icon}
        <span>{name}</span>
      </Link>
    );
  };
  /**
   * get SubMenu or Item
   */
  getSubMenuOrItem = (item) => {
    if (item.children && item.children.some((child) => child.name)) {
      return (
        <SubMenu
          title={
            item.icon ? (
              <span>
                {getIcon(item.icon)}
                <span>{item.name}</span>
              </span>
            ) : (
              item.name
            )
          }
          key={item.key || item.path || item.name}>
          {this.getNavMenuItems(item.children)}
        </SubMenu>
      );
    } else {
      return <Menu.Item key={item.key || item.path || item.name}>{this.getMenuItemPath(item)}</Menu.Item>;
    }
  };
  /**
   * 获得菜单子节点
   * @memberof SiderMenu
   */
  getNavMenuItems = (menusData) => {
    if (!menusData) {
      return [];
    }
    return menusData
      .filter((item) => item.name && !item.hideInMenu)
      .map((item) => {
        return this.getSubMenuOrItem(item);
      })
      .filter((item) => !!item);
  };
  // conversion Path
  // 转化路径
  conversionPath = (path) => {
    if (path && path.indexOf('http') === 0) {
      return path;
    } else {
      return `${path || ''}`.replace(/\/+/g, '/');
    }
  };
  handleOpenChange = (openKeys) => {
    const lastOpenKey = openKeys[openKeys.length - 1];
    const isMainMenu = this.menus.some(
      (item) => lastOpenKey && (item.key === lastOpenKey || item.path === lastOpenKey)
    );
    this.setState({
      openKeys: isMainMenu ? [lastOpenKey] : [...openKeys]
    });
  };
  render() {
    const { logo, title, collapsed, location: { pathname }, onCollapse, maxLength = 6 } = this.props;
    let { mode, layout } = this.props;
    if (!mode) mode = 'inline';
    if (!layout) layout = 'sider';

    const { openKeys } = this.state;
    // Don't show popup menu when it is been collapsed
    const menuProps = collapsed
      ? {}
      : {
          openKeys
        };
    // if pathname can't match, use the nearest parent's key
    let selectedKeys = this.getSelectedMenuKeys(pathname);
    if (!selectedKeys.length) {
      selectedKeys = [openKeys[openKeys.length - 1]];
    }
    let menus2Hidden = [];
    let menus2Show = [];
    const isShowMore = this.menus.length > maxLength && !this.props.isMobile && layout && layout !== 'sider';
    if (isShowMore) {
      menus2Hidden = this.menus.slice(maxLength - 1, this.menus.length);
      menus2Show = this.menus.slice(0, maxLength - 1);
    } else {
      menus2Show = this.menus;
    }

    return layout && layout === 'sider' ? (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="md"
        onCollapse={onCollapse}
        width={256}
        className={styles.sider}>
        <div className={styles.logo} key="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
            <h1>{title}</h1>
          </Link>
        </div>
        <Menu
          key="Menu"
          theme="dark"
          mode={mode}
          {...menuProps}
          onOpenChange={this.handleOpenChange}
          selectedKeys={selectedKeys}
          style={{ padding: '16px 0', width: '100%' }}>
          {this.getNavMenuItems(this.menus)}
        </Menu>
      </Sider>
    ) : (
      <div>
        {this.props.isMobile && [
          <div className={styles.logo} key="logo">
            <Link to="/">
              <img src={logo} alt="logo" />
              <h1>{title}</h1>
            </Link>
          </div>
        ]}
        <Menu
          key="Menu"
          theme="dark"
          mode={mode}
          {...menuProps}
          onOpenChange={this.handleOpenChange}
          selectedKeys={selectedKeys}
          style={{ padding: '9px 0', width: '100%' }}>
          {this.getNavMenuItems(menus2Show)}
          {menus2Show.length && isShowMore ? (
            <SubMenu
              className={styles.menu_more}
              key="more"
              style={{ fontSize: '24px' }}
              title={<Icon type="sg-more" />}>
              {this.getNavMenuItems(menus2Hidden)}
            </SubMenu>
          ) : (
            ''
          )}
        </Menu>
      </div>
    );
  }
}
