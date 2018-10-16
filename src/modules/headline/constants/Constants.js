import { config } from '../../../common/config';

/**
 * 命名空间namespace
 * @type {string}
 */
export const NAMESPACE = 'headline';

/**
 * 请求资源URL
 * @type {string}
 */
export const RESOURCE_URL = `${config.jsonServerUrl}`;

/**
 * 请求左侧菜单栏资源URL
 * @type {string}
 */
export const MENU_URL = `${config.jsonServerUrl}/menu`;

/**
 * 请求走马灯图片资源URL
 * @type {string}
 */
export const CAROUSEL_URL = `${config.jsonServerUrl}/carousel`;

/**
 * 请求新闻资源URL
 * @type {string}
 */
export const NEWS_URL = `${config.jsonServerUrl}/news`;
