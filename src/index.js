import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import App from 'colostate-ricro-ui';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import registerServiceWorker from './registerServiceWorker';
import config from './config.json';
import SideNav from './SideNav';
import Dashboard from './Dashboard';
import Groups from './Groups';
import Users from './Users';
import Alerts from './Alerts';
import { version, name as appName, dependencies } from '../package.json';

// eslint-disable-next-line no-console
console.log(
  `${appName}@${version}`,
  `\n\tcolostate-ricro-ui@${dependencies['colostate-ricro-ui']}`,
);

const routes = [
  <Route key="dashboard" path="/" exact component={Dashboard} />,
  <Route key="groups" path="/groups" component={Groups} />,
  <Route key="users" path="/users" component={Users} />,
  <Route key="alerts" path="/alerts" component={Alerts} />,
];

const reduxMiddleware =
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

ReactDOM.render(
  <App config={config} routes={routes} SideNav={SideNav} reduxMiddleware={reduxMiddleware} />,
  document.getElementById('root'),
);

registerServiceWorker();
