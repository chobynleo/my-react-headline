import { io } from 'SinoGear';
import { stringify } from 'qs';

import { config } from '../../../../common/config';

export async function query(params) {
  return io.get(`${config.contextPath}/api/rule?${stringify(params)}`);
}

export async function remove(params) {
  return io.delete(`${config.contextPath}/api/rule?${stringify(params)}`);
}

export async function add(params) {
  return io.post(`${config.contextPath}/api/rule`, params);
}
