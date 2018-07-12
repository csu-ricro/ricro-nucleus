import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import App from 'colostate-ricro-ui';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import registerServiceWorker from './registerServiceWorker';
import config from './config.json';
import SideNav from './SideNav';
import Dashboard from './Dashboard';
import UserGroupTypes from './UserGroupTypes';
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
  <Route key="groups" path="/type/user-groups" exact component={UserGroupTypes} />,
  <Route key="users" path="/users" exact component={Users} />,
  <Route key="alerts" path="/alerts" exact component={Alerts} />,
];

const reduxMiddleware =
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

ReactDOM.render(
  <MuiPickersUtilsProvider utils={MomentUtils}>
    <App config={config} routes={routes} SideNav={SideNav} reduxMiddleware={reduxMiddleware} />
  </MuiPickersUtilsProvider>,
  document.getElementById('root'),
);

registerServiceWorker();
