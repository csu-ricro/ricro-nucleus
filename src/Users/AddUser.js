import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import {
  withStyles,
  createStyleSheet
} from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';

import CsuDialog from '../CsuDialog';
import apiCall from '../utils/apiCall';

let inputTimeout = null;

const styleSheet = createStyleSheet('AddUser', theme => ({
  success: {
    '&>div': {
      backgroundColor: '#4caf50',
    }
  },
  error: {
    '&>div': {
      backgroundColor: theme.palette.error.A700,
    }
  },
  default: {
    '&>div': {},
  },
}));

class AddUser extends Component {
  state = {
    snackbar: {
      open: false,
      message: 'notification',
      className: 'default',
    },
    eId: {
      value: '',
      status: false,
      helperText: 'Enter the user\'s CSU eID',
      error: false,
    }
  }

  handleSnackbarClose = () => {
    this.setState({
      snackbar: {
        ...this.state.snackbar,
        open: false,
      },
    });
  }

  addUser = () => {
    console.log('adding user');
    $.when(apiCall('/user/create/', {
      data: {
        eId: this.state.eId.value,
      },
      method: 'POST',
    })).done((data) => {
      let message = 'An error occured. Please try again.';
      let className = 'error';
      if (data.status === 'success') {
        message = 'User successfully added';
        className = 'success';
        this.setState({
          eId: {
            ...this.state.eId,
            value: '',
          }
        });
      }
      this.setState({
        snackbar: {
          open: true,
          message,
          className,
        },
      });
      console.log(data);
    });
  }

  validateInput = event => {
    let value = event.target.value;
    this.setState({
      eId: {
        ...this.state.eId,
        value: value,
      },
    });

    clearTimeout(inputTimeout);
    inputTimeout = setTimeout(() => {
      let status = false;
      let helperText = value.length > 0 ? 'Invalid eID' : 'Enter the user\'s CSU eID';
      let error = value.length > 0 ? true : false;
      if (value.match(/^\d{9}$/g)) {
        $.when(apiCall('/user/?eId=' + value)).done((data) => {
          console.log(data);
          if (data.status === 'nodata') {
            status = true;
            helperText = 'Valid and unique eID';
            error = false;
          } else if (data.status === 'success') {
            helperText = 'User already exists';
          } else {
            helperText = 'An error has occured';
          }
          this.setState({
            eId: {
              ...this.state.eId,
              status,
              helperText,
              error,
            },
          });
        });
      } else {
        this.setState({
          eId: {
            ...this.state.eId,
            status,
            helperText,
            error,
          },
        });
      }
    }, 250, value);
  }

  render() {
    const classes = this.props.classes;
    return (
      <CsuDialog
        open={this.props.open}
        onRequestClose={this.props.handleDialogToggle}
        dialogActions={
          <Button
            raised
            onClick={this.addUser}
            disabled={!this.state.eId.status}
            color='primary'
            >
            add
          </Button>
        }
        title='Add a User Account'
        >
        <div className='row'>
          <div className='col-md-8 col-md-offset-2'>
            <TextField
              label='eID'
              helperText={this.state.eId.helperText}
              inputProps={{onChange: this.validateInput}}
              value={this.state.eId.value}
              error={this.state.eId.error}
              marginForm
              fullWidth
              autoFocus
              />
          </div>
        </div>
        <Snackbar
          classes={{root: classes[this.state.snackbar.className]}}
          open={this.state.snackbar.open}
          autoHideDuration={6e3}
          onRequestClose={this.handleSnackbarClose}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id='message-id'>{this.state.snackbar.message}</span>}
          />
      </CsuDialog>
    );
  }
}

AddUser.propTypes = {
  handleDialogToggle: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default withStyles(styleSheet)(AddUser);
