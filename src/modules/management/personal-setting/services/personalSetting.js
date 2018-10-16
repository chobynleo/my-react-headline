import { io } from 'SinoGear';
import { RESOURCE_URL } from '../constants/Constants';

/**
 * 初始化个人中心数据信息
 * @param payload
 * @returns {Promise.<void>}
 */
export async function initPersonal(id) {
  return io.get(`${RESOURCE_URL}/${id}`);
}

export async function modifyData(data, id) {
  return io.put(`${RESOURCE_URL}/${id}`, data);
}
