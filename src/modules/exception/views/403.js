import React, { Component } from 'react';
import { Link } from 'dva/router';
import Exception from '../../../components/Exception';
import style from './403.less';

class Exception403 extends Component {
  render() {
    return (
      <Exception
        className={style.exception403}
        type="403"
        style={{ minHeight: 500, height: '80%' }}
        linkElement={Link}
      />
    );
  }
}
export default Exception403;
