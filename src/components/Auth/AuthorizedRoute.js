/**
 * Created by laishuliang on 2017/12/12.
 */
import React from 'react';
import { connect } from 'dva';
import { Route, Redirect } from 'dva/router';
import { auth } from '../../utils/auth';

/**
 * 认证路由。
 * 是对<Route />的二次封装，根据用户登录状态渲染组件或重定向，登录状态使用SessionStorage存储
 */
class AuthorizedRoute extends React.Component {
  render() {
    const { component: Component, ...rest } = this.props;

    let authCheckRedirectUrl = null;
    auth.checkAuth({
      currentLocation: this.props.location,
      onFailure: ({ redirectUrl }) => {
        authCheckRedirectUrl = redirectUrl;
      }
    });
    return (
      <Route
        {...rest}
        render={(props) => {
          return authCheckRedirectUrl === null ? <Component {...props} /> : <Redirect to={authCheckRedirectUrl} />;
        }}
      />
    );
  }
}

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps)(AuthorizedRoute);
