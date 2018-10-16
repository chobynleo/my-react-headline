import 'rc-drawer-menu/assets/index.css';
import React from 'react';
import { Link } from 'dva/router';
import DrawerMenu from 'rc-drawer-menu';
import SiderMenu from './SiderMenu';
import styles from './index.less';

export default (props) =>
  props.isMobile ? (
    <DrawerMenu
      parent={null}
      level={null}
      iconChild={null}
      open={!props.collapsed}
      onMaskClick={() => {
        props.onCollapse(true);
      }}
      width="256px">
      <SiderMenu {...props} collapsed={props.isMobile ? false : props.collapsed} />
    </DrawerMenu>
  ) : (
    <SiderMenu {...props} />
  );
