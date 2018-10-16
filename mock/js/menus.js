/**
 * @author zenglongfei
 * @time 2017/12/28
 * @version v3.0.0
 * @class
 */

/*
 mockjs语法参考官网http://mockjs.com/
 */
const Mock = require('mockjs');

const fetchMenus = '/api/users/dd55bda7-df0d-4b77-99b2-7056717c6923/navMenus';
const menus = [
  {
    name: '主页',
    icon: 'home',
    path: '/home'
  },
  {
    name: '示例模块',
    icon: 'code-o',
    path: '/example',
    children: [
      {
        name: '学生管理',
        icon: 'team',
        path: '/example/student'
      },
      {
        name: '今日头条',
        icon: 'team',
        path: '/example/headline'
      }
    ]
  },
  {
    name: '组件样例',
    icon: 'api',
    path: '/component',
    children: [
      {
        name: '按钮',
        path: '/component/button'
      },
      {
        name: '表格',
        path: '/component/table'
      }
    ]
  },
  {
    name: '图表页',
    icon: 'area-chart',
    path: '/chart',
    children: [
      {
        name: '分析页',
        path: '/chart/analysis'
      },
      {
        name: '监控页',
        path: '/chart/monitor'
      }
    ]
  },
  {
    name: '表单页',
    icon: 'form',
    path: '/form',
    children: [
      {
        name: '基础表单',
        path: '/form/basic-form'
      },
      {
        name: '分步表单',
        path: '/form/step-form'
      },
      {
        name: '字典表单',
        path: '/form/dict-form'
      },
      {
        name: '高级表单',
        authority: 'admin',
        path: '/form/advanced-form'
      }
    ]
  },
  {
    name: '列表页',
    icon: 'table',
    path: '/list',
    children: [
      {
        name: '查询表格',
        path: '/list/table-list'
      },
      {
        name: '标准列表',
        path: '/list/basic-list'
      },
      {
        name: '卡片列表',
        path: '/list/card-list'
      },
      {
        name: '搜索列表',
        path: '/list/search',
        children: [
          {
            name: '搜索列表（文章）',
            path: '/list/search/articles'
          },
          {
            name: '搜索列表（项目）',
            path: '/list/search/projects'
          },
          {
            name: '搜索列表（应用）',
            path: '/list/search/applications'
          }
        ]
      }
    ]
  },
  {
    name: '详情页',
    icon: 'profile',
    path: '/profile',
    children: [
      {
        name: '基础详情页',
        path: '/profile/basic'
      },
      {
        name: '高级详情页',
        path: '/profile/advanced',
        authority: 'admin'
      }
    ]
  },
  {
    name: '结果页',
    icon: 'check-circle-o',
    path: '/result',
    children: [
      {
        name: '成功',
        path: '/result/success'
      },
      {
        name: '失败',
        path: '/result/fail'
      }
    ]
  },
  {
    name: '异常',
    icon: 'exception',
    path: '/exception',
    children: [
      {
        name: '403',
        path: '/exception/403'
      },
      {
        name: '404',
        path: '/exception/404'
      },
      {
        name: '500',
        path: '/exception/500'
      }
    ]
  },
  {
    name: '帐户',
    icon: 'user',
    path: '/user',
    children: [
      {
        name: '登录',
        path: '/user/login'
      },
      {
        name: '注册',
        path: '/user/register'
      }
    ]
  },
  {
    name: '使用文档',
    icon: 'book',
    path: 'http://192.168.14.47:8007/#/components',
    target: '_blank'
  }
];

module.exports = {
  [`GET ${fetchMenus}`](req, res) {
    res.json(menus);
  },
  [`POST ${fetchMenus}`](req, res) {
    res.json(menus);
  }
};
