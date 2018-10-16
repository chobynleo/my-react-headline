import { io } from 'SinoGear';

import { config } from '../../../common/config';

export async function queryBasicProfile() {
  return io.get(`${config.contextPath}/api/profile/basic`);
}

export async function queryAdvancedProfile() {
  return io.get(`${config.contextPath}/api/profile/advanced`);
}
