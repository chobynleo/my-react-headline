import React, { Component } from 'react';
import FullPageCalendar from '../../../../../components/FullPageCalendar';
import { wrapWithPageHeaderLayout } from '../../../../layouts/views/wrapWithPageHeaderLayout';
import styles from './index.less';

// 所有例外时间 -- 以类型组织
const allSelectedDate = {
  offday: ['2018-1-1', '2018-6-18', '2018-9-24'],
  reday: ['2018-4-8', '2018-4-28', '2018-9-29', '2018-9-30'],
  yuandan: ['2018-1-1'],
  chunjie: ['2018-2-15', '2018-2-16', '2018-2-17', '2018-2-18', '2018-2-19', '2018-2-20', '2018-2-21'],
  qingming: ['2018-4-5', '2018-4-6', '2018-4-7'],
  laodong: ['2018-4-29', '2018-4-30', '2018-5-1'],
  duanwu: ['2018-6-16', '2018-6-17', '2018-6-18'],
  zhongqiu: ['2018-9-22', '2018-9-23', '2018-9-24'],
  guoqing: ['2018-10-1', '2018-10-2', '2018-10-3', '2018-10-4', '2018-10-5', '2018-10-6', '2018-10-7']
};

const excludeTypeData = [
  {
    label: '调休日',
    value: 'offday',
    badge: true,
    badgeLabel: '休',
    badgeStyle: {
      backgroundColor: '#1e88ca'
    }
  },
  {
    label: '补班日',
    value: 'reday',
    badge: true,
    badgeLabel: '班',
    badgeStyle: {
      backgroundColor: '#ae1109'
    }
  },
  {
    label: '节假日',
    value: 'holiday',
    color: 'blue',
    icon: 'smile-o',
    children: [
      { label: '元旦', value: 'yuandan', color: '#1e88ca' },
      { label: '春节', value: 'chunjie', color: '#FF0080' },
      { label: '清明', value: 'qingming', color: '#1e88ca' },
      { label: '劳动', value: 'laodong', color: '#1e88ca' },
      { label: '端午', value: 'duanwu', color: '#1e88ca' },
      { label: '中秋', value: 'zhongqiu', color: '#1e88ca' },
      { label: '国庆', value: 'guoqing', color: '#1e88ca' }
    ]
  }
];

const fomatter = 'YYYY-MM-DD';

class FullPageCalendarDemo extends Component {
  onYearSelect = (data) => {
    console.info('调试输出 onYearSelect data:', data);
  };

  onSave = (data) => {
    console.info('调试输出 onSave data:', data);
  };

  onDel = (data) => {
    console.info('调试输出 onDel data:', data);
  };

  render() {
    return (
      <div className={styles.pageContainer}>
        <FullPageCalendar
          lunarVisible
          fomatter={fomatter}
          allSelectedDate={allSelectedDate}
          excludeTypes={excludeTypeData}
          selectedYear={2018}
          showRangeYear={[4, 7]}
          allInOneSave={false}
          onYearSelect={this.onYearSelect}
          onSave={this.onSave}
          onDel={this.onDel}
        />;
      </div>
    );
  }
}

const content = '适用于平铺展示全年日期并设置日期的场景';
export default wrapWithPageHeaderLayout(FullPageCalendarDemo, { title: '日期管理', content });
