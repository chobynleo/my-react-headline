/**
 * Created by laishuliang on 2018/7/17.
 */

import React from 'react';
import { Button, DatePicker, Icon, Badge, Radio, Pagination } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import FullCalendar from './rc-calendar/src/FullCalendar';
import EditDialog from './EditDialog';
import chineseLunar from './chinese-lunar';
import zhCN from './rc-calendar/src/locale/zh_CN';
import './rc-calendar/node_modules/assets/index.less';
import styles from './FullPageCalendar.less';

const now = moment();
now.locale('zh-cn').utcOffset(8);

function noop() {
  return null;
}

function getIdFromDate(date) {
  return `rc-calendar-${date.year()}-${date.month()}-${date.date()}`;
}

class FullPageCalendar extends React.Component {
  static defaultProps = {
    fomatter: 'YYYY-MM-DD'
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      lunarVisible: props.lunarVisible || true, // 是否显示农历
      selectedYear: props.selectedYear || now.year(),
      formData: {},
      // selectedDate: [], // [start, end]  -- moment格式，当次选择的例外时间段
      // selectedDateType: ['', ''], // 当次选择的例外类型
      allSelectedDate: props.allSelectedDate || {}
    };
    this.yearArray = [];
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lunarVisible !== this.props.lunarVisible) {
      this.setState({
        lunarVisible: nextProps.lunarVisible
      });
    }
    if (nextProps.selectedYear !== this.props.selectedYear) {
      this.onYearSelect(nextProps.selectedYear);
    }
    if (nextProps.allSelectedDate !== this.props.allSelectedDate) {
      this.setState({
        allSelectedDate: nextProps.allSelectedDate
      });
    }
  }

  /**
   * 单击选择日期操作
   * @param value
   */
  onDateSelect = (value) => {
    value.locale('zh-cn').utcOffset(8);
    // const formData = {};
    // formData.selectedDateType = ['holiday', 'laodong'];
    // formData.selectedDate = [moment('2018-5-1'), moment('2018-5-3')];
    const formData = this.getHitData(value.format(this.props.fomatter));
    this.setState({
      visible: true,
      formData
    });
  };

  /**
   * 获取已选中数据
   * @param value
   */
  getHitData = (value) => {
    const result = {};
    const { allSelectedDate } = this.state;
    const { excludeTypes } = this.props;
    const defalutRangeDate = [moment(value), moment(value)];
    let hit = false;
    for (const key in allSelectedDate) {
      allSelectedDate[key].forEach((item, index) => {
        if (moment(item).isSame(moment(value))) {
          result.selectedDateType = this.getHitDateType(key);
          result.selectedDate = this.getHitDate(index, allSelectedDate[key]);
          hit = true;
        }
      });
    }
    if (!hit) {
      result.selectedDateType = [excludeTypes[0].value, ''];
      result.selectedDate = defalutRangeDate;
      result.reset = true;
    }
    return result;
  };

  getHitDateType = (dateType) => {
    const { excludeTypes } = this.props;
    let pValue = '';
    let result = [];
    const q = (data, isChild) => {
      for (const typeIndex in data) {
        if (data.hasOwnProperty(typeIndex)) {
          const { value, children } = data[typeIndex];
          if (value === dateType) {
            result = isChild ? [pValue, value] : [value, ''];
          }
          if (children) {
            pValue = value;
            q(children, true);
          }
        }
      }
    };
    q(excludeTypes, false);
    return result;
  };

  getHitDate = (index, items) => {
    const len = items.length;
    const rangeResult = [moment(items[0]), moment(items[len - 1])];
    let c = 1;
    while (c <= index) {
      const temp = items[index - c];
      if (moment(items[index]).diff(moment(temp), 'days') !== c) {
        rangeResult[0] = moment(items[index - c + 1]);
        break;
      }
      c += 1;
    }
    c = 1;
    while (c <= len - index) {
      const temp = items[index + c];
      if (moment(temp).diff(moment(items[index]), 'days') !== c) {
        rangeResult[1] = moment(items[index + c - 1]);
        break;
      }
      c += 1;
    }
    return rangeResult;
  };

  /**
   * 是否显示农历
   */
  onLunarVisible = () => {
    this.setState({
      lunarVisible: !this.state.lunarVisible
    });
  };

  /**
   * 保存
   */
  onSave = () => {
    if (this.props && this.props.onSave) {
      this.props.onSave(this.state.allSelectedDate);
    }
  };

  /**
   * 切换年
   * @param value
   */
  onYearSelect = (e) => {
    const { onYearSelect } = this.props;
    const value = e.target.value;
    this.setState({
      selectedYear: value
    });
    if (onYearSelect) {
      onYearSelect(value);
    }
  };

  getSelectedDateType = (selectedDateType) => {
    if (selectedDateType.constructor === Array && selectedDateType.length === 2) {
      if (selectedDateType[1] === '') {
        return selectedDateType[0];
      } else {
        return selectedDateType[1];
      }
    }
  };

  /**
   * 关闭编辑管理日期modal
   * @param e
   */
  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  /**
   * 日期管理选择后操作
   * @param result
   */
  handleOk = (result) => {
    this.setState({
      visible: false
    });

    const { selectedDateType, selectedDate } = result;
    const { onSave, onDel, allInOneSave, fomatter } = this.props;
    const { allSelectedDate } = this.state;

    const curSelectedDateType = this.getSelectedDateType(selectedDateType);

    const originalCurSelectedDate = allSelectedDate[curSelectedDateType] || []; // 可作排它处理
    // 为后面indexOf判断删除，格式化初始化数据（月份补0）
    const curSelectedDate = originalCurSelectedDate.map((item) => {
      return moment(item).format(fomatter);
    });
    const curThisTimeSelectedDate = []; // 单次选择
    const diffDays = selectedDate[1].diff(selectedDate[0], 'days');
    for (let i = 0; i <= diffDays; i += 1) {
      // const tempStartDate = selectedDate[0]; // moment.add方法会改变当前moment对象，需对象复制
      const tempStartDate = moment(selectedDate[0]);
      const one = tempStartDate.add(i, 'days').format(fomatter);
      curThisTimeSelectedDate.push(one);
      result.del ? curSelectedDate.splice(curSelectedDate.indexOf(one), 1) : curSelectedDate.push(one);
    }
    const temp = {};
    const tempCurSelectedDate = {};
    tempCurSelectedDate[curSelectedDateType] = curSelectedDate; // 不影响其它类型
    Object.assign(temp, allSelectedDate, tempCurSelectedDate);
    this.setState({
      allSelectedDate: temp
    });

    const saveObj = {};
    saveObj[curSelectedDateType] = curThisTimeSelectedDate;
    // 单次提交
    if (!allInOneSave && !result.del) {
      onSave(saveObj);
    }
    if (result.del) {
      delete result.del;
      onDel(saveObj);
    }
  };

  /**
   * 月历头显示
   * @param value
   * @param type
   * @param locale
   * @returns {XML}
   */
  headerRender = (value) => {
    return (
      <div
        style={{
          fontSize: '16px',
          lineHeight: '30px',
          textAlign: 'center',
          borderBottom: '1px #ccc solid'
        }}>
        {value.year()}年{value.month() + 1}月
      </div>
    );
  };

  /**
   * 月历日期数据
   * @param value
   * @returns {XML}
   */
  dateCellRender = (value) => {
    // console.info('调试输出dateCellRender:', value);
    const { lunarVisible } = this.state;
    const { excludeTypes, fomatter } = this.props;
    const content = value.date();
    const weekday = value.isoWeekday();
    const judgeResult = this.holidayJudge(value);

    let contentEle;

    const addGregorianCalendar = (badge, label, badgeStyle) => {
      let baseContent = content;
      let tempEle;
      if (badge) {
        baseContent = [
          <Badge
            count={label}
            style={{
              marginLeft: '12px',
              color: '#fff',
              height: '16px',
              lineHeight: '14px',
              padding: '0px',
              ...badgeStyle
            }}>
            {content}
          </Badge>
        ];
      }
      if (weekday === 6 || weekday === 7) {
        tempEle = [<div style={{ fontSize: '16px', color: '#c14944', lineHeight: '20px' }}>{baseContent}</div>];
      } else {
        tempEle = [<div style={{ fontSize: '16px', lineHeight: '20px' }}>{baseContent}</div>];
      }
      if (!badge) {
        contentEle = tempEle;
      } else {
        return tempEle;
      }
    };

    const addLunarCalendar = () => {
      if (lunarVisible) {
        const lunar = chineseLunar.solarToLunar(new Date(value.format(fomatter)), 'D');
        contentEle = contentEle.concat([<div style={{ color: '#ccc' }}>{lunar}</div>]);
      }
    };

    addGregorianCalendar();
    addLunarCalendar();

    if (judgeResult.length > 0) {
      judgeResult.forEach((item) => {
        const q = (data) => {
          for (const typeIndex in data) {
            if (data.hasOwnProperty(typeIndex)) {
              const { label, value: v, color, icon, children, badge, badgeLabel, badgeStyle } = data[typeIndex];
              if (children) {
                q(children);
              }
              if (item === v) {
                if (badge && badge === true) {
                  contentEle[0] = addGregorianCalendar(true, badgeLabel, badgeStyle);
                }
                // 设置了角标，不显示label。
                if (!badge) {
                  contentEle[1] = [
                    <div style={color ? { color } : {}}>
                      {icon ? <Icon type={icon} /> : <span />} {label}
                    </div>
                  ];
                }
              }
            }
          }
        };
        q(excludeTypes);
      });
    }

    return (
      <div key={getIdFromDate(value)} className="rc-calendar-date">
        {contentEle}
        <div />
      </div>
    );
  };

  /**
   * 节假日判断
   * @param date
   * @returns {Array}
   */
  holidayJudge = (date) => {
    const { allSelectedDate } = this.state;
    const { excludeTypes } = this.props;
    const result = []; // 一个日期可以同属多个节日
    const q = (data) => {
      for (const index in data) {
        if (data.hasOwnProperty(index)) {
          const { value, children } = data[index];
          if (children) {
            q(children);
          }
          if (allSelectedDate && allSelectedDate[value]) {
            allSelectedDate[value].forEach((selectedValue) => {
              if (date.isSame(moment(selectedValue))) {
                result.push(value);
              }
            });
          }
        }
      }
    };
    q(excludeTypes);
    return result;
  };

  /**
   * 前一年，后一年操作
   * @param value
   */
  onPageChange = (value) => {
    const { onYearSelect } = this.props;
    if (value >= this.yearArray[0] && value <= this.yearArray[this.yearArray.length - 1]) {
      this.setState({
        selectedYear: value
      });
    }
    if (onYearSelect) {
      onYearSelect(value);
    }
  };

  /**
   * 根据当前选择的年份，计算显示年份
   */
  countShowYears = () => {
    const { selectedYear } = this.state;
    const result = [];
    const standardRange = 3; // 前后范围，可调节
    const curRange = []; // 当前范围，[开始索引，结束索引]
    const count = this.yearArray.length;
    const index = this.yearArray.indexOf(selectedYear) + 1; // 索引
    if (count - index < standardRange) {
      const compensatioValue = standardRange - (count - index);
      curRange.push(index - standardRange - compensatioValue);
      curRange.push(count);
    } else if (index <= standardRange) {
      const compensatioValue = standardRange - index + 1;
      curRange.push(1);
      curRange.push(index + standardRange + compensatioValue);
    } else {
      curRange.push(index - standardRange);
      curRange.push(index + standardRange);
    }
    for (let i = curRange[0]; i <= curRange[1]; i += 1) {
      result.push(this.yearArray[i - 1]);
    }
    return result;
  };

  render() {
    // console.log('render...');
    const { visible, lunarVisible, selectedYear, formData } = this.state;
    const { excludeTypes, showRangeYear, fomatter, allInOneSave } = this.props;
    const monthCards = [];
    const yearLabels = [];
    const yearArrayEle = [];
    for (let i = 1; i <= 12; i += 1) {
      const thisDate = moment(`${selectedYear}-${i}`);
      monthCards.push(
        <FullCalendar
          key={`FullCalendar-${i}`}
          style={{ margin: 10 }}
          Select={noop}
          fullscreen={false}
          onSelect={this.onDateSelect}
          value={thisDate}
          locale={zhCN}
          showTypeSwitch
          headerRender={this.headerRender}
          dateCellRender={this.dateCellRender}
        />
      );
    }

    if (this.yearArray.length === 0 && showRangeYear.constructor === Array && showRangeYear.length === 2) {
      const startYear = now.year() - showRangeYear[0];
      const endYear = now.year() + showRangeYear[1];
      for (let i = startYear; i <= endYear; i += 1) {
        this.yearArray.push(i);
      }
    }

    const showYears = this.countShowYears();

    showYears.forEach((item) => {
      yearArrayEle.push(
        <Radio.Button style={{ borderTop: '0px', borderBottom: '0px', fontSize: '20px' }} key={item} value={item}>
          <span style={selectedYear === item ? { color: 'red' } : {}}>{item}年</span>
        </Radio.Button>
      );
    });

    const yearStyle = {
      fontSize: '24px',
      color: '#999',
      padding: '0 6px',
      marginBottom: '6px',
      verticalAlign: 'middle',
      lineHeight: '32px',
      cursor: 'pointer'
    };

    yearLabels.push(
      <span>
        <Icon
          type="left"
          style={yearStyle}
          onClick={() => {
            this.onPageChange(selectedYear - 1);
          }}
        />&nbsp;&nbsp;
        {yearArrayEle}
        &nbsp;&nbsp;<Icon
          type="right"
          style={yearStyle}
          onClick={() => {
            this.onPageChange(selectedYear + 1);
          }}
        />
      </span>
    );

    const saveEle = allInOneSave ? (
      <div style={{ textAlign: 'left', margin: '20px' }}>
        <Button key="save" type="primary" size={32} onClick={() => this.onSave()}>
          保存
        </Button>
      </div>
    ) : (
      <div />
    );

    return (
      <div className={styles.fullpagecalendar}>
        {saveEle}
        <div style={{ textAlign: 'left', margin: '20px' }}>
          <Radio.Group value={selectedYear} buttonStyle="solid" onChange={this.onYearSelect}>
            {yearLabels}
          </Radio.Group>
          <span style={{ marginLeft: '20px' }}>
            <a onClick={() => this.onLunarVisible()}>{lunarVisible ? '隐藏农历' : '显示农历'}</a>
          </span>
        </div>
        <div>
          <span
            style={{
              zIndex: 1000,
              position: 'relative',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-around'
            }}>
            {monthCards}
          </span>
          <EditDialog
            excludeTypes={excludeTypes}
            formData={formData}
            format={fomatter}
            visible={visible}
            handleOk={this.handleOk}
            handleCancel={this.handleCancel}
          />
        </div>
      </div>
    );
  }
}

export default FullPageCalendar;
