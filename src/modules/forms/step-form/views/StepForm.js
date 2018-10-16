import React, { PureComponent, Fragment } from 'react';
import { Route, Redirect, Switch } from 'dva/router';
import { Card, Steps } from 'antd';

import { router } from '../../../../utils/func';
import styles from './StepForm.less';
const { Step } = Steps;

class StepForm extends PureComponent {
  getCurrentStep() {
    const { location } = this.props;
    const { pathname } = location;
    const pathList = pathname.split('/');
    switch (pathList[pathList.length - 1]) {
      case 'info':
        return 0;
      case 'confirm':
        return 1;
      case 'result':
        return 2;
      default:
        return 0;
    }
  }
  render() {
    console.info(this.props);
    const { match, routerData } = this.props;
    return (
      <Card bordered={false} className={styles['sg-form_card']}>
        <Fragment>
          <Steps current={this.getCurrentStep()} className={styles.steps}>
            <Step title="填写转账信息" />
            <Step title="确认转账信息" />
            <Step title="完成" />
          </Steps>
          <Switch>
            {router
              .getRoutes(match.path, routerData)
              .map((item) => <Route key={item.key} path={item.path} component={item.component} exact={item.exact} />)}
            <Redirect exact from="/form/step-form" to="/form/step-form/info" />
          </Switch>
        </Fragment>
      </Card>
    );
  }
}

export default StepForm;
