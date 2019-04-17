import AppFrame from 'colostate-ricro-ui';
import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './index';

test('renders without props', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <AppFrame>
      <Dashboard />
    </AppFrame>,
    div,
  );
});
