import dva from 'dva';
import createLoading from 'dva-loading';
import Bottle from 'bottlejs';
import { registerApp } from './util/appHelper';

const bottle = new Bottle();
window.bottle = bottle;

// 1. Initialize
const app = dva();
registerApp(app);

// 2. Plugins
app.use(createLoading({ effects: true }));

// 3. Model
// app.model(require('./model/home').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#app');
