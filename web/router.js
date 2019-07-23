import React from 'react';
import {
  Router, Redirect, Switch, Route
} from 'dva/router';

import RootView from './page/root-view';
import PageHome from './page/home';
import PageOrder from './page/order';
import PageDoc from './page/doc';
import Page404NotFound from './page/404';

function RouterConfig({ history }) {
  return (
    <Router
      history={history}
    >
      <Switch>
        <Route exact path="/" render={() => (<Redirect to="/home" />)} />
        <Route path="/home" render={() => (<RootView path="/home" Component={PageHome} />)} />
        <Route path="/order" render={() => (<RootView path="/order" Component={PageOrder} />)} />
        <Route path="/doc" component={PageDoc} />
        <Route render={() => (<RootView path="/404" Component={Page404NotFound} />)} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
