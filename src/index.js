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
import EditUserGroupType from './UserGroupTypes/Edit';
import NewUserGroupType from './UserGroupTypes/New';
import Users from './Users';
import EditUser from './Users/Edit';
import Alerts from './Alerts';
import EditAlert from './Alerts/Edit';
import NewAlert from './Alerts/New';
import { version, name as appName, dependencies } from '../package.json';

// eslint-disable-next-line no-console
console.log(
  `${appName}@${version}`,
  `\n\tcolostate-ricro-ui@${dependencies['colostate-ricro-ui']}`,
);

const routes = [
  <Route key="dashboard" path="/" exact component={Dashboard} />,
  <Route key="groups" path="/type/user-groups" exact component={UserGroupTypes} />,
  <Route
    key="editUserGroupTypes"
    path="/type/user-groups/edit/:userGroupTypeId"
    exact
    component={EditUserGroupType}
  />,
  <Route key="addUserGroupTypes" path="/type/user-groups/new" exact component={NewUserGroupType} />,
  <Route key="users" path="/users" exact component={Users} />,
  <Route key="editUsers" path="/users/edit/:csuId" exact component={EditUser} />,
  <Route key="alerts" path="/alerts" exact component={Alerts} />,
  <Route key="editAlerts" path="/alerts/edit/:alertId" exact component={EditAlert} />,
  <Route key="addAlerts" path="/alerts/new" exact component={NewAlert} />,
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
