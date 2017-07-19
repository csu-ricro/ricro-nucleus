import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  createStyleSheet
} from 'material-ui/styles';
import Snackbar from 'material-ui/Snackbar';

const styleSheet = createStyleSheet('CsuSnackbar', theme => ({
  success: {
    '&>div': {
      backgroundColor: '#4caf50',
    },
  },
  error: {
    '&>div': {
      backgroundColor: theme.palette.error.A700,
    },
  },
  default: {
    '&>div': {},
  },
}));

class CsuSnackbar extends Component {
  render() {
    const classes = this.props.classes;
    return (
      <Snackbar
        classes={{root: classes[this.props.className ? this.props.className : 'default']}}
        open={this.props.open}
        autoHideDuration={this.props.autoHideDuration ? this.props.autoHideDuration : 6e3}
        onRequestClose={this.props.onRequestClose}
        SnackbarContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id='message-id'>{this.props.message}</span>}
        {...this.props.snackbarProps}
        />
    );
  }
}

CsuSnackbar.propTypes = {
  onRequestClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  className: PropTypes.oneOf(['default', 'error', 'success']),
  autoHideDuration: PropTypes.number,
  snackbarProps: PropTypes.object,
};

export default withStyles(styleSheet)(CsuSnackbar);
