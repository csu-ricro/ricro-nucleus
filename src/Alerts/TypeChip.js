import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
  danger: {
    backgroundColor: theme.palette.alerts.danger,
    color: theme.palette.common.white,
  },
  info: {
    backgroundColor: theme.palette.alerts.info,
    color: theme.palette.common.white,
  },
  success: {
    backgroundColor: theme.palette.alerts.success,
    color: theme.palette.common.white,
  },
  warning: {
    backgroundColor: theme.palette.alerts.warning,
    color: theme.palette.common.black,
  },
});

const TypeChip = props => {
  const { classes, type } = props;
  return <Chip label={type} className={classes[type]} />;
};

TypeChip.propTypes = {
  classes: PropTypes.object.isRequired, // MUI withStyles
  type: PropTypes.string.isRequired,
};

export default withStyles(styles)(TypeChip);
