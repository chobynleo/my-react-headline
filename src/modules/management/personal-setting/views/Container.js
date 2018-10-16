/**
 *@author zhonghuiquan
 *@time 2018/3/13 16:15
 *@version v3.0.0
 *@class Container
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Tabs, Icon, Upload, Card, Form, Input, Button, Tooltip, message } from 'antd';
import styles from './Container.less';
import { NAMESPACE } from '../constants/Constants';
import { modifyData } from '../services/personalSetting';
import { auth } from '../../../../utils/auth';

const FormItem = Form.Item;
const { Meta } = Card;
const { TabPane } = Tabs;

@connect((state) => ({
  currentUser: state.global.currentUser,
  personalSetting: state.personalSetting
}))
@Form.create()
class Container extends Component {
  handleEdit = () => {
    this.props.dispatch({ type: 'personalSetting/personalEdit', payload: { display: false, activeKey: '2' } });
  };
  handleSearch = () => {
    this.props.dispatch({ type: 'personalSetting/personalEdit', payload: { display: true, activeKey: '2' } });
  };
  handlePassword = () => {
    this.props.dispatch({ type: 'personalSetting/personalEdit', payload: { activeKey: '1' } });
  };
  handleClick = (key) => {
    this.props.dispatch({ type: 'personalSetting/personalEdit', payload: { activeKey: key } });
  };
  handleUpdate = () => {
    const data = this.props.form.getFieldsValue();
    const { personal } = this.props[NAMESPACE];
    delete data.newPassword;
    delete data.confirmPassword;
    delete data.oldPassword;
    const res = Object.assign(personal, data);
    this.props.dispatch({
      type: 'personalSetting/personalEdit',
      payload: { display: true, activeKey: '2', personal: res }
    });
    message.success('个人档案修改成功!');
  };
  handleUpdatePassword = () => {
    const data = this.props.form.getFieldsValue();
    const { personal } = this.props[NAMESPACE];
    if (data) {
      if (data.oldPassword !== personal.password) {
        message.error('原密码输入错误！');
        return null;
      } else if (data.newPassword !== data.confirmPassword) {
        message.error('新密码与确认密码不一致！');
        return null;
      } else {
        const res = Object.assign(personal, { password: data.newPassword });
        this.props.dispatch({
          type: 'personalSetting/personalEdit',
          payload: { activeKey: '1', personal: res }
        });
        message.success('密码修改成功');
      }
    }
  };

  handleFile = (info) => {
    if (info.file.status === 'done') {
      this.props.dispatch({ type: 'global/changeUserAvatarKey' });
      message.info('头像上传成功！');
    }
    if (info.file.status === 'error') {
      message.info('头像上传失败！');
    }
  };

  beautifyPersonalPropValue = (personalPropValue) => {
    if (personalPropValue === undefined || personalPropValue === null) {
      return '';
    }
    return personalPropValue;
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { personal, display, activeKey } = this.props[NAMESPACE] ? this.props[NAMESPACE] : {};
    const { currentUser } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 }
      }
    };
    const actions = [
      <Icon type="search" onClick={this.handleSearch} />,
      <Icon type="edit" onClick={this.handleEdit} />,
      <Icon type="key" onClick={this.handlePassword} />
    ];

    return (
      <div className={styles.container_personal_setting}>
        <Row>
          <Col className={styles.management_personal_card} span={6}>
            <Card
              actions={actions}
              hoverable
              cover={
                <Upload
                  key={currentUser.userAvatarKey}
                  showUploadList={false}
                  listType="picture"
                  action={currentUser.uploadUserAvatarUrl}
                  onChange={this.handleFile}>
                  <Tooltip placement="top" title="点击头像可修改">
                    <img
                      className={styles.management_personal_image}
                      alt="头像"
                      src={currentUser.userAvatarUrl}
                      key={currentUser.userAvatarKey}
                    />
                  </Tooltip>
                </Upload>
              }>
              <Meta
                title={`用户名：${this.beautifyPersonalPropValue(personal.loginName)}`}
                className={styles.management_personal_meta_field}
              />
              <br />
              <Meta
                title={`电话号码：${this.beautifyPersonalPropValue(personal.phoneNumber)}`}
                className={styles.management_personal_meta_field}
              />
              <br />
              <Meta
                title={`电子邮箱：${this.beautifyPersonalPropValue(personal.email)}`}
                className={styles.management_personal_meta_field}
              />
            </Card>
          </Col>
          <Col span={18}>
            <Tabs
              className={styles.management_personal_tabs}
              activeKey={activeKey}
              size="large"
              onTabClick={this.handleClick}>
              <TabPane
                tab={
                  <span>
                    <Icon type="key" />密码
                  </span>
                }
                key="1">
                <Form hideRequiredMark style={{ marginTop: 8 }}>
                  <FormItem {...formItemLayout} label="原密码：">
                    {getFieldDecorator('oldPassword', {
                      rules: [
                        {
                          required: true,
                          message: '请输入原密码'
                        }
                      ]
                    })(<Input type="password" placeholder="请输入原密码" />)}
                  </FormItem>
                  <FormItem {...formItemLayout} label="新密码：">
                    {getFieldDecorator('newPassword', {
                      rules: [
                        {
                          required: true,
                          message: '请输入新密码'
                        }
                      ]
                    })(<Input type="password" placeholder="请输入新密码" />)}
                  </FormItem>
                  <FormItem {...formItemLayout} label="确认密码：">
                    {getFieldDecorator('confirmPassword', {
                      rules: [
                        {
                          required: true,
                          message: '请输入确认密码'
                        }
                      ]
                    })(<Input type="password" placeholder="请输入确认密码" />)}
                  </FormItem>
                  <FormItem style={{ textAlign: 'center' }}>
                    <Button
                      onClick={this.handleUpdatePassword}
                      style={{ width: '100px' }}
                      type="primary"
                      htmlType="submit">
                      提交
                    </Button>
                  </FormItem>
                </Form>
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <Icon type="file-text" />个人档案
                  </span>
                }
                key="2">
                <Form hideRequiredMark style={{ marginTop: 8 }}>
                  <Row>
                    <Col span="12">
                      <FormItem {...formItemLayout} label="登录名称：">
                        {!display
                          ? getFieldDecorator('loginName', {
                              rules: [
                                {
                                  required: true,
                                  message: '请输入登录名称'
                                }
                              ],
                              initialValue: personal.loginName
                            })(<Input placeholder="请输入登录名称" />)
                          : personal.loginName}
                      </FormItem>
                    </Col>
                    <Col span="12">
                      <FormItem {...formItemLayout} label="机构代码：">
                        {!display
                          ? getFieldDecorator('belongsOrgCode', {
                              rules: [
                                {
                                  required: true,
                                  message: '请输入机构代码'
                                }
                              ],
                              initialValue: personal.belongsOrgCode
                            })(<Input placeholder="请输入机构代码" />)
                          : personal.belongsOrgCode}
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="12">
                      <FormItem {...formItemLayout} label="电子邮箱：">
                        {!display
                          ? getFieldDecorator('email', {
                              rules: [
                                {
                                  required: true,
                                  message: '请输入电子邮箱'
                                }
                              ],
                              initialValue: personal.email
                            })(<Input placeholder="请输入电子邮箱" />)
                          : personal.email}
                      </FormItem>
                    </Col>
                    <Col span="12">
                      <FormItem {...formItemLayout} label="电话号码：">
                        {!display
                          ? getFieldDecorator('phoneNumber', {
                              rules: [
                                {
                                  required: true,
                                  message: '请输入电话号码'
                                }
                              ],
                              initialValue: personal.phoneNumber
                            })(<Input placeholder="请输入电话号码" />)
                          : personal.phoneNumber}
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="12">
                      <FormItem {...formItemLayout} label="用户名称：">
                        {!display
                          ? getFieldDecorator('userName', {
                              rules: [
                                {
                                  required: true,
                                  message: '请输入用户名称'
                                }
                              ],
                              initialValue: personal.userName
                            })(<Input placeholder="请输入用户名称" />)
                          : personal.userName}
                      </FormItem>
                    </Col>
                    <Col span="12">
                      <FormItem {...formItemLayout} label="备注：">
                        {!display
                          ? getFieldDecorator('remark', {
                              rules: [
                                {
                                  required: true,
                                  message: '请输入备注'
                                }
                              ],
                              initialValue: personal.remark
                            })(<Input placeholder="请输入备注" />)
                          : personal.remark}
                      </FormItem>
                    </Col>
                  </Row>
                  <FormItem style={{ textAlign: 'center' }}>
                    {display ? (
                      <Button onClick={this.handleEdit} style={{ width: '100px' }} type="primary" htmlType="submit">
                        编辑
                      </Button>
                    ) : (
                      <Button onClick={this.handleUpdate} style={{ width: '100px' }} type="primary" htmlType="submit">
                        修改
                      </Button>
                    )}
                  </FormItem>
                </Form>
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <Icon type="tags" />Tab 3
                  </span>
                }
                key="3">
                <div style={{ height: '400px' }}>待开发界面</div>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Container;
