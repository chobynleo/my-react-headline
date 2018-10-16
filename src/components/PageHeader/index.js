import React, { PureComponent, createElement } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import { Breadcrumb, Tabs, Icon } from 'antd';

import styles from './index.less';

const { TabPane } = Tabs;
/**
 * 针对面包屑功能 必须使用wrapWithPageHeaderLayout 高阶函数，有四中显示来源
 * 来源1： 传递 breadcrumbList 属性，[{ title, href }]
 * 来源2： 主动从redux 中获取菜单数据显示，每个菜单格式为： { name, icon，children }
 * 来源3： 当面包屑中无菜单入口，但存在路由时，增加一个breadcrumb属性，格式为：{ name, icon }
 * 来源4： 当面包屑中无菜单入口、无路由时，可在使用wrapWithPageHeaderLayout,
 *        传递一个一个extraBreadcrumb属性，格式为：{ name , icon ,url  }
 */
export default class PageHeader extends PureComponent {
  static contextTypes = {
    routes: PropTypes.array,
    params: PropTypes.object,
    location: PropTypes.object,
    breadcrumbNameMap: PropTypes.object
  };
  onChange = (key) => {
    if (this.props.onTabChange) {
      this.props.onTabChange(key);
    }
  };
  getBreadcrumbProps = () => {
    return {
      routes: this.props.routes || this.context.routes,
      params: this.props.params || this.context.params,
      location: this.props.location || this.context.location,
      breadcrumbNameMap: this.props.breadcrumbNameMap || this.context.breadcrumbNameMap
    };
  };
  getBreadcrumb = (breadcrumbNameMap, url) => {
    if (breadcrumbNameMap[url]) {
      return breadcrumbNameMap[url];
    }
    const urlWithoutSplash = url.replace(/\/$/, '');
    if (breadcrumbNameMap[urlWithoutSplash]) {
      return breadcrumbNameMap[urlWithoutSplash];
    }
    let breadcrumb = {};
    Object.keys(breadcrumbNameMap).forEach((item) => {
      const itemRegExpStr = `^${item.replace(/:[\w-]+/g, '[\\w-]+')}$`;
      const itemRegExp = new RegExp(itemRegExpStr);
      if (itemRegExp.test(url)) {
        breadcrumb = breadcrumbNameMap[item];
      }
    });
    return breadcrumb;
  };
  getBreadcrumbName = (menus, currentPath) => {
    let currentMenu = {};
    if (menus && menus.length) {
      let child;
      menus.map((_, index) => {
        child = menus[index];
        if (child.path === currentPath) {
          currentMenu = child;
        }
        return null;
      });
    }
    return currentMenu;
  };
  itemRender = (route, params, routes, paths) => {
    const { linkElement = 'a' } = this.props;
    const last = routes.indexOf(route) === routes.length - 1;
    return last || !route.component ? (
      <span>{route.breadcrumbName}</span>
    ) : (
      createElement(
        linkElement,
        {
          href: paths.join('/') || '/',
          to: paths.join('/') || '/'
        },
        route.breadcrumbName
      )
    );
  };
  render() {
    const { routes, params, breadcrumbNameMap } = this.getBreadcrumbProps();
    const {
      title,
      logo,
      action,
      content,
      extraContent,
      location,
      breadcrumbList,
      tabList,
      className,
      linkElement = 'a',
      activeTabKey,
      menus = [],
      extraBreadcrumb
    } = this.props;
    const clsString = classNames(styles.pageHeader, className);
    let breadcrumb;
    if (breadcrumbList && breadcrumbList.length) {
      breadcrumb = (
        <Breadcrumb className={styles.breadcrumb}>
          {breadcrumbList.map((item) => (
            <Breadcrumb.Item key={item.title}>
              {item.href
                ? createElement(
                    linkElement,
                    {
                      [linkElement === 'a' ? 'href' : 'to']: item.href
                    },
                    item.title
                  )
                : item.title}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      );
    } else if (routes && params) {
      breadcrumb = (
        <Breadcrumb
          className={styles.breadcrumb}
          routes={routes.filter((route) => route.breadcrumbName)}
          params={params}
          itemRender={this.itemRender}
        />
      );
    } else if (location && location.pathname) {
      const pathSnippets = location.pathname.split('/').filter((i) => i);
      let currentLevelMenuArray = menus;
      const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        const currentBreadcrumb = this.getBreadcrumb(breadcrumbNameMap, url);
        const { component } = currentBreadcrumb;
        const routerBreadcrumb = currentBreadcrumb.breadcrumb ? currentBreadcrumb.breadcrumb : {};
        const isLinkable = index !== pathSnippets.length - 1 && component;
        currentLevelMenuArray = this.getBreadcrumbName(currentLevelMenuArray, url);
        const { children } = currentLevelMenuArray;
        const name = currentLevelMenuArray.name ? currentLevelMenuArray.name : routerBreadcrumb.name;
        const icon = currentLevelMenuArray.icon ? currentLevelMenuArray.icon : routerBreadcrumb.icon;
        currentLevelMenuArray = children;
        return !currentBreadcrumb.hideInBreadcrumb && name ? (
          <Breadcrumb.Item key={url}>
            <Icon type={icon} />
            {createElement(
              isLinkable ? linkElement : 'span',
              { [linkElement === 'a' ? 'href' : 'to']: `#/${url}` },
              name
            )}
          </Breadcrumb.Item>
        ) : null;
      });
      if (extraBreadcrumb) {
        const { name, icon, url } = extraBreadcrumb;
        extraBreadcrumbItems.push(
          <Breadcrumb.Item key={`${new Date().getTime()}-${name}`}>
            <Icon type={icon} />
            {createElement('span', { [linkElement === 'a' ? 'href' : 'to']: `#/${url}` }, name)}
          </Breadcrumb.Item>
        );
      }
      const breadcrumbItems = extraBreadcrumbItems;
      breadcrumb = <Breadcrumb className={styles.breadcrumb}>{breadcrumbItems}</Breadcrumb>;
    } else {
      breadcrumb = null;
    }

    let tabDefaultValue;
    if (activeTabKey !== undefined && tabList) {
      tabDefaultValue = tabList.filter((item) => item.default)[0] || tabList[0];
    }

    return (
      <div className={clsString}>
        {breadcrumb}
        <div className={styles.detail}>
          {logo && <div className={styles.logo}>{logo}</div>}
          <div className={styles.main}>
            <div className={styles.row}>
              {title && <h1 className={styles.title}>{title}</h1>}
              {action && <div className={styles.action}>{action}</div>}
            </div>
            <div className={styles.row}>
              {content && <div className={styles.content}>{content}</div>}
              {extraContent && <div className={styles.extraContent}>{extraContent}</div>}
            </div>
          </div>
        </div>
        {tabList &&
          tabList.length && (
            <Tabs
              className={styles.tabs}
              defaultActiveKey={tabDefaultValue && tabDefaultValue.key}
              activeKey={activeTabKey}
              onChange={this.onChange}>
              {tabList.map((item) => <TabPane tab={item.tab} key={item.key} />)}
            </Tabs>
          )}
      </div>
    );
  }
}
