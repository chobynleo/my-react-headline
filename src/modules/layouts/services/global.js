import { io } from 'SinoGear';

import { config } from '../../../common/config';

export async function queryNotices() {
  return io.get(config.contextPath + config.api.notices);
}

export async function getNavMenus({ id }) {
  return io.get(`${config.contextPath}/api/users/${id}/navMenus`, id);
}

export async function queryVersion() {
  return io.get(`${config.contextPath}/api/version`, {});
}
