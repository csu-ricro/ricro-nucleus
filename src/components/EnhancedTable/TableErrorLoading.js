import { withStyles } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import { IconSnackbarContent } from 'colostate-ricro-ui';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import LoadingIndicator from '../LoadingIndicator';

const styles = () => ({
  flexContainer: {
    minHeight: 150,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const EnhancedTableErrorLoading = props => {
  const { classes } = props;
  const { data, isLoading, showLoading } = props.enhancedTable.rootState;
  let { error } = props.enhancedTable.rootState;

  if (_.isEmpty(data.search) && !isLoading && !error) {
    error = { variant: 'info', message: 'No data found' };
  }

  return (
    <React.Fragment>
      <Collapse in={error && !isLoading}>
        <div className={classes.flexContainer}>
          <IconSnackbarContent variant={error.variant} message={error.message} disableAction />
        </div>
      </Collapse>
      <Collapse in={showLoading}>
        <div className={classes.flexContainer}>
          <LoadingIndicator />
        </div>
      </Collapse>
    </React.Fragment>
  );
};

EnhancedTableErrorLoading.propTypes = {
  classes: PropTypes.object.isRequired, // MUI withStyles()
  enhancedTable: PropTypes.shape({
    rootState: PropTypes.shape({
      data: PropTypes.shape({ search: PropTypes.array.isRequired }),
    }),
  }),
};

export default withStyles(styles)(EnhancedTableErrorLoading);
