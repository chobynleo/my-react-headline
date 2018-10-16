import React, { Component } from 'react';
import { connect } from 'dva';
import { Route, Switch, Redirect } from 'dva/router';
import AuthorizedRoute from '../../../components/Auth/AuthorizedRoute';
import { getRouterData } from '../../../common/router';

@connect((state) => ({
  layout: state.global.layout
}))
class Layout extends Component {
  render() {
    const { app, layout } = this.props;
    const routerData = getRouterData(app);
    const UnauthorizedLayout = routerData[`/unused/${layout['/user']}`].component;
    const BasicLayout = routerData[`/unused/${layout['/']}`].component;
    return (
      <div>
        <Switch>
          <Route path="/user" component={UnauthorizedLayout} />
          <AuthorizedRoute path="/" component={BasicLayout} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default Layout;
