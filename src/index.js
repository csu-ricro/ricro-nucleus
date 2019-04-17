import AppFrame, { createConfig } from 'colostate-ricro-ui';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import config from './assets/config';
import PageDashboard from './pages/Dashboard';
import PageUserGroupTypes from './pages/UserGroupTypes';
import PageEditUserGroupType from './pages/UserGroupTypes/Edit';
import PageUsers from './pages/Users';
import PageAddUser from './pages/Users/Add';
import PageEditUser from './pages/Users/Edit';
import * as serviceWorker from './serviceWorker';

const routes = [
  { component: PageDashboard, path: '/' },
  { component: PageUsers, path: '/users' },
  { component: PageEditUser, path: '/users/edit/:csuId' },
  { component: PageAddUser, path: '/users/add' },
  { component: PageUserGroupTypes, path: '/user-group-types' },
  { component: PageEditUserGroupType, path: '/user-group-types/edit/:id' },
];

ReactDOM.render(
  <AppFrame config={createConfig(config)}>
    {routes.map(route => (
      <Route component={route.component} exact key={route.path} path={route.path} />
    ))}
  </AppFrame>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
