import { io } from 'SinoGear';

import { config } from '../../../../common/config';

export async function getFormDatas() {
  return io.post(`${config.contextPath}/api/dictForms`);
}

export async function getProjectSimpleName(params) {
  return io.post(
    `${config.contextPath}/api/dictForms/projectSimpleName?page=${params.page}&&pageSize=${params.pageSize}`
  );
}
