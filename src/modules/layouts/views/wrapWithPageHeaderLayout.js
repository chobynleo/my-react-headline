import React, { Component } from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';

import PageHeader from '../../../components/PageHeader';
import styles from './wrapWithPageHeaderLayout.less';

export const wrapWithPageHeaderLayout = (WrappedComponent, pageHeaderProps = {}) => {
  @connect((state) => ({
    menus: state.global.menus
  }))
  class PageHeaderLayout extends Component {
    render() {
      const { wrapperClassName, top, ...restProps } = Object.assign(pageHeaderProps, this.props);
      return (
        <div className={`${wrapperClassName} ${styles.pageHeaderContainer}`}>
          {top}
          <PageHeader {...restProps} linkElement={Link} />
          <div className={styles.content}>
            <WrappedComponent />
          </div>
        </div>
      );
    }
  }
  return PageHeaderLayout;
};
