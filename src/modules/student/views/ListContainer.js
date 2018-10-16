import React, { Component } from 'react';
// dva封装的redux 数据管理
import { connect } from 'dva';

// Antd的组件使用引入
import { Layout, Row, Col, Button, Modal, Alert, Spin, Dropdown, Icon, Menu } from 'antd';

import { SGButton, SGTable } from 'SinoGear';

import { wrapWithPageHeaderLayout } from '../../layouts/views/wrapWithPageHeaderLayout';
import Constants from '../../../common/Constants';

import { queryDictsPagination } from '../services/student';
import { NAMESPACE, DICT_KIND_DEMO_STUDENT_CLASS_TYPE, SELECT_CLASS_TYPE } from '../constants/Constants';
import Query from './Query';
import EditDialog from './EditDialog';
import styles from './index.less';

const { Content } = Layout;
const content = '本模块为学生管理演示模块，通过代理访问实际后台获取数据，包含基本的CRUD功能';

// 定义页面
class ListContainer extends Component {
  /**
   *  将字典项code转换为字典项detail
   * @param code 字典项code
   * @param dicts 获取的字典数组
   * @returns {*}
   */
  onDictTranslate = (code, dicts = []) => {
    for (let i = 0; i < dicts.length; i += 1) {
      if (dicts[i].code === code) {
        return `${dicts[i].detail}`;
      }
    }
    return '';
  };

  /**
   * 查询信息（点击"删除"按钮触发）
   * @param fieldsValue
   * @param pagination
   */
  handleQuery = (fieldsValue = {}, pagination = { page: Constants.DEFAULT_PAGE }) => {
    // dispatch 一个action请求, action格式为： {type:"类型"， payload: {数据对象}}
    // "类型" 为: 命名空间/effects下方法名
    const paginationRequest = Object.assign({}, this.props.pagination, pagination);
    this.props.dispatch({
      type: `${NAMESPACE}/query`,
      payload: {
        queryConditions: fieldsValue,
        pagination: paginationRequest
      }
    });
  };

  /**
   * 新增信息，显示Modal，且当前操作为：Constants.CREATE_TYPE
   * （点击"新增"按钮触发）
   */
  handleCreate = () => {
    // dispatch 一个action请求, action格式为： {type:"类型"， payload: {数据对象}}
    // "类型" 为: 命名空间/effects下方法名
    this.props.dispatch({
      type: `${NAMESPACE}/openCreateView`,
      payload: { editType: Constants.CREATE_TYPE, item: {} }
    });
  };

  /**
   * 更新信息，显示Modal，且当前操作为：Constants.CREATE_TYPE
   * （点击"编辑"按钮触发）
   */
  handleUpdate = (item) => {
    // dispatch 一个action请求, action格式为： {type:"类型"， payload: {数据对象}}
    // "类型" 为: 命名空间/effects下方法名
    this.props.dispatch({
      type: `${NAMESPACE}/openUpdateView`,
      payload: { editType: Constants.UPDATE_TYPE, item }
    });
  };

  /**
   * 删除信息（点击"删除"按钮触发）
   */
  handleDelete = (id) => {
    // dispatch 一个action请求, action格式为： {type:"类型"， payload: {数据对象}}
    // "类型" 为: 命名空间/effects下方法名
    if (id !== undefined) {
      this.props.dispatch({ type: `${NAMESPACE}/delete`, payload: { id } });
    }
  };

  /**
   * Modal(确定、保存)事件
   */
  handleSaveOrUpdate = (eventData) => {
    // dispatch 一个action请求, action格式为： {type:"类型"， payload: {数据对象}}
    // "类型" 为: 命名空间/effects下方法名
    this.handleCancel();
    const { editType, item } = eventData;
    let payload = eventData;
    if (editType === SELECT_CLASS_TYPE) {
      const { selectedRowKeys } = this.props;
      const { studentClass } = item;
      payload = { ids: selectedRowKeys, studentClass, editType };
    }
    this.props.dispatch({ type: `${NAMESPACE}/saveOrUpdate`, payload });
  };

  /**
   * 关闭(取消)Modal事件
   */
  handleCancel = () => {
    this.props.dispatch({ type: `${NAMESPACE}/closeModal` });
  };

  /**
   * 表格分页工具栏改变（换页、 每页展示数量改变）触发
   * @param page 当前页码
   * @param pageSize   每页显示数量
   */
  handleTableChange = (page, pageSize) => {
    const { total } = this.props.pagination;
    this.props.dispatch({
      type: `${NAMESPACE}/query`,
      payload: {
        queryConditions: this.props.queryConditions,
        pagination: { total, page, pageSize }
      }
    });
  };

  /**
   * Table 中选中或取消触发事件
   * @param selectedRowKeys 选中的数据项的key数组
   *                          Table 中设置此属性"rowKey={(row) => row.id}"，表明key值为数据项的id
   * @param selectedRows   选中的数据项数组
   */
  handleSelectRowsOnChange = (selectedRowKeys, selectedRows) => {
    this.props.dispatch({ type: `${NAMESPACE}/setSelectedRows`, payload: { selectedRowKeys, selectedRows } });
  };

  /**
   * 批量操作的菜单点击事件
   * @param e
   */
  handleMenuClick = (e) => {
    const { selectedRowKeys } = this.props;
    if (!selectedRowKeys) return;
    switch (e.key) {
      case 'remove':
        Modal.confirm({
          title: '确认删除吗？',
          content: '此操作不可恢复,谨慎执行此操作',
          okText: '确认删除',
          cancelText: '取消',
          onOk: () => this.props.dispatch({ type: `${NAMESPACE}/deleteBatch`, payload: { selectedRowKeys } })
        });
        // this.props.dispatch({ type: `${NAMESPACE}/deleteBatch`, payload: { selectedRowKeys } })
        break;
      case 'changeClass':
        this.props.dispatch({
          type: `${NAMESPACE}/openSelectClassView`,
          payload: { editType: SELECT_CLASS_TYPE, item: {} }
        });
        break;
      default:
        break;
    }
  };

  /**
   * 弹出删除的确认对话框
   * @param id
   */
  handleConfirm = (id) => {
    Modal.confirm({
      title: '确认删除该信息吗？',
      content: '此操作不可恢复',
      okText: '删除',
      cancelText: '取消',
      onOk: () => this.handleDelete(id)
    });
  };

  /**
   *  搜索框初级表单以及高级表单切换
   */
  handleQueryToggle = () => {
    this.props.dispatch({ type: `${NAMESPACE}/toggleQueryForm` });
  };

  /**
   * 字典组件的onFetch事件
   */
  handleFetch = (url, params) => {
    const data = { dictKind: { kindCode: DICT_KIND_DEMO_STUDENT_CLASS_TYPE } };
    const payload = { url, params, data };
    return queryDictsPagination(payload);
  };

  /**
   *  字典组件的翻译方法（存在值时，需要翻译）
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

  render() {
    const {
      list,
      pagination,
      loading,
      selectedRows,
      selectedRowKeys,
      queryConditions,
      studentClassTypes,
      studentSexTypes,
      expandForm
    } = this.props;
    const { total, page } = pagination;
    const keyValue = { name: '姓名', studentId: '学号', studentClass: '班级', hobby: '爱好', age: '年龄', sex: '性别' };
    // 分页器对象
    const tablePagination = Object.assign(
      {
        showSizeChanger: true,
        onShowSizeChange: this.handleTableChange,
        onChange: this.handleTableChange,
        current: (pagination && pagination.page) || Constants.DEFAULT_PAGE
      },
      pagination
    );
    /**
     * table多选配置
     */
    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleSelectRowsOnChange
    };
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">移除学生</Menu.Item>
        <Menu.Item key="changeClass">修改班级</Menu.Item>
      </Menu>
    );
    let description = '';
    const keys = Object.keys(queryConditions);
    if (keys.length) {
      keys.map((key) => {
        if (key === 'studentClass') {
          description += ` ${keyValue[key]}: ${this.onDictTranslate(queryConditions[key], studentClassTypes)}`;
        } else if (key === 'sex') {
          description += ` ${keyValue[key]}: ${this.onDictTranslate(queryConditions[key], studentSexTypes)}`;
        } else {
          description += ` ${keyValue[key]}: ${queryConditions[key]}`;
        }
        return '';
      });
    }
    // Table的列属性配置
    const columns = [
      {
        title: '学号',
        dataIndex: 'studentId',
        key: 'studentId',
        width: 110
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        width: 150
      },
      {
        title: '班级',
        dataIndex: 'studentClass',
        key: 'studentClass',
        width: 90,
        render: (text) => this.onDictTranslate(text, studentClassTypes)
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        width: 90
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
        width: 90,
        render: (text) => this.onDictTranslate(text, studentSexTypes)
      },
      {
        title: '爱好',
        dataIndex: 'hobby',
        key: 'hobby'
      },
      {
        title: '操作',
        key: 'action',
        width: 200,
        render: (text, item) => (
          <div>
            <Button type="primary" className={styles.student_edit_btn} onClick={() => this.handleUpdate(item)}>
              编辑
            </Button>
            <Button type="danger" onClick={() => this.handleConfirm(item.id)}>
              删除
            </Button>
          </div>
        )
      }
    ];
    return (
      <Content className={styles.student_content}>
        {/* 查询界面 */}
        <Query
          onQuery={this.handleQuery}
          expandForm={expandForm}
          onToggleForm={this.handleQueryToggle}
          {...this.props}
        />
        {/* 新增按钮 */}
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24} className={styles.student_table_operator}>
            <SGButton type="primary" icon="plus" onClick={this.handleCreate} className={styles.student_add_btn}>
              新增
            </SGButton>
            {selectedRows.length > 0 && (
              <span>
                <Dropdown overlay={menu}>
                  <SGButton>
                    批量操作 <Icon type="down" />
                  </SGButton>
                </Dropdown>
              </span>
            )}
          </Col>
        </Row>
        <Alert
          message={
            <div>
              查询总计 <a className={styles.student_alert_a}>{total}</a> 条, 当前第{' '}
              <a className={styles.student_alert_a}>{page}</a> 页, 本页{' '}
              <a className={styles.student_alert_a}>{list.length}</a> 条
            </div>
          }
          description={` ${description ? `已选查询条件， ${description}` : '暂无查询条件'}`}
          type="info"
          showIcon
        />
        {/* Table 数据展示 */}
        <Spin spinning={loading}>
          <SGTable
            className={styles.student_table}
            rowKey={(row) => row.id}
            data={this.props.list}
            columns={columns}
            rowSelection={rowSelection}
            pagination={tablePagination}
          />
        </Spin>
        {/* 编辑对话框(学生信息新增，编辑，以及修改班级) */}
        <EditDialog
          key="1"
          modalVisible={this.props.modalVisible}
          {...this.props}
          onCancel={this.handleCancel}
          onOk={this.handleSaveOrUpdate}
        />
      </Content>
    );
  }
}

// 将状态state中的数据转为参数,传递给页面
const mapStateToProps = ({ student }) => ({
  editType: student.editType,
  modalVisible: student.modalVisible,
  modelVisible_class: student.modelVisible_class,
  expandForm: student.expandForm,
  pagination: student.pagination,
  queryConditions: student.queryConditions,
  list: student.list,
  item: student.item,
  loading: student.loading,
  selectedRowKeys: student.selectedRowKeys,
  selectedRows: student.selectedRows,
  studentClassTypes: student.studentClassTypes,
  studentSexTypes: student.studentSexTypes
});

// 页面出口
export default wrapWithPageHeaderLayout(connect(mapStateToProps)(ListContainer), { title: '学生管理', content });
