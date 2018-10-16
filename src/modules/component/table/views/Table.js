import React, { PureComponent } from 'react';
import { Table, Card, Row, Col, Button, Menu, Dropdown, Icon, Divider } from 'antd';

import styles from './Table.less';

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a href="#">{text}</a>
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '居住地',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <a href="#">操作 一 {record.name}</a>
        <Divider type="vertical" />
        <a href="#">删除</a>
        <Divider type="vertical" />
        <a href="#" className="ant-dropdown-link">
          更多操作 <Icon type="down" />
        </a>
      </span>
    )
  }
];

const widthStaticColumns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    width: 150,
    render: (text) => <a href="#">{text}</a>
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    width: 150
  },
  {
    title: '居住地',
    dataIndex: 'address',
    key: 'address',
    width: 150
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <a href="#">操作 一 {record.name}</a>
        <Divider type="vertical" />
        <a href="#">删除</a>
        <Divider type="vertical" />
        <a href="#" className="ant-dropdown-link">
          更多操作 <Icon type="down" />
        </a>
      </span>
    )
  }
];

const data = [
  {
    key: '1',
    name: '张三',
    age: 32,
    address: '广州'
  },
  {
    key: '2',
    name: '李四',
    age: 42,
    address: '深圳'
  },
  {
    key: '3',
    name: '钱大富',
    age: 32,
    address: '珠海'
  }
];

const dataSource = [];
for (let i = 0; i < 46; i += 1) {
  dataSource.push({
    key: i,
    name: `曾小贤 ${i}`,
    age: 32,
    address: `广州小区 A0${i}栋`
  });
}

const dataDescription = [
  {
    key: 1,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.'
  },
  {
    key: 2,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.'
  },
  {
    key: 3,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.'
  }
];

const Fixcolumns = [
  { title: '全名', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
  { title: '年龄', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
  { title: '列 1', dataIndex: 'address', key: '1' },
  { title: '列 2', dataIndex: 'address', key: '2' },
  { title: '列 3', dataIndex: 'address', key: '3' },
  { title: '列 4', dataIndex: 'address', key: '4' },
  { title: '列 5', dataIndex: 'address', key: '5' },
  { title: '列 6', dataIndex: 'address', key: '6' },
  { title: '列 7', dataIndex: 'address', key: '7' },
  { title: '列 8', dataIndex: 'address', key: '8' },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () => <a href="#">编辑</a>
  }
];

export default class TableDemo extends PureComponent {
  state = {
    selectedRowKeys: [],
    filteredInfo: {},
    sortedInfo: {}
  };

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    });
  };

  render() {
    const { selectedRowKeys, sortedInfo, filteredInfo } = this.state;

    const columnsFilter = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        filters: [{ text: '张三', value: '张三' }, { text: '李四', value: '李四' }],
        filteredValue: filteredInfo.name || null,
        onFilter: (value, record) => record.name.includes(value),
        sorter: (a, b) => a.name.length - b.name.length,
        sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        sorter: (a, b) => a.age - b.age,
        sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        filters: [{ text: '广州', value: '广州' }, { text: '深圳', value: '深圳' }],
        filteredValue: filteredInfo.address || null,
        onFilter: (value, record) => record.address.includes(value),
        sorter: (a, b) => a.address.length - b.address.length,
        sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order
      }
    ];

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };

    return (
      <Card title="Table 表格" className={styles['sg-form_card']}>
        <Row>
          <h4>基本用法</h4>
          <p>简单的表格，最后一列是各种操作。</p>
          <Table dataSource={data} columns={columns} />
        </Row>
        <Row>
          <h4>第一列是联动的选择框</h4>
          <p>默认点击 checkbox 触发选择行为</p>
          <Table dataSource={dataSource} columns={columns} rowSelection={rowSelection} />
        </Row>
        <Row>
          <h4>带边框</h4>
          <p>添加表格边框线，页头和页脚。</p>
          <Table
            dataSource={data}
            columns={columns}
            title={() => '标题'}
            footer={() => '底部'}
            rowSelection={rowSelection}
            bordered
          />
        </Row>
        <Row>
          <h4>可展开</h4>
          <p>当表格内容较多不能一次性完全展示时。</p>
          <Table
            dataSource={dataDescription}
            columns={columns}
            expandedRowRender={(record) => <p style={{ margin: 0 }}>{record.description}</p>}
          />
        </Row>
        <Row>
          <h4>筛选和排序</h4>
          <p>对某一列数据进行筛选</p>
          <Table columns={columnsFilter} dataSource={data} onChange={this.handleChange} />
        </Row>
        <Row>
          <h4>固定表头</h4>
          <p>方便一页内展示大量数据（需要指定 column 的 width 属性，否则列头和内容可能不对齐）</p>
          <Table dataSource={dataSource} columns={widthStaticColumns} rowSelection={rowSelection} scroll={{ y: 240 }} />
        </Row>
        <Row>
          <h4>固定列</h4>
          <p>对于列数很多的数据，可以固定前后的列，横向滚动查看其它数据，需要和 scroll.x 配合使用</p>
          <Table dataSource={data} columns={Fixcolumns} rowSelection={rowSelection} scroll={{ x: 1300 }} />
        </Row>
        <Row>
          <h4>固定头和列</h4>
          <p>适合同时展示有大量数据和数据列。</p>
          <Table dataSource={data} columns={Fixcolumns} rowSelection={rowSelection} scroll={{ x: 1500, y: 200 }} />
        </Row>
      </Card>
    );
  }
}
