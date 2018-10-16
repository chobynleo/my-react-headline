import { io } from 'SinoGear';

import Constants from '../common/Constants';

/**
 * 资源分页查询
 * @param {String} url 资源查询的url地址
 * @param {Object}
 *           pagination: 分页对象
 *          queryConditions: 查询条件
 * @returns {Promise.<*|AxiosPromise>} 分页查询结果
 */
async function query(url, { pagination, queryConditions }) {
  return io.post(`${url}?pageSize=${pagination.pageSize}&page=${pagination.page}`, queryConditions);
}

/**
 * 保存或修改资源
 * @param {String} url 资源的URL地址
 * @param {Object}
 *           editType: 编辑类型
 *           item: 保存或修改的资源
 * @returns {Promise} 保存后的对象
 */
async function saveOrUpdate(url, { editType, item }) {
  let apiUrl = url;
  let method = Constants.POST_METHOD;

  if (editType === Constants.UPDATE_TYPE) {
    method = Constants.PUT_METHOD;
    apiUrl = `${url}/${item.id}`;
  } else if (editType === Constants.PATCH_UPDATE_TYPE) {
    method = Constants.PATCH_METHOD;
    apiUrl = `${url}/${item.id}`;
  }
  return io.request(apiUrl, item, method);
}

/**
 * 修改部分资源
 * @param {String} url 资源的URL地址
 * @param {Object}
 *           item: 保存或修改的资源
 * @returns {Promise} 保存后的对象
 */
async function patchUpdate(url, { item }) {
  const apiUrl = `${url}/${item.id}`;
  const method = Constants.PATCH_METHOD;

  return io.request(apiUrl, item, method);
}

/**
 * 删除资源
 * @param {String} url 资源url
 * @param {Object}
 *          id: 资源的ID
 * @returns {Promise.<void>} 空响应
 */
async function deleteItem(url, { id }) {
  return io.delete(`${url}/${id}`);
}

/**
 * 查询资源对象
 * @param {String} url 资源URL地址
 * @param {Object}
 *          id: 资源ID
 * @returns {Promise.<void>} 根据ID查询的对象
 */
async function queryItemById(url, { id }) {
  return io.get(`${url}/${id}`);
}

export default {
  query,
  saveOrUpdate,
  patchUpdate,
  deleteItem,
  queryItemById
};
