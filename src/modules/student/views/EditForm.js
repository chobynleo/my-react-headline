import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { SGForm, SGInput, SGButton, SGSelect, SGDictSelect } from 'SinoGear';

import Constants from '../../../common/Constants';
import { queryDictsPagination } from '../services/student';
import { DICT_KIND_DEMO_STUDENT_CLASS_TYPE, DICTS_QUERY_PAGE_URL, SELECT_CLASS_TYPE } from '../constants/Constants';

class EditForm extends Component {
  /**
   * 属性由父组件EditDialog 传递下来
   */
  static propTypes = {
    editType: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired,
    studentClassTypes: PropTypes.array.isRequired,
    studentSexTypes: PropTypes.array.isRequired
  };

  componentDidMount() {
    this.editForm.setFieldsValue(this.toFieldsValue());
  }

  /**
   * 生成按钮（取消、保存）
   * @returns {[XML,XML]}
   */
  getFooterBtn = () => {
    if (this.props.editType === Constants.CREATE_TYPE) {
      return [
        <SGButton key="cancel" className="ant-btn" onClick={this.handleCancel}>
          取消
        </SGButton>,
        <SGButton key="ok" className="ant-btn-primary" onClick={this.handleOk}>
          新增
        </SGButton>
      ];
    }

    return [
      <SGButton key="cancel" className="ant-btn" onClick={this.handleCancel}>
        取消
      </SGButton>,
      <SGButton key="ok" className="ant-btn-primary" onClick={this.handleOk}>
        保存
      </SGButton>
    ];
  };

  /**
   *  编辑框根据 <编辑状态> 个性化设置
   * @returns {*}
   */
  toFieldsValue = () => {
    const { item, editType } = this.props;
    const fieldsValue = Object.assign({}, item);

    // 这里根据editType进行稍微修改
    if (editType === Constants.CREATE_TYPE) {
      // TODO
      // 弹出框编辑状态为新增，做适当调整
    } else if (editType === Constants.UPDATE_TYPE) {
      // 弹出框编辑状态为更新，做适当调整
    }

    return fieldsValue;
  };

  /**
   * 保存点击事件
   */
  handleOk = () => {
    this.editForm.validateFields((error, fieldsValue) => {
      if (!error) {
        const studentItem = this.toItemValue(fieldsValue);
        const eventData = { editType: this.props.editType, item: studentItem };
        this.props.onOk(eventData);
      }
    });
  };

  /**
   * 编辑框根据 <编辑状态> 自定义返回对象属性<id>
   * @param fieldsValue
   * @returns {*}
   */
  toItemValue = (fieldsValue) => {
    const { item, editType } = this.props;
    const editedItem = Object.assign({}, fieldsValue);

    if (editType === Constants.UPDATE_TYPE) {
      editedItem.id = item.id;
    }
    return editedItem;
  };

  /**
   * 取消点击事件
   */
  handleCancel = () => {
    this.editForm.resetFields();
    this.props.onCancel();
  };

  /**
   * 字典组件获取选项方法
   * @param url
   * @param params
   * @returns {Promise.<void>}
   */
  handleFetch = (url, params) => {
    const data = { dictKind: { kindCode: DICT_KIND_DEMO_STUDENT_CLASS_TYPE } };
    const payload = { url, params, data };
    return queryDictsPagination(payload);
  };

  /**
   * 字典组件翻译方法
   * @param url  请求资源URL
   * @param params
   * @param conditions 查询条件
   * @param props
   * @returns {{key: *, label: *}}
   */
  handleTranslate = (url, params, conditions, props) => {
    // 这里是通过 data中的选项数组进行翻译，实际业务场景中，可通过请求资源进行翻译
    const { code } = params;
    const { valueField, labelField, data } = props;
    let selectedItem = {};
    data.map((item) => {
      if (item[valueField] === code) {
        selectedItem = item;
      }
      return null;
    });
    // 返回格式必须是{ key: '', label: '' }
    return { key: selectedItem[valueField], label: selectedItem[labelField] };
  };

  /**
   *  仅返回选择学生班级表单
   * @returns {XML}
   */
  renderSelectClassForm = () => {
    return (
      <SGForm
        ref={(ref) => {
          this.editForm = ref;
        }}>
        <SGDictSelect
          title="班级"
          onFetch={this.handleFetch}
          onTranslate={this.handleTranslate}
          data={this.props.studentClassTypes}
          defaultLoadUrl={`${DICTS_QUERY_PAGE_URL}`}
          name="studentClass"
          rules={[{ required: true, message: '请选择转到的班级' }]}
          showSearch
          allowClear
          valueField="code"
          labelField="detail"
        />
      </SGForm>
    );
  };

  /**
   * 返回新增 || 编辑  学生信息表单
   * @returns {*}
   */
  renderSaveOrUpdateForm = () => {
    return (
      <SGForm
        ref={(ref) => {
          this.editForm = ref;
        }}>
        <SGInput
          title="姓名"
          name="name"
          rules={[{ required: true, message: '学生姓名必填' }]}
          placeholder="请输入学生姓名"
        />
        <SGInput
          title="学号"
          name="studentId"
          rules={[{ required: true, message: '学生学号必填' }]}
          placeholder="请输入学生学号"
        />
        <SGDictSelect
          title="班级"
          onFetch={this.handleFetch}
          data={this.props.studentClassTypes}
          onTranslate={this.handleTranslate}
          rules={[{ required: true, message: '请选择班级' }]}
          defaultLoadUrl={`${DICTS_QUERY_PAGE_URL}`}
          name="studentClass"
          valueField="code"
          labelField="detail"
          placeholder="请选择学生班级"
        />
        <SGSelect
          title="性别"
          name="sex"
          allowClear
          rules={[{ required: true, message: '请选择性别' }]}
          data={this.props.studentSexTypes}
          valueField="code"
          labelField="detail"
          placeholder="请选择学"
        />
        <SGInput
          title="年龄"
          name="age"
          rules={[
            {
              required: true,
              type: 'number',
              min: 1,
              max: 130,
              message: '学生年龄必填且为数字(1~130)',
              transform(value) {
                return Number(value);
              }
            }
          ]}
          placeholder="请输入学生年龄"
        />
        <SGInput
          title="爱好"
          name="hobby"
          rules={[{ required: true, message: '学生爱好必填' }]}
          placeholder="请输入学生爱好"
        />
      </SGForm>
    );
  };

  /**
   * 根据editType 显示不同的表单内容
   * @returns {XML}
   */
  renderForm = () => {
    return this.props.editType === SELECT_CLASS_TYPE ? this.renderSelectClassForm() : this.renderSaveOrUpdateForm();
  };

  render() {
    return (
      <div>
        {this.renderForm()}
        <div className="ant-modal-footer">{this.getFooterBtn()}</div>
      </div>
    );
  }
}

export default EditForm;
