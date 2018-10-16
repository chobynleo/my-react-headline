import { io } from 'SinoGear';

import { config } from '../../../../common/config';

export async function fakeSubmitForm(params) {
  return io.post(`${config.contextPath}/api/stepForm`, params);
}
