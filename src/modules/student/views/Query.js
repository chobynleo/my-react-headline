import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Icon } from 'antd';

import { SGForm, SGInput, SGButton, SGSelect, SGDictSelect } from 'SinoGear';

import { queryDictsPagination } from '../services/student';
import { DICT_KIND_DEMO_STUDENT_CLASS_TYPE, DICTS_QUERY_PAGE_URL } from '../constants/Constants';
import styles from './index.less';

class Query extends Component {
  static propType = {
    onQuery: PropTypes.func.isRequired,
    expandForm: PropTypes.bool.isRequired,
    onToggleForm: PropTypes.func.isRequired,
    studentClassTypes: PropTypes.array.isRequired,
    studentSexTypes: PropTypes.array.isRequired
  };

  componentDidMount() {
    this.queryForm.setFieldsValue(this.toFieldsValue());
  }

  /**
   * Query查询按钮事件
   */
  onQuery = () => {
    this.queryForm.validateFields((error, fieldsValue) => {
      if (!error) {
        this.props.onQuery(this.toItemValue(fieldsValue));
      }
    });
  };

  /**
   * 清除搜索条件
   */
  onClear = () => {
    this.queryForm.resetFields();
  };

  /**
   *  查询框设置值
   * @returns {*}
   */
  toFieldsValue = () => {
    const { queryConditions } = this.props;
    const fieldsValue = Object.assign({}, queryConditions);
    return fieldsValue;
  };

  /**
   *  '班级'字典组件的选项获取事件
   * @param url 请求资源URL
   * @param params  请求参数
   * @returns {Promise.<void>}
   */
  handleFetch = (url, params) => {
    const data = { dictKind: { kindCode: DICT_KIND_DEMO_STUDENT_CLASS_TYPE } };
    const payload = { url, params, data };
    return queryDictsPagination(payload);
  };

  /**
   * '班级' 字典组件字典翻译方法
   * @param url
   * @param params
   * @param conditions
   * @param props
   * @returns {{key: *, label: *}}
   */
  handleTranslate = (url, params, conditions, props) => {
    const { code } = params;
    const { valueField, labelField, data } = props;
    let selectedItem = {};
    data.map((item) => {
      if (item[valueField] === code) {
        selectedItem = item;
      }
      return null;
    });
    return { key: selectedItem[valueField], label: selectedItem[labelField] };
  };

  /**
   * 清除输入控件中无效值
   * @param fieldsValue 表单中所有输入控件的值
   * @returns {{}} 返回表单中所有输入控件有效的值
   */
  toItemValue = (fieldsValue) => {
    const keys = Object.keys(fieldsValue);
    const newFieldsValue = {};
    let value = '';
    keys.map((key) => {
      value = fieldsValue[key];
      if (value) {
        newFieldsValue[key] = value;
      }
      return null;
    });
    return newFieldsValue;
  };

  /**
   * 根据状态显示不同的查询表单
   * @returns {*}
   */
  renderForm() {
    return this.props.expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  /**
   * 初级表单
   * @returns {XML}
   */
  renderSimpleForm = () => {
    return (
      <SGForm
        ref={(ref) => {
          this.queryForm = ref;
        }}>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={6} sm={18}>
            <SGInput title="姓名" name="name" placeholder="请输入姓名" />
          </Col>
          <Col md={6} sm={18}>
            <SGInput title="学号" name="studentId" placeholder="请输入学号" />
          </Col>
          <Col md={6} sm={18}>
            <SGDictSelect
              title="班级"
              onFetch={this.handleFetch}
              onTranslate={this.handleTranslate}
              data={this.props.studentClassTypes}
              defaultLoadUrl={`${DICTS_QUERY_PAGE_URL}`}
              name="studentClass"
              showSearch
              allowClear
              valueField="code"
              labelField="detail"
            />
          </Col>

          <Col md={6} sm={18} className={styles.student_query_btn_rol}>
            <SGButton type="primary" onClick={this.onQuery}>
              查询
            </SGButton>
            <SGButton onClick={this.onClear} className={styles.student_query_btn_marginLeft}>
              重置
            </SGButton>
            <a className={styles.student_query_btn_marginLeft} onClick={this.props.onToggleForm}>
              展开 <Icon type="down" />
            </a>
          </Col>
        </Row>
      </SGForm>
    );
  };

  /**
   * 高级表单
   * @returns {XML}
   */
  renderAdvancedForm = () => {
    return (
      <SGForm
        ref={(ref) => {
          this.queryForm = ref;
        }}>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={6} sm={18}>
            <SGInput title="姓名" name="name" placeholder="请输入姓名" />
          </Col>
          <Col md={6} sm={18}>
            <SGInput title="学号" name="studentId" placeholder="请输入学号" />
          </Col>
          <Col md={6} sm={18}>
            <SGDictSelect
              title="班级"
              onFetch={this.handleFetch}
              onTranslate={this.handleTranslate}
              data={this.props.studentClassTypes}
              defaultLoadUrl={`${DICTS_QUERY_PAGE_URL}`}
              name="studentClass"
              showSearch
              allowClear
              valueField="code"
              labelField="detail"
            />
          </Col>
          <Col md={6} sm={18}>
            <SGSelect
              title="性别"
              name="sex"
              allowClear
              data={this.props.studentSexTypes}
              valueField="code"
              labelField="detail"
            />
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={6} sm={18}>
            <SGInput title="爱好" name="hobby" placeholder="请输入爱好" />
          </Col>
          <Col md={6} sm={18}>
            <SGInput title="年龄" name="age" placeholder="请输入年龄" />
          </Col>
          <Col md={6} sm={18} />
          <Col md={6} sm={18}>
            <span className={styles.student_query_advanc_rol_span}>
              <SGButton type="primary" onClick={this.onQuery}>
                查询
              </SGButton>
              <SGButton onClick={this.onClear} className={styles.student_query_btn_marginLeft}>
                重置
              </SGButton>
              <a className={styles.student_query_btn_marginLeft} onClick={this.props.onToggleForm}>
                收起 <Icon type="up" />
              </a>
            </span>
          </Col>
        </Row>
      </SGForm>
    );
  };

  render() {
    return <div>{this.renderForm()}</div>;
  }
}

export default Query;
