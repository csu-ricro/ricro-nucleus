import React from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ModifyUserGroupType from './Modify';

const NewUserGroupType = () => {
  return (
    <React.Fragment>
      <Typography variant="display2">New User Group Type</Typography>
      <Divider />
      <ModifyUserGroupType />
    </React.Fragment>
  );
};

export default NewUserGroupType;
