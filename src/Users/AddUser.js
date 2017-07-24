import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import CsuDialog from '../csu-app-template/CsuDialog';
import CsuSnackbar from '../csu-app-template/CsuSnackbar';
import apiCall from '../utils/apiCall';

let inputTimeout = null;

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

  addUser = (updateUsers) => {
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
        updateUsers();
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
    return (
      <CsuDialog
        open={this.props.open}
        onRequestClose={this.props.handleDialogToggle}
        dialogActions={
          <Button
            raised
            onClick={this.addUser.bind(this, this.props.updateUsers)}
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
        <CsuSnackbar
          className={this.state.snackbar.className}
          open={this.state.snackbar.open}
          onRequestClose={this.handleSnackbarClose}
          message={this.state.snackbar.message}
          />
      </CsuDialog>
    );
  }
}

AddUser.propTypes = {
  handleDialogToggle: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  updateUsers: PropTypes.func.isRequired,
};

export default AddUser;
