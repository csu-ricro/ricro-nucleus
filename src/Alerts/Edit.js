import React from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ModifyAlert from './Modify';

const EditAlert = props => {
  const { match } = props;
  return (
    <React.Fragment>
      <Typography variant="display2">Edit Alert</Typography>
      <Divider />
      <ModifyAlert alertId={match.params.alertId} />
    </React.Fragment>
  );
};

EditAlert.propTypes = {
  match: PropTypes.object.isRequired, // react-router
};

export default EditAlert;
