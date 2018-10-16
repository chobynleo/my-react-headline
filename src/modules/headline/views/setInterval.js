/**
 * 定时器，对走马灯进行轮播
 * @param dom 一个dom节点
 * @returns { start() } 开启定时器 ,{ stop() } 关闭定时器
 */
export function interval(dom1, dom2, setting) {
  if (dom1) {
    // 该节点是个dom节点
    const children1 = dom1.children;
    const children2 = dom2.children;
    // 条件
    const obj = {
      result: false,
      index: -1
    };
    for (let i = 0; i < children1.length; i++) {
      obj.result = ` ${children1[i].className} `.indexOf(' ' + 'slideItemActive___zDHko' + ' ') > -1;
      if (obj.result) {
        obj.index = i;
      }
    }
    return {
      open() {
        // 仅生成定时器
        makeInterval(children1, children2, obj.index, setting);
      },
      start() {
        // 立即执行切换
        toNextPicture(children1, children2, obj);
        // 生成定时器
        makeInterval(children1, children2, obj.index, setting);
      },
      stop() {
        if (itervalArr.length > 0) {
          for (let i = 0; i < itervalArr.length; i++) {
            clearInterval(itervalArr[i]);
          }
          itervalArr = [];
        }
      }
    };
  } else {
    return {
      stop() {
        if (itervalArr.length > 0) {
          for (let i = 0; i < itervalArr.length; i++) {
            clearInterval(itervalArr[i]);
          }
          itervalArr = [];
        }
      }
    };
  }
}

/**
 * 生成定时器,并添加到定时器数组
 */
function makeInterval(children1, children2, index, setting) {
  // 条件
  const obj = {
    result: false,
    index
  };
  const timeId = setInterval(() => {
    toNextPicture(children1, children2, obj);
  }, setting.speed);
  addIntervalArr(timeId);
}

/**
 *  切换下一张图片
 * @param children1 轮播图的li集合
 * @param children2 轮播图菜单的li集合
 * @param obj
 * @returns
 */
function toNextPicture(children1, children2, obj) {
  if (obj.index === -1) {
    children1[0].classList.add('slideItemActive___zDHko');
    children2[0].classList.add('slideTabItemActive___2nI8P');
    obj.index = 0;
  } else {
    for (let i = 0; i < children1.length; i++) {
      obj.result = ` ${children1[i].className} `.indexOf(' ' + 'slideItemActive___zDHko' + ' ') > -1;
      if (obj.result) {
        obj.index = i;
      }
    }
    if (obj.index !== 5) {
      // 轮播图
      children1[obj.index].classList.remove('slideItemActive___zDHko');
      children1[obj.index + 1].classList.add('slideItemActive___zDHko');
      // 轮播图菜单
      children2[obj.index].classList.remove('slideTabItemActive___2nI8P');
      children2[obj.index + 1].classList.add('slideTabItemActive___2nI8P');
    } else {
      // 轮播图
      children1[obj.index].classList.remove('slideItemActive___zDHko');
      children1[0].classList.add('slideItemActive___zDHko');
      // 轮播图菜单
      children2[obj.index].classList.remove('slideTabItemActive___2nI8P');
      children2[0].classList.add('slideTabItemActive___2nI8P');
    }
  }
}

/**
 * 存储定时器的数组
 */

let itervalArr = [];

/**
 * 添加定时器的数组
 * @param inter 一个定时器
 * @returns
 */
function addIntervalArr(inter) {
  itervalArr.push(inter);
}
