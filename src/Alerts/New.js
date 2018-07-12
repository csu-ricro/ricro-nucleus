import React from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ModifyAlert from './Modify';

const NewAlert = () => {
  return (
    <React.Fragment>
      <Typography variant="display2">New Alert</Typography>
      <Divider />
      <ModifyAlert />
    </React.Fragment>
  );
};

export default NewAlert;
