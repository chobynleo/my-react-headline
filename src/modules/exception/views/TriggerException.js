import React, { PureComponent } from 'react';
import { Button, Spin, Card } from 'antd';
import { connect } from 'dva';
import styles from './TriggerException.less';

@connect((state) => ({
  isloading: state.loading.global
}))
export default class TriggerException extends PureComponent {
  state = {
    isloading: false
  };
  trigger401 = () => {
    this.props.dispatch({
      type: 'error/query401',
    });
  };
  trigger403 = () => {
    this.props.dispatch({
      type: 'error/query403',
    });
  };
  trigger500 = () => {
    this.props.dispatch({
      type: 'error/query500',
    });
  };
  trigger404 = () => {
    this.props.dispatch({
      type: 'error/query404',
    });
  };
  render() {
    return (
      <Card className={styles['sg-form_card']}>
        <Spin spinning={this.props.isloading} wrapperClassName={styles.trigger}>
          <Button type="danger" onClick={this.trigger401}>
            触发401
          </Button>
          <Button type="danger" onClick={this.trigger403}>
            触发403
          </Button>
          <Button type="danger" onClick={this.trigger500}>
            触发500
          </Button>
          <Button type="danger" onClick={this.trigger404}>
            触发404
          </Button>
        </Spin>
      </Card>
    );
  }
}
