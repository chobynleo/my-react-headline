import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;

import { SGSelect, SGInput, SGButton } from 'SinoGear';

import { wrapWithPageHeaderLayout } from '../../../layouts/views/wrapWithPageHeaderLayout';

const dict1 = [{ code: '0', detail: '男' }, { code: '1', detail: '女' }];

class MixedForm extends Component {
  getChildContext() {
    return { form: this.props.form };
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const userNameError = isFieldTouched('userName') && getFieldError('userName');
    console.info(this.props);
    return (
      <div>
        <div
          style={{ minHeight: 500, height: '80%' }}
          ref={(f) => {
            this.f = f;
          }}>
          <h1> Test1 Page! </h1>
          <SGInput title="email" name="SGInput" defaultValue="10a@163.com" rules={[{ type: 'email' }]} />
          <SGSelect title="SGSelect1" name="SGSelect1" defaultValue="1" data={dict1} />
          <div>分割字符</div>
          <FormItem validateStatus={userNameError ? 'error' : ''} help={userNameError || ''}>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }]
            })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />)}
          </FormItem>
          <br />
          <br />
        </div>
        <div style={{ textAlign: 'center' }}>
          <SGButton
            onClick={() => {
              console.info(this.props.form.getFieldsValue());
            }}>
            获取
          </SGButton>
        </div>
      </div>
    );
  }
}

MixedForm.childContextTypes = {
  form: PropTypes.object.isRequired
};

export default wrapWithPageHeaderLayout(connect((state) => state)(Form.create()(MixedForm)));
