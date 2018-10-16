import { io } from 'SinoGear';

import { config } from '../../../../common/config';

export async function queryTags() {
  return io.post(`${config.contextPath}/api/tags`);
}
