import React, { Component } from 'react';
import { connect } from 'dva';
import { Radio, Icon, Card, Divider } from 'antd';
import { store, theme } from '../../../utils/func';
import { wrapWithPageHeaderLayout } from '../../layouts/views/wrapWithPageHeaderLayout';
import setting1 from '../../../resources/images/setting1.png';
import setting2 from '../../../resources/images/setting2.png';
import setting3 from '../../../resources/images/setting3.png';
import setting4 from '../../../resources/images/setting4.png';
import setting5 from '../../../resources/images/setting5.png';

const RadioGroup = Radio.Group;

const sysLayoutOptions = [
  { label: '左侧布局', value: 'SiderLayout', icon: setting1 },
  { label: '上下布局', value: 'HeaderLayout', icon: setting2 },
  { label: '上下左侧布局', value: 'HeaderSiderLayout', icon: setting3 }
];

const loginLayoutOptions = [
  { label: '中间', value: 'UnauthorizedLayout', icon: setting4 },
  { label: '右侧', value: 'UnauthorizedRightLayout', icon: setting5 }
];

const themeOptions = [
  { label: '默认', value: 'default', color: '#102a65' },
  { label: '喜庆', value: 'red', color: '#ff3739' },
  { label: '清新', value: 'blue', color: '#eff7ff' }
];

@connect((state) => ({
  layout: state.global.layout
}))
class Setting extends Component {
  constructor(props) {
    super(props);
    this.sysLayoutOption = this.props.layout['/'] || 'SiderLayout';
    this.loginLayoutOption = this.props.layout['/user'] || 'UnauthorizedRightLayout';
    this.state = {
      themeName: store.getItem('theme', true) || 'default'
    };
  }

  onSysLayoutChange = (e) => {
    this.sysLayoutOption = e.target.value;
    const data = {
      '/': e.target.value,
      '/user': this.loginLayoutOption
    };
    this.props.dispatch({ type: 'global/setLayout', payload: data });
  };

  onLoginLayoutChange = (e) => {
    this.loginLayoutOption = e.target.value;
    const data = {
      '/': this.sysLayoutOption,
      '/user': e.target.value
    };
    this.props.dispatch({ type: 'global/setLayout', payload: data });
  };

  onThemeChange = (e) => {
    const themeName = e.target.value;
    this.setState({ themeName });
    theme.changeTheme(e.target.value);
    store.setItem('theme', themeName, true);
  };

  render() {
    const sysLayouts = sysLayoutOptions.map((item) => {
      return (
        <div style={{ display: 'block', float: 'left' }} key={`${item.value}`}>
          <img src={item.icon} alt="" style={{ padding: '10px 20px 10px 0' }} />
          <Radio value={item.value} style={{ display: 'block' }}>
            {item.label}
          </Radio>
        </div>
      );
    });

    const loginLayouts = loginLayoutOptions.map((item) => {
      return (
        <div style={{ display: 'block', float: 'left' }} key={`${item.value}`}>
          <img src={item.icon} alt="" style={{ padding: '10px 20px 10px 0' }} />
          <Radio value={item.value} style={{ display: 'block' }}>
            {item.label}
          </Radio>
        </div>
      );
    });

    const themeRadios = themeOptions.map((item) => {
      return (
        <div style={{ display: 'block', float: 'left', margin: '0 10px' }} key={`${item.value}`}>
          <div
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '5px',
              backgroundColor: item.color,
              margin: '10px 20px 10px 5px'
            }}
          />
          <Radio value={item.value} style={{ display: 'block' }}>
            {item.label}
          </Radio>
        </div>
      );
    });

    return (
      <Card bordered={false}>
        <div style={{ minHeight: 500, height: '60%' }}>
          <div>
            <h4> 基本布局 </h4>
            <RadioGroup onChange={this.onSysLayoutChange} value={this.sysLayoutOption}>
              {sysLayouts}
            </RadioGroup>
          </div>
          <Divider />
          <div>
            <h4 style={{ marginTop: '20px' }}> 登录页布局 </h4>
            <RadioGroup onChange={this.onLoginLayoutChange} value={this.loginLayoutOption}>
              {loginLayouts}
            </RadioGroup>
          </div>
          <Divider />
          <div>
            <h4 style={{ marginTop: '20px' }}> 主题切换 </h4>
            <RadioGroup onChange={this.onThemeChange} value={this.state.themeName}>
              {themeRadios}
            </RadioGroup>
          </div>
        </div>
      </Card>
    );
  }
}
export default wrapWithPageHeaderLayout(Setting, {
  breadcrumbList: [
    {
      title: (
        <span className="ant-breadcrumb-link">
          <Icon type="book" />
          <span>系统设置</span>
        </span>
      )
    }
  ]
});
