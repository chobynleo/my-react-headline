import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button, Row, Form, Input, Radio, Icon } from 'antd';
import styles from './Login.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class Login extends Component {
  handleLogin = () => {
    const props = this.props;
    const { validateFieldsAndScroll } = props.form;
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      }
      if (values.psw === 'psw') {
        props.dispatch({ type: 'login/loginByOAuthWithPSW', payload: values }); // oauth password登录认证
      } else if (values.psw === 'proxyPsw') {
        props.dispatch({ type: 'login/loginByOAuthWithProxyPSW', payload: values }); // 通过网关代理oauth2 password登录认证
      } else {
        props.dispatch({ type: 'login/login', payload: values }); // 普通登录认证
      }
    });
  };

  handleLoginByOAuthWithImplicit = () => {
    this.props.dispatch({ type: 'login/loginByOAuthWithImplicit' }); // oauth code登录认证
  };

  render() {
    const { loginLoading } = this.props.login;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.form}>
        <form>
          <FormItem hasFeedback>
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true
                }
              ]
            })(
              <Input size="large" prefix={<Icon type="user" />} onPressEnter={this.handleLogin} placeholder="guest" />
            )}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true
                }
              ]
            })(
              <Input
                size="large"
                prefix={<Icon type="lock" />}
                type="password"
                onPressEnter={this.handleLogin}
                placeholder="guest"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('psw', {
              initialValue: 'basic'
            })(
              <RadioGroup>
                <Radio value="basic">普通</Radio>
                <Radio value="proxyPsw">SinoAuth代理密码模式</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <Row>
            <Button type="primary" size="large" onClick={this.handleLogin} loading={loginLoading}>
              登录
            </Button>
            <div>
              <p>
                <span>用户名：guest</span>
                <span style={{ marginLeft: '10px' }}>密码： guest</span>
              </p>
            </div>
            <p>
              其它登录方式：<a onClick={this.handleLoginByOAuthWithImplicit}>SinoAuth登录</a>
            </p>
          </Row>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  form: PropTypes.object.isRequired,
  login: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect(({ login }) => ({ login }))(Form.create()(Login));
