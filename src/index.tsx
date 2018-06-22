import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Layout from './common/Layout/Layout';
import Login from './components/Login/Login';
import ModuleA from './components/ModuleA/ModuleA';
import ModuleB from './components/ModuleB/ModuleB';
import './index.scss';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Router>
        <div>
            <Route exact={true} path="/" component={Login} />
            <Route exact={true} path="/admin" component={Layout} />
            <Route exact={true} path="/admin/module-a" component={ModuleA} />
            <Route exact={true} path="/admin/module-b" component={ModuleB} />
        </div>
    </Router>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
