/**
 * Created by laishuliang on 2018/7/25.
 */
import React, { Component, PropTypes } from 'react';
import { Form, DatePicker, Modal, Button } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import SecondaryLinkage from './SecondaryLinkage';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

@Form.create()
class EditDialog extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.formData !== this.props.formData) {
      const { formData } = nextProps;
      this.props.form.setFieldsValue({
        selectedDateType: formData.selectedDateType,
        selectedDate: formData.selectedDate
      });
    }
  }

  handleOk = () => {
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        this.props.handleOk(values);
      }
    });
  };

  handleReset = () => {
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        values.del = true;
        this.props.handleOk(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible, excludeTypes, fomatter, handleCancel, formData } = this.props;

    let resetEle;
    const { reset } = formData;
    if (!reset) {
      resetEle = (
        <div>
          <span style={{ margin: '0 25px' }}>
            <a onClick={this.handleReset}>重置本次设置</a>
          </span>
          <Button key="back" onClick={handleCancel}>
            取消
          </Button>
          <Button key="submit" type="primary" onClick={this.handleOk}>
            确定
          </Button>
        </div>
      );
    } else {
      resetEle = (
        <div>
          <Button key="back" onClick={handleCancel}>
            取消
          </Button>
          <Button key="submit" type="primary" onClick={this.handleOk}>
            确定
          </Button>
        </div>
      );
    }

    return (
      <Modal title="新增例外" visible={visible} onOk={this.handleOk} onCancel={handleCancel} footer={resetEle}>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <FormItem label="类型:">
            {getFieldDecorator('selectedDateType', {
              initialValue: [excludeTypes[0].value, ''],
              rules: [{ required: true, message: '请选择类型' }]
            })(<SecondaryLinkage data={excludeTypes} />)}
          </FormItem>
          <FormItem label="时间：">
            {getFieldDecorator('selectedDate', {
              rules: [{ required: true, message: '请选择时间范围' }]
            })(
              <RangePicker
                ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
                format={fomatter}
              />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default EditDialog;
