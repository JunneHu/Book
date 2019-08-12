import 'babel-polyfill';
import dva from 'dva';
import createLoading from 'dva-loading';
import createHistory from 'history/createBrowserHistory';
// import createHistory from 'history/createHashHistory';
import { Toast } from 'antd-mobile';
import './asset/common.less';

import { default as home } from './models/home';
import { default as login } from './models/login';
import { default as book } from './models/book';

// =======================
// 1. Initialize
// =======================
const app = dva({
  history: createHistory(),
  onError(e) {
    // Toast.info(e);
  },
});

// =======================
// 2. Plugins
// =======================
app.use(createLoading());

// =======================
// 3. Model
// =======================
// Moved to router.js
app.model(home);
app.model(login);
app.model(book);

// =======================
// 4. Router
// =======================
app.router(require('./Router'));

// =======================
// 5. Start
// =======================
app.start('#app');
