import React, { Component } from 'react';
import { Link } from 'dva/router';
import Exception from '../../../components/Exception';
import style from './500.less';

class Exception500 extends Component {
  render() {
    return (
      <Exception
        className={style.exception500}
        type="500"
        style={{ minHeight: 500, height: '80%' }}
        linkElement={Link}
      />
    );
  }
}

export default Exception500;
