import React from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import AlertsShowCase from './Alerts';
import UserGroupTypesShowCase from './UserGroupTypes';
import UsersShowCase from './Users';

const Dashboard = () => {
  return (
    <React.Fragment>
      <div className="row justify-content-center">
        <div className="col-lg-4">
          <UsersShowCase />
        </div>
        <div className="col-lg-4">
          <AlertsShowCase />
        </div>
      </div>
      <Typography variant="display2">Types</Typography>
      <Divider />
      <div className="row">
        <div className="col-lg-4">
          <UserGroupTypesShowCase />
        </div>
        <div className="col-lg-4" />
        <div className="col-lg-4" />
      </div>
    </React.Fragment>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
