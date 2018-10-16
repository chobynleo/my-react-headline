import { io } from 'SinoGear';

import { PAGE_DELETE_BATCH, DICTS_ITEM_QUERY_URL, RESOURCE_URL } from '../constants/Constants';

/**
 *  批量删除学生
 * @param payload
 * @returns {Promise.<*|http.ClientRequest|ClientHttp2Stream|Promise|ClientRequest>}
 */
export async function deleteBatch(payload = {}) {
  // selectedRowKeys: 被选中的学生的id数组
  const { selectedRowKeys } = payload;
  return io.delete(PAGE_DELETE_BATCH, selectedRowKeys);
}

/**
 * 查询字典类别有效的字典项
 * @param payload
 * @returns {Promise.<void>}
 */
export async function queryValidDicts(payload = {}) {
  // 字典类别kindCode
  const { kindCode } = payload;
  return io.get(`${DICTS_ITEM_QUERY_URL}/${kindCode}/valid`);
}

/**
 * 班级字典组件分页查询
 * @param payload
 * @returns {Promise.<void>}
 */
export async function queryDictsPagination(payload) {
  const { url, params, data } = payload;
  const { page, pageSize } = params;
  return io.post(`${url}?pageSize=${pageSize}&page=${page}`, data);
}

/**
 *  批量修改学生班级
 * @param payload
 * @returns {Promise.<*|http.ClientRequest|ClientHttp2Stream|Promise|ClientRequest>}
 */
export async function updeteClassBatch(payload = {}) {
  // ids: 被选中的学生的id数组
  // studentClass: 转到的班级id
  const { ids, studentClass } = payload;
  return io.put(`${RESOURCE_URL}/updateSelectedStudentClasses`, { ids, studentClass });
}
