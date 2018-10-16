import { io } from 'SinoGear';
import { stringify } from 'qs';

import { config } from '../../../../common/config';

export async function query(params) {
  return io.get(`${config.contextPath}/api/list?${stringify(params)}`);
}
