import React from 'react';
import { Router, Route } from 'dva/router';
import Editor from './routes/Editor';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={Editor} />
    </Router>
  );
}

export default RouterConfig;
