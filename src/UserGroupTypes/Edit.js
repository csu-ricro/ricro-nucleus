import React from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ModifyAlert from './Modify';

const EditUserGroupType = props => {
  const { match } = props;
  return (
    <React.Fragment>
      <Typography variant="display2">Edit User Group Type</Typography>
      <Divider />
      <ModifyAlert userGroupTypeId={match.params.userGroupTypeId} />
    </React.Fragment>
  );
};

EditUserGroupType.propTypes = {
  match: PropTypes.object.isRequired, // react-router
};

export default EditUserGroupType;
