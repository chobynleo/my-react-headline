import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, Button } from 'antd';
import { DictSelect, TreeSelect, TreeSelectAsync } from 'SinoGear';
import styles from './DictForm.less';
import { wrapWithPageHeaderLayout } from '../../../layouts/views/wrapWithPageHeaderLayout';

const FormItem = Form.Item;

@Form.create()
class DictForm extends PureComponent {
  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  paginationOnchange = (page, pageSize) => {
    this.props.dispatch({ type: 'dictForms/getProjectSimpleName', payload: { page, pageSize } });
  };

  handleEvent = (type, e) => {
    console.info(type, e);
  };

  render() {
    const { formData = [], projectSimpleName = [], total, page, pageSize } = this.props;
    const { getFieldDecorator } = this.props.form;
    const colModel = [{ key: 'code', title: '字典代码' }, { key: 'detail', title: '字典名称' }];

    const pagination = {
      current: page,
      pageSize,
      total,
      onChange: this.paginationOnchange
    };

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };

    return (
      <Form id="area">
        <Card className={styles['sg-form_card']} bordered={false} title="项目填报表">
          <FormItem {...formItemLayout} label="项目名称">
            {getFieldDecorator('projectName', {
              initialValue: ['3'],
              rules: [
                {
                  required: true,
                  message: '请选择项目名称'
                }
              ]
            })(
              <DictSelect
                name="dict1"
                style={{ width: '300px' }}
                data={formData.projectName}
                placeholder="请选择..."
                allowClear
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="项目简称">
            {getFieldDecorator('projectSimpleName', {
              rules: [
                {
                  required: true,
                  message: '请选择项目简称'
                }
              ]
            })(
              <DictSelect
                name="dict2"
                style={{ width: '300px' }}
                data={projectSimpleName}
                placeholder="请选择..."
                pagination={pagination}
                allowClear
                multiple
                dropdownWidth="300"
                onClearAll={() => {
                  console.info(111);
                }}
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="项目负责人">
            {getFieldDecorator('projectPO', {
              rules: [
                {
                  required: true,
                  message: '请选择项目负责人'
                }
              ]
            })(
              <DictSelect
                name="dict3"
                style={{ width: '300px' }}
                data={formData.projectPO}
                limitNum={3}
                filter
                placeholder="请选择..."
                onSearch={this.handleEvent.bind(this, 'onSearch')}
                allowClear
                mode="tags"
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="项目类型">
            {getFieldDecorator('projectAllTypes', {
              rules: [
                {
                  required: true,
                  message: '请选择项目类型'
                }
              ]
            })(
              <DictSelect
                title="项目类型"
                name="dict4"
                pattern="tab"
                style={{ width: '300px' }}
                data={formData.projectAllTypes}
                onTranslate={this.handleTranslate}
                mode="multiple"
                allowClear
                popular={formData.projectTypes || []}
                placeholder="请选择..."
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="项目规模">
            {getFieldDecorator('projectScale', {
              rules: [
                {
                  required: true,
                  message: '请选择项目规模'
                }
              ]
            })(
              <DictSelect
                title="项目规模"
                name="dict5"
                pattern="table"
                colModel={colModel}
                style={{ width: '300px' }}
                data={formData.projectScale}
                mode="multiple"
                placeholder="请选择..."
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="项目所属部门">
            {getFieldDecorator('projecBelongs', {
              rules: [
                {
                  required: true,
                  message: '请选择项目所属部门'
                }
              ]
            })(
              <TreeSelect
                treeDataSimpleMode={{
                  id: 'id',
                  pId: 'pid',
                  rootPId: '0'
                }}
                treeNodeFilterProp="label"
                data={formData.projecBelongs}
                name="dict5"
                title="项目所属部门"
                style={{ width: 300 }}
                showSearch
                filterOption={false}
              />
            )}
          </FormItem>
          <FormItem label="上级机构" {...formItemLayout}>
            {getFieldDecorator('fjdm', {
              rules: [
                {
                  required: true,
                  message: '上级机构不能为空!'
                },
                { max: 50, message: '组织机构简称长度不大于50' }
              ]
            })(
              <TreeSelectAsync
                getPopupContainer={() => document.getElementById('area')}
                style={{ width: 300 }}
                translateUrl="/api/treeDictTranslate"
                initUrl="/api/getTreeDictRoot?code=440000000000"
                expandUrl="/api/getTreeDictChildNode"
              />
            )}
          </FormItem>
          <FormItem wrapperCol={{ span: 12, offset: 10 }}>
            <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
              提交
            </Button>
          </FormItem>
        </Card>
      </Form>
    );
  }
}

const title = '字典表单';
const content = '展示赛姬封装的字典组件';
const mapStateToProps = ({ dictForms }) => ({
  formData: dictForms.formData,
  projectSimpleName: dictForms.projectSimpleName,
  total: dictForms.total,
  page: dictForms.page,
  pageSize: dictForms.pageSize
});

export default wrapWithPageHeaderLayout(connect(mapStateToProps)(DictForm), { title, content });
