import React, { Component } from 'react';
import { Link } from 'dva/router';
import Exception from '../../../components/Exception';
import style from './404.less';

class Exception404 extends Component {
  render() {
    return (
      <Exception
        className={style.exception404}
        type="404"
        style={{ minHeight: 500, height: '80%' }}
        linkElement={Link}
      />
    );
  }
}

export default Exception404;
