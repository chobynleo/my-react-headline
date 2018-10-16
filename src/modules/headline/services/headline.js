import { io } from 'SinoGear';

import { MENU_URL, CAROUSEL_URL, NEWS_URL } from '../constants/Constants';

/**
 *  请求左侧菜单栏资源
 * @param payload
 * @returns {Promise.<*|http.ClientRequest|ClientHttp2Stream|Promise|ClientRequest>}
 */
export async function getMenuResource() {
  return io.get(`${MENU_URL}`);
}

/**
 *  请求走马灯资源
 * @param payload
 * @returns {Promise.<*|http.ClientRequest|ClientHttp2Stream|Promise|ClientRequest>}
 */
export async function getCarouselResource() {
  return io.get(`${CAROUSEL_URL}`);
}

/**
 *  请求新闻资源
 * @param payload
 * @returns {Promi  se.<*|http.ClientRequest|ClientHttp2Stream|Promise|ClientRequest>}
 */
export async function getNewsResource(payload) {
  const { pageSize, currentPage } = payload;
  return io.get(`${NEWS_URL}?_limit=${pageSize}&_page=${currentPage}`);
}
