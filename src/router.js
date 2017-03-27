import React from 'react';
import { Router, Route } from 'dva/router';
import Editor from './routes/Editor';
import Presentation from './routes/Presentation';
import Show from './routes/Show';
function RouterConfig({ history }) {
  return (
    <Router history={history}>
    	<Route path="/" component={Presentation} />
      <Route path="/editor" component={Editor} />
      <Route path="/show" component={Show} />
    </Router>
  );
}

export default RouterConfig;
