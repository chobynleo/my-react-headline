import 'es6-promise';
import 'fetch-ie8';

import '@babel/polyfill';
import dva from 'dva';
import createHistory from 'history/createHashHistory';
import 'moment/locale/zh-cn';
import { SGLoading, io } from 'SinoGear';
import { Message } from './components/Message/Message';
import { config } from './common/config';
import { tips, store, theme } from './utils/func';

import './index.less';
import './sgfont.less';

// 1. Initialize
const app = dva({
  history: createHistory(),
  onError(error) {
    const tipsError = tips.getErrorMsg(error);
    if (tipsError !== 'sg_error_401') {
      Message.msg({ type: 'error', content: tipsError });
    }
  }
});

// 2. Plugins
app.use(SGLoading.createLoading({ effects: true }));

// 3. Register global model
app.model(require('./modules/layouts/models/global').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');

io.register(config.requestConfig);

const themeName = store.getItem('theme', true);
if (theme) {
  theme.changeTheme(themeName);
}
