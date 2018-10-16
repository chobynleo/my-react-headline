import { createElement } from 'react';
import dynamic from 'dva/dynamic';
import Layout from '../modules/layouts/views/Layout';
import SiderLayout from '../modules/layouts/views/SiderLayout';
import HeaderLayout from '../modules/layouts/views/HeaderLayout';
import HeaderSiderLayout from '../modules/layouts/views/HeaderSiderLayout';
import UnauthorizedLayout from '../modules/layouts/views/UnauthorizedLayout';
import UnauthorizedRightLayout from '../modules/layouts/views/UnauthorizedRightLayout';
import Setting from '../modules/layouts/views/Setting';
import PersonalSetting from '../modules/management/personal-setting/views/Container';
import FullPageCalendarDemo from '../modules/demo/calendar/fullpagecalendar/views/index';
import Login from '../modules/login/views/Login';
import Register from '../modules/login/views/Register';
import Exception401 from '../modules/exception/views/401';
import Exception403 from '../modules/exception/views/403';
import Exception404 from '../modules/exception/views/404';
import Exception500 from '../modules/exception/views/500';
import TriggerException from '../modules/exception/views/TriggerException';
import HomePage from '../modules/dashboard/views/HomePage';
import Analysis from '../modules/chart/analysis/views/Analysis';
import Monitor from '../modules/chart/monitor/views/Monitor';
import { StepForm, Step1, Step2, Step3 } from '../modules/forms/step-form/views/index';
import BasicForm from '../modules/forms/basic-form/views/BasicForm';
import DictForm from '../modules/forms/dict-form/views/DictForm';
import AdvancedForm from '../modules/forms/advanced-form/views/AdvancedForm';
import TableList from '../modules/list/table-list/views/TableList';
import BasicList from '../modules/list/basic-list/views/BasicList';
import CardList from '../modules/list/card-list/views/CardList';
import { FilterCardList, SearchList, CoverCardList } from '../modules/list/search-list/views/index';
import BasicProfile from '../modules/profile/views/BasicProfile';
import AdvancedProfile from '../modules/profile/views/AdvancedProfile';
import ButtonDemo from '../modules/component/button/views/Button';
import TableDemo from '../modules/component/table/views/Table';
import Error from '../modules/result/views/Error';
import Success from '../modules/result/views/Success';
import StudentPage from '../modules/student/views/index';
import HeadlinePage from '../modules/headline/views/index';
import { common as commonUtil } from '../utils/func';

let routerDataCache;

const modelNotExisted = (app, model) =>
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  });

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => {
  const isQuoteComp = commonUtil.isFunc(component);
  // () => import('module') or () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf('.then(') < 0 && !isQuoteComp) {
    models.forEach((model) => {
      if (modelNotExisted(app, model)) {
        // eslint-disable-next-line
        app.model(require(`../modules/${model}.js`).default);
      }
    });
    return (props) => {
      if (!routerDataCache) {
        const routerData = getRouterData(app);
        Object.keys(routerData).forEach((routerDataKey) => {
          if (routerDataKey.startsWith('/unused')) {
            delete routerData[routerDataKey];
          }
        });
        routerDataCache = routerData;
      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache
      });
    };
  }
  // () => Component
  return dynamic({
    app,
    models: () => models.filter((model) => modelNotExisted(app, model)).map((m) => import(`../modules/${m}.js`)),
    // add routerData prop
    component: () => {
      if (!routerDataCache) {
        const routerData = getRouterData(app);
        Object.keys(routerData).forEach((routerDataKey) => {
          if (routerDataKey.startsWith('/unused')) {
            delete routerData[routerDataKey];
          }
        });
        routerDataCache = routerData;
      }
      let p;
      if (isQuoteComp) {
        p = component().default || component();
      } else {
        const comp = (async () => {
          const tempComp = await component();
          return tempComp;
        })();
        p = comp.default || comp;
      }
      return (props) =>
        createElement(p, {
          ...props,
          routerData: routerDataCache
        });
    }
  });
};

export const getRouterData = (app) => {
  const routerData = {
    '/': {
      component: dynamicWrapper(app, [], () => Layout)
    },
    '/chart/analysis': {
      component: dynamicWrapper(app, ['chart/analysis/models/analysis'], () => Analysis)
    },
    '/chart/monitor': {
      component: dynamicWrapper(app, ['chart/monitor/models/monitor'], () => Monitor)
    },
    '/example/student': {
      component: dynamicWrapper(app, ['student/models/student'], () => StudentPage)
    },
    '/example/headline': {
      component: dynamicWrapper(app, ['headline/models/headline'], () => HeadlinePage)
    },
    '/form/basic-form': {
      component: dynamicWrapper(app, ['forms/basic-form/models/basicForm'], () => BasicForm)
    },
    '/form/dict-form': {
      component: dynamicWrapper(app, ['forms/dict-form/models/dictForm'], () => DictForm)
    },
    '/form/step-form': {
      component: dynamicWrapper(app, ['forms/step-form/models/stepForm'], () => StepForm)
    },
    '/form/step-form/info': {
      name: '分步表单（填写转账信息）',
      component: dynamicWrapper(app, ['forms/step-form/models/stepForm'], () => Step1)
    },
    '/form/step-form/confirm': {
      name: '分步表单（确认转账信息）',
      component: dynamicWrapper(app, ['forms/step-form/models/stepForm'], () => Step2)
    },
    '/form/step-form/result': {
      name: '分步表单（完成）',
      component: dynamicWrapper(app, ['forms/step-form/models/stepForm'], () => Step3)
    },
    '/form/advanced-form': {
      component: dynamicWrapper(app, ['forms/advanced-form/models/advancedForm'], () => AdvancedForm)
    },
    '/list/table-list': {
      component: dynamicWrapper(app, ['list/table-list/models/tableList'], () => TableList)
    },
    '/list/basic-list': {
      component: dynamicWrapper(app, ['list/basic-list/models/basicList'], () => BasicList)
    },
    '/list/card-list': {
      component: dynamicWrapper(app, ['list/basic-list/models/basicList'], () => CardList)
    },
    '/list/search/articles': {
      component: dynamicWrapper(app, ['list/basic-list/models/basicList'], () => SearchList)
    },
    '/list/search/projects': {
      component: dynamicWrapper(app, ['list/basic-list/models/basicList'], () => CoverCardList)
    },
    '/list/search/applications': {
      component: dynamicWrapper(app, ['list/basic-list/models/basicList'], () => FilterCardList)
    },
    '/profile/basic': {
      component: dynamicWrapper(app, ['profile/models/profile'], () => BasicProfile)
    },
    '/profile/advanced': {
      component: dynamicWrapper(app, ['profile/models/profile'], () => AdvancedProfile)
    },
    '/result/success': {
      component: dynamicWrapper(app, [], () => Success)
    },
    '/component/button': {
      component: dynamicWrapper(app, [], () => ButtonDemo)
    },
    '/component/table': {
      component: dynamicWrapper(app, [], () => TableDemo)
    },
    '/result/fail': {
      component: dynamicWrapper(app, [], () => Error)
    },
    '/unused/UnauthorizedLayout': {
      component: dynamicWrapper(app, ['login/models/login'], () => UnauthorizedLayout)
    },
    '/unused/UnauthorizedRightLayout': {
      component: dynamicWrapper(app, ['login/models/login'], () => UnauthorizedRightLayout)
    },
    '/unused/SiderLayout': {
      component: dynamicWrapper(app, ['login/models/login'], () => SiderLayout)
    },
    '/unused/HeaderLayout': {
      component: dynamicWrapper(app, ['login/models/login'], () => HeaderLayout)
    },
    '/unused/HeaderSiderLayout': {
      component: dynamicWrapper(app, ['login/models/login'], () => HeaderSiderLayout)
    },
    '/home': {
      component: dynamicWrapper(app, [], () => HomePage)
    },
    '/setting': {
      component: dynamicWrapper(app, [], () => Setting)
    },
    '/management/personalSetting': {
      component: dynamicWrapper(app, ['management/personal-setting/models/personalSetting'], () => PersonalSetting)
    },
    '/demo/fullpagecalendar': {
      component: dynamicWrapper(app, [], () => FullPageCalendarDemo)
    },
    '/exception/401': {
      component: dynamicWrapper(app, [], () => Exception401)
    },
    '/exception/403': {
      component: dynamicWrapper(app, [], () => Exception403)
    },
    '/exception/404': {
      component: dynamicWrapper(app, [], () => Exception404)
    },
    '/exception/500': {
      component: dynamicWrapper(app, [], () => Exception500)
    },
    '/exception/trigger': {
      component: dynamicWrapper(app, ['exception/models/exception'], () => TriggerException)
    },
    '/user/login': {
      component: dynamicWrapper(app, ['login/models/login'], () => Login)
    },
    '/user/register': {
      component: dynamicWrapper(app, ['login/models/login'], () => Register)
    }
  };
  // Get name from ./menu.js or just set it in the router data.
  const routerDataWithName = {};
  Object.keys(routerData).forEach((item) => {
    routerDataWithName[item] = {
      ...routerData[item],
      name: routerData[item].name
    };
  });
  return routerDataWithName;
};
