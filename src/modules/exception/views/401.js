/**
 * @author zenglongfei
 * @time 2018/5/4
 * @version v3.0.0
 * @class
 */
import React, { Component } from 'react';
import { Link } from 'dva/router';
import Exception from '../../../components/Exception';
import style from './401.less';

class Exception401 extends Component {
  render() {
    return (
      <Exception
        className={style.exception401}
        type="401"
        style={{ minHeight: 500, height: '80%' }}
        linkElement={Link}
      />
    );
  }
}
export default Exception401;
