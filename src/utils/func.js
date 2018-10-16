import moment from 'moment';

export const common = {
  isObject(value) {
    return Object.prototype.toString.call(value) === '[object Object]';
  },
  isFunc(value) {
    return Object.prototype.toString.call(value) === '[object Function]';
  },
  isArray(value) {
    return Object.prototype.toString.call(value) === '[object Array]';
  },
  digitUppercase(n) {
    const fraction = ['角', '分'];
    const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    const unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']];
    let num = Math.abs(n);
    let s = '';
    fraction.forEach((item, index) => {
      s += (digit[Math.floor(num * 10 * 10 ** index) % 10] + item).replace(/零./, '');
    });
    s = s || '整';
    num = Math.floor(num);
    for (let i = 0; i < unit[0].length && num > 0; i += 1) {
      let p = '';
      for (let j = 0; j < unit[1].length && num > 0; j += 1) {
        p = digit[num % 10] + unit[1][j] + p;
        num = Math.floor(num / 10);
      }
      s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    }

    return s
      .replace(/(零.)*零元/, '元')
      .replace(/(零.)+/g, '零')
      .replace(/^整$/, '零元整');
  },
  fixedZero(val) {
    return val * 1 < 10 ? `0${val}` : val;
  },
  getTimeDistance(type) {
    const now = new Date();
    const oneDay = 1000 * 60 * 60 * 24;
    if (type === 'today') {
      now.setHours(0);
      now.setMinutes(0);
      now.setSeconds(0);
      return [moment(now), moment(now.getTime() + (oneDay - 1000))];
    }

    if (type === 'week') {
      let day = now.getDay();
      now.setHours(0);
      now.setMinutes(0);
      now.setSeconds(0);

      if (day === 0) {
        day = 6;
      } else {
        day -= 1;
      }

      const beginTime = now.getTime() - day * oneDay;

      return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))];
    }

    if (type === 'month') {
      const year = now.getFullYear();
      const month = now.getMonth();
      const nextDate = moment(now).add(1, 'months');
      const nextYear = nextDate.year();
      const nextMonth = nextDate.month();

      return [
        moment(`${year}-${this.fixedZero(month + 1)}-01 00:00:00`),
        moment(moment(`${nextYear}-${this.fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000)
      ];
    }

    if (type === 'year') {
      const year = now.getFullYear();

      return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)];
    }
  }
};

export const url = {
  /**
   * 获取当前url中指定的name参数
   * @param {String} name 参数名称
   * @return {String} 指定的值
   */
  queryURL(name) {
    const after = window.location.hash.split('?')[1];
    if (after) {
      const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
      const r = after.match(reg);
      if (r != null) {
        return decodeURIComponent(r[2]);
      } else {
        return null;
      }
    }
    return null;
  },
  getUrlParams() {
    const requestParams = {};
    const after = window.location.hash.split('?')[1];
    if (after) {
      const params = after.split('&');
      for (let i = 0; i < params.length; i += 1) {
        const key = params[i].split('=')[0];
        // from是登录拦截的关键字,_k是router中自带的hash参数
        if (!(key === 'from' || key === '_k')) {
          requestParams[params[i].split('=')[0]] = decodeURIComponent(params[i].split('=')[1]);
        }
      }
    }
    return requestParams;
  },
  getFromParam() {
    let from = this.queryURL('from');
    if (from) {
      // 增加url中的参数
      const urlParams = this.getUrlParams();
      if (Object.keys(urlParams).length > 0) {
        for (const key of Object.keys(urlParams)) {
          if (from.indexOf('?') > -1) {
            from = `${from}&${key}=${urlParams[key]}`;
          } else {
            from = `${from}?${key}=${urlParams[key]}`;
          }
        }
      }
      return from;
    } else {
      return '/';
    }
  }
};

export const router = {
  /**
   * dva订阅路由变化监听
   * @param {Object} history         dva历史对象
   * @param {String} matchPath       匹配的路径
   * @param {Function} matchCallBack 匹配的回调函数
   * @return {void}
   */
  subscriptionsHistoryListen(history, matchPath, matchCallBack) {
    history.listen(({ pathname }) => {
      if (pathname === matchPath) {
        matchCallBack();
      }
    });
  },

  /**
   * 格式化menuData，按菜单层次归类节点，补充完整path
   * @param {Array} data 菜单数据
   * @param {String} parentPath 父路径
   * @returns {Array} 补充完整的path菜单数据
   */
  formatter(data, parentPath = '') {
    const list = [];
    data.forEach((item) => {
      if (item.children) {
        list.push({
          ...item,
          path: `${parentPath}${item.path}`,
          children: this.formatter(item.children, `${parentPath}${item.path}/`)
        });
      } else {
        list.push({
          ...item,
          path: `${parentPath}${item.path}`
        });
      }
    });
    return list;
  },

  /**
   * 获取平铺的节点数据
   * @param {Array} menuData 菜单数据
   * @returns {{}} 平铺的节点数据
   返回示例:
   {
   home: "主页"
   http://192.168.14.47:8007/#/components: "使用文档"
   test: "一级菜单1"
   test/test-1: "二级菜单1"
   test/test-1/test-1-1: "三级菜单1"
   test/test-1/test-1-2: "三级菜单2"
   test/test-1/test-1-3: "三级菜单3"
   test/test-2: "二级菜单2"
   user: "帐户"
   user/login: "登录"
   user/register: "注册"
   }
   */
  getFlatMenuData(menuData) {
    let keys = {};
    menuData.forEach((item) => {
      if (item.children) {
        keys[item.path] = item.name;
        keys = { ...keys, ...this.getFlatMenuData(item.children) };
      } else {
        keys[item.path] = item.name;
      }
    });
    return keys;
  },

  /**
   * 根据菜单数据，获取所有非根节点跳转地址，
   * 默认跳转到当前节点的第一个叶子节点
   * @param {Array} menuData 菜单数据
   * @returns {Array} 非根节点跳转地址
   */
  getRedirect(menuData) {
    const redirectData = [];
    this.getRedirectItem = (item) => {
      if (item && item.children) {
        if (item.children[0] && item.children[0].path) {
          redirectData.push({
            from: `${item.path}`,
            to: `${item.children[0].path}`
          });
          item.children.forEach((children) => {
            this.getRedirectItem(children);
          });
        }
      }
    };
    menuData.forEach((item) => {
      this.getRedirectItem(item);
    });
    return redirectData;
  },
  getRelation(str1, str2) {
    if (str1 === str2) {
      console.warn('Two path are equal!'); // eslint-disable-line
    }
    const arr1 = str1.split('/');
    const arr2 = str2.split('/');
    if (arr2.every((item, index) => item === arr1[index])) {
      return 1;
    } else if (arr1.every((item, index) => item === arr2[index])) {
      return 2;
    }
    return 3;
  },
  getRoutes(path, routerData) {
    let routes = Object.keys(routerData).filter((routePath) => routePath.indexOf(path) === 0 && routePath !== path);
    routes = routes.map((item) => item.replace(path, ''));
    let renderArr = [];
    renderArr.push(routes[0]);
    for (let i = 1; i < routes.length; i += 1) {
      let isAdd = false;
      isAdd = renderArr.every((item) => this.getRelation(item, routes[i]) === 3);
      renderArr = renderArr.filter((item) => this.getRelation(item, routes[i]) !== 1);
      if (isAdd) {
        renderArr.push(routes[i]);
      }
    }
    const renderRoutes = renderArr.map((item) => {
      const exact = !routes.some((route) => route !== item && this.getRelation(route, item) === 1);
      return {
        key: `${path}${item}`,
        path: `${path}${item}`,
        component: routerData[`${path}${item}`].component,
        exact
      };
    });
    return renderRoutes;
  }
};

export const tips = {
  /**
   * 获取错误的提示信息
   * @param {Object} error js的error或SGError
   * @return {String} 错误提示信息
   */
  getErrorMsg(error) {
    if (error) {
      if (error.tips) {
        return error.tips();
      } else if (error.message) {
        return error.message;
      } else {
        return '错误对象未定义';
      }
    }
    return '错误对象未定义';
  }
};

export const store = {
  getItem(key, useLocalStorage) {
    const data = useLocalStorage && useLocalStorage === true ? localStorage.getItem(key) : sessionStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  },
  setItem(key, data, useLocalStorage) {
    if (useLocalStorage && useLocalStorage === true) {
      localStorage.setItem(key, JSON.stringify(data));
    } else {
      sessionStorage.setItem(key, JSON.stringify(data));
    }
  },
  removeItem(key, useLocalStorage) {
    if (useLocalStorage && useLocalStorage === true) {
      localStorage.removeItem(key);
    } else {
      sessionStorage.removeItem(key);
    }
  }
};

export const theme = {
  /**
   * 改变主题
   * @param {string} themeName 改变的主题名
   * @return {null}  无
   */
  changeTheme(themeName) {
    if (!document.getElementById(`styles-${themeName}`)) {
      const aLink = document.createElement('link');
      aLink.setAttribute('href', `${themeName}.css`);
      aLink.setAttribute('rel', 'stylesheet');
      aLink.setAttribute('id', `styles-${themeName}`);
      document.head.appendChild(aLink);
    }
    const links = document.head.getElementsByTagName('link');
    for (let index = 0; index < links.length; index += 1) {
      const tmpLink = links[index];
      if (tmpLink.id) {
        if (tmpLink.id === `styles-${themeName}`) {
          tmpLink.disabled = false;
        } else {
          tmpLink.disabled = true;
        }
      }
    }
  }
};

export const version = {
  getSiderShowVersion(versionName) {
    if (versionName === null || versionName === undefined) {
      return '';
    }
    // 左侧logo版本没有多余的位置完全显示版本号,所以截取-之前的
    const splitIndex = versionName.indexOf('-');
    if (splitIndex > -1) {
      return versionName.substring(0, splitIndex);
    }
    return versionName;
  }
};
