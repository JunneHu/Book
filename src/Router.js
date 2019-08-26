import React from 'react';
import PropTypes from 'prop-types';
import {
  Switch,
  Route,
  routerRedux,
} from 'dva/router';
import dynamic from 'dva/dynamic';

const { ConnectedRouter } = routerRedux;

const RouterWrapper = ({ history, app }) => {
  const Home = dynamic({
    app,
    component: () => import('./components/Home'),
  });
  const List = dynamic({
    app,
    component: () => import('./components/List'),
  });
  const Search = dynamic({
    app,
    component: () => import('./components/Search'),
  });
  const My = dynamic({
    app,
    component: () => import('./components/My'),
  });
  const Book = dynamic({
    app,
    component: () => import('./components/Book'),
  });
  const Detail = dynamic({
    app,
    component: () => import('./components/Detail'),
  });
  const Chapter = dynamic({
    app,
    component: () => import('./components/Chapter'),
  });
  const LoginModal = dynamic({
    app,
    component: () => import('./components/LoginModal'),
  });
  const PageForbidden = dynamic({
    app,
    component: () => import('./components/PageForbidden'),
  });

  const PageServerError = dynamic({
    app,
    component: () => import('./components/PageServerError'),
  });

  const PageNetworkError = dynamic({
    app,
    component: () => import('./components/PageNetworkError'),
  });

  const PageNotFound = dynamic({
    app,
    component: () => import('./components/PageNotFound'),
  });
  const MyBook = dynamic({
    app,
    component: () => import('./components/MyBook'),
  });
  const ShopList = dynamic({
    app,
    component: () => import('./components/ShopList'),
  });
  const MusicInfo = dynamic({
    app,
    component: () => import('./components/MusicInfo'),
  });
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/list" component={List} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/my" component={My} />
        <Route exact path="/login" component={LoginModal} />
        <Route exact path="/book" component={Book} />
        <Route exact path="/detail" component={Detail} />
        <Route exact path="/chapter" component={Chapter} />
        <Route exact path="/mybook" component={MyBook} />
        <Route exact path="/shop" component={ShopList} />
        <Route exact path="/musicInfo" component={MusicInfo} />
        {/* 403 */}
        <Route exact path="/403" component={PageForbidden} />
        {/* 500 */}
        <Route exact path="/500" component={PageServerError} />
        {/* 网络错误 */}
        <Route exact path="/error" component={PageNetworkError} />
        {/* 404 */}
        <Route component={PageNotFound} />
      </Switch>
    </ConnectedRouter>
  );
};

RouterWrapper.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
};

RouterWrapper.defaultProps = {};

export default RouterWrapper;
