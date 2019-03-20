import MdiAccount from 'mdi-material-ui/Account';
import MdiAccountGroup from 'mdi-material-ui/AccountGroup';
import MdiViewDashboard from 'mdi-material-ui/ViewDashboard';
import React from 'react';

export default {
  app: {
    name: 'Nucleus',
    hasAutoLogin: true,
    nav: [
      [{ name: 'Dashboard', icon: <MdiViewDashboard />, link: '/' }],
      [{ name: 'Users', icon: <MdiAccount />, link: '/users' }],
      [{ name: 'User Group Types', icon: <MdiAccountGroup />, link: '/user-group-types' }],
    ],
  },
};
