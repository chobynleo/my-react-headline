/**
 * Created by laishuliang on 2018/7/25.
 */
import React, { Component, PropTypes } from 'react';
import { Row, Col, Select, Radio } from 'antd';

const { Option } = Select;

class SecondaryLinkage extends Component {
  constructor(props) {
    super(props);
    const value = props.value || ['', ''];
    this.state = {
      value
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      const { value } = nextProps;
      this.setState({ value });
    }
  }

  onPrimarySelectChange = (primaryValue) => {
    this.setValue(primaryValue, 0);
  };

  onPrimaryRadioChange = (e) => {
    const primaryValue = e.target.value;
    this.setValue(primaryValue, 0);
  };

  onSecondaryChange = (secondaryValue) => {
    this.setValue(secondaryValue, 1);
  };

  setValue = (changedValue, index) => {
    const { value } = this.state;
    const { data } = this.props;
    const result = value;
    result[index] = changedValue;
    if (index !== 1) {
      for (const i in data) {
        const { value: v, children } = data[i];
        if (v === changedValue) {
          if (children && children.length > 0) {
            value[1] = children[0].value;
          } else {
            value[1] = '';
          }
        }
      }
    }
    this.setState(result);
    this.triggerChange(result);
  };

  getSecondaryItems = (primaryValue) => {
    const { data } = this.props;
    for (let index in data) {
      const { value, children } = data[index];
      if (value === primaryValue) {
        return children || [];
      }
    }
  };

  triggerChange = (changedValue) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(changedValue);
    }
  };

  render() {
    // console.log('SecondaryLinkage render...');
    const { data } = this.props;
    const { value } = this.state;
    let secondaryOptions;
    const primaryOptions = data.map((primaryItem) => {
      return <Option key={primaryItem.value}>{primaryItem.label}</Option>;
    });

    const secondaryItems = this.getSecondaryItems(value[0]);
    if (secondaryItems) {
      secondaryOptions = secondaryItems.map((secondaryItem) => {
        return <Option key={secondaryItem.value}>{secondaryItem.label}</Option>;
      });
    }

    const primarySelectEle =
      primaryOptions.length > 3 ? (
        <div>
          <Select value={value[0]} style={{ width: 90 }} onChange={this.onPrimarySelectChange}>
            {primaryOptions}
          </Select>
        </div>
      ) : (
        <div>
          <Radio.Group value={value[0]} style={{ width: 220 }} buttonStyle="solid" onChange={this.onPrimaryRadioChange}>
            {data.map((primaryItem) => {
              return (
                <Radio.Button key={primaryItem.value} value={primaryItem.value}>
                  {primaryItem.label}
                </Radio.Button>
              );
            })}
          </Radio.Group>
        </div>
      );

    return (
      <div>
        <Row gutter={12}>
          <Col span={18}>{primarySelectEle}</Col>
          <Col span={6}>
            {secondaryOptions && secondaryOptions.length > 0 ? (
              <Select value={value[1]} style={{ width: 90 }} onChange={this.onSecondaryChange}>
                {secondaryOptions}
              </Select>
            ) : (
              <span />
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default SecondaryLinkage;
