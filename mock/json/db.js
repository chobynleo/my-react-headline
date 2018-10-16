const Mock = require('mockjs');

const Random = Mock.Random;

module.exports = () => {
  const data = {
    carousel: {}, // 走马灯
    news: [], // 新闻
    menu: {} // 左侧菜单
  };
  // 左侧菜单栏
  data.menu.logoPic = 'https://s3.pstatp.com/toutiao/static/img/logo.201f80d.png';
  data.menu.items = ['推荐', '热点', '图片', '科技', '娱乐', '游戏', '体育', '汽车', '金融'];
  // 走马灯 随机数
  /*const images = [1, 2, 3].map((x) => Random.image('200x100', Random.color(), Random.word(2, 6)));
  for (let i = 0; i < 5; i++) {
    data.picture.push({
      id: i,
      images: images.slice(0, Random.integer(1, 3))
    });
  }*/
  // 走马灯 固定数
  data.carousel.picture = [];
  data.carousel.picture.push({
    id: 1,
    imgUrl: 'https://p3.pstatp.com/origin/aae000027b379fa5e528',
    title: '两艘6500方耙吸式挖泥船下水 助力“一带一路”港口建设'
  });
  data.carousel.picture.push({
    id: 2,
    imgUrl: 'https://p9.pstatp.com/origin/aadc0015bbc742f81aad',
    title: '“我想飞更高，摔得更重”石骨症患儿月输四次熊猫血 治病像赌博'
  });
  data.carousel.picture.push({
    id: 3,
    imgUrl: 'https://p3.pstatp.com/origin/aada001cb50858bb16f6',
    title: '美女和肥宅的恋爱史 乔纳·希尔征服女神靠的不是颜值是才气'
  });
  data.carousel.picture.push({
    id: 4,
    imgUrl: 'https://p3.pstatp.com/origin/aae000027ae32a21e170',
    title: '“撞脸兄弟”同框了！冯潇霆、赵旭日同场对位'
  });
  data.carousel.picture.push({
    id: 5,
    imgUrl: 'https://p99.pstatp.com/origin/aadf000500baf4d76773',
    title: '美反舰导弹加快研制，同时推五种导弹，研制历史罕见'
  });
  data.carousel.picture.push({
    id: 6,
    imgUrl: 'https://p99.pstatp.com/origin/aade0004fe99ca15f256',
    title: '张丹峰与经纪人闹绯闻后首现身 与妻女出席活动拒绝采访'
  });
  // 走马灯的轮播菜单
  data.carousel.items = ['要闻', '社会', '娱乐', '体育', '军事', '明星'];

  // 新闻 随机数
  //const images = [1, 2, 3].map((x) => Random.image('200x100', Random.color(), Random.word(2, 6)));
  for (let i = 0; i < 100; i++) {
    //const content = Random.cparagraph(0, 10);

    data.news.push({
      id: i,
      title: Random.ctitle(7, 20),
      other: Random.cword(2, 6),
      mediaAvatar: 'https://p9.pstatp.com/large/39fd00008f4757fe8cc1',
      media: Random.cname(),
      number: Random.integer(1, 1000),
      hour: Random.datetime(),
      images: Random.image('156x100', Random.color(), Random.word())
    });
  }

  return data;
};
