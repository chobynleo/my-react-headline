import { io } from 'SinoGear';

import { config } from '../../../../common/config';

export async function fakeChartData() {
  return io.post(`${config.contextPath}/api/chart`);
}
