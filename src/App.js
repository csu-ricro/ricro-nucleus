import React, {
  Component
} from 'react';
import {
  withStyles,
  createStyleSheet
} from 'material-ui/styles';

import UsersDashboard from './Users/Dashboard';
import DatabaseTypesDashboard from './DatabaseTypes/Dashboard';
import FileGroupPermissionsDashboard from './FileGroupPermissions/Dashboard';

const styleSheet = createStyleSheet('App', theme => ({
  row: {
    paddingTop: '15px',
    paddingBottom: '15px',
  },
}));

class App extends Component {
  render() {
    const classes = this.props.classes;
    return (
      <main>
        <div className='row'>
          <div className={classes.row + ' col-md-6 col-md-offset-1'}>
            <UsersDashboard />
          </div>
          <div className={classes.row + ' col-md-4'}>
            <FileGroupPermissionsDashboard />
          </div>
        </div>
        <div className='row'>
          <div className={classes.row + ' col-md-10 col-md-offset-1'}>
            <DatabaseTypesDashboard />
          </div>
        </div>
      </main>
    );
  }
}

export default withStyles(styleSheet)(App);
