import React from 'react';
import { Router, Route } from 'dva/router';
import { LocaleProvider, Spin } from 'antd';
import { router } from 'SinoGear';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';
import { getRouterData } from './common/router';

import styles from './index.less';

dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large" className={styles.globalSpin} />;
});

function RouterConfig({ history, app }) {
  router.register(history);
  const routerData = getRouterData(app);
  const Layout = routerData['/'].component;

  return (
    <LocaleProvider locale={zhCN}>
      <Router history={history}>
        <Route path="/" render={(props) => <Layout {...props} app={app} />} />
      </Router>
    </LocaleProvider>
  );
}

export default RouterConfig;
