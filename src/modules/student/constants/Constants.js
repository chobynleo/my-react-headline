import { config } from '../../../common/config';

/**
 * 命名空间namespace
 * @type {string}
 */
export const NAMESPACE = 'student';

/**
 * 编辑对话框选择班级状态
 * @type {string}
 */
export const SELECT_CLASS_TYPE = 'select_class';

/**
 * 请求资源URL
 * @type {string}
 */
export const RESOURCE_URL = `${config.contextPath}/api/students`;

/**
 * 分页查询URL
 * @type {string}
 */
export const PAGE_QUERY_URL = `${RESOURCE_URL}/query`;

/**
 *  批量删除学生
 * @type {string}
 */
export const PAGE_DELETE_BATCH = `${RESOURCE_URL}/deleteSelectedStudent`;

/**
 * 字典类别和字典的资源URL
 * @type {string}
 */
export const DICTS_RECOURCE_URL = `${config.contextPath}/api/dicts`;

/**
 * 字典项的资源URL
 * @type {string}
 */
export const DICTS_ITEM_RECOURCE_URL = `${DICTS_RECOURCE_URL}/item`;

/**
 * 字典类别和字典的URL
 * @type {string}
 */
export const DICTS_ITEM_QUERY_URL = `${DICTS_ITEM_RECOURCE_URL}/kindCode`;

/**
 * 分页查询过字典类别和字典URL
 * @type {string}
 */
export const DICTS_QUERY_PAGE_URL = `${DICTS_ITEM_RECOURCE_URL}/query`;

/**
 * 班级类型的kindCode
 * @type {string}
 */
export const DICT_KIND_DEMO_STUDENT_CLASS_TYPE = 'DICT_KIND_DEMO_STUDENT_CLASS_TYPE';

/**
 * 性别类型的kindCode
 * @type {string}
 */
export const DICT_KIND_DEMO_STUDENT_SEX_TYPE = 'DICT_KIND_DEMO_STUDENT_SEX_TYPE';
