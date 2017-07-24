import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import {
  withStyles,
  createStyleSheet
} from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';

import CsuDialog from '../csu-app-template/CsuDialog';
import CsuSnackbar from '../csu-app-template/CsuSnackbar';
import ManageGroups from './ManageGroups';
import defaultProfileImg from '../csu-app-template/assets/images/default-profile.png';
import apiCall from '../utils/apiCall';

const styleSheet = createStyleSheet('EditUser', theme => ({
  avatar: {
    backgroundColor: theme.palette.primary[500],
  },
  profileImg: {
    margin: '0 auto 25px auto',
    height: 200,
    width: 200,
    borderRadius: '100px',
    backgroundColor: 'grey',
  },
}));

let inputTimeout = null;

class EditUser extends Component {
  state = {
    snackbar: {
      open: false,
      message: 'notification',
      className: 'default',
    },
  }

  handleSnackbarClose = () => {
    this.setState({
      snackbar: {
        ...this.state.snackbar,
        open: false,
      },
    });
  }

  editUser = (user, updateUsers, event) => {
    let target = event.target;
    clearTimeout(inputTimeout);
    inputTimeout = setTimeout(() => {
      if (user[target.id] !== target.value) {
        $.when(apiCall('/user/update/', {
          data: {
            eId: user.eId,
            [target.id]: target.value,
          },
          method: 'PUT',
        })).done((data) => {
          let message = 'An error occured. Please try again.';
          let className = 'error';
          if (data.status === 'success') {
            message = 'User successfully updated';
            className = 'success';
            updateUsers();
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
    }, 500, target, user, updateUsers);
  }

  render() {
    const classes = this.props.classes;
    const user = this.props.user;
    user.userGroups = user.userGroups ? user.userGroups : [];
    return (
      <CsuDialog
        open={this.props.open}
        onRequestClose={this.props.handleDialogToggle}
        title='Edit User Account'
        >
        <div className='row'>
          <Avatar
            alt={user.first_name + ' ' + user.last_name + '\'s profile image'}
            src={defaultProfileImg}
            className={classes.profileImg}
            />
        </div>
        <Divider/>
        <div className='row'>
          <div className='col-md-6'>
            <TextField
              id='first_name'
              label='First Name'
              defaultValue={user.first_name}
              className={classes.input}
              onChange={this.editUser.bind(this, user, this.props.updateUsers)}
              marginForm
              fullWidth
              />
          </div>
          <div className='col-md-6'>
            <TextField
              id='last_name'
              label='Last Name'
              defaultValue={user.last_name}
              onChange={this.editUser.bind(this, user, this.props.updateUsers)}
              className={classes.input}
              marginForm
              fullWidth
              />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            <TextField
              label='eName'
              defaultValue={user.eName}
              helperText='Updated automaticly on login'
              marginForm
              fullWidth
              disabled
              />
          </div>
          <div className='col-md-6'>
            <TextField
              label='eID'
              defaultValue={user.eId.toString()}
              marginForm
              fullWidth
              disabled
              />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            <TextField
              label='Email'
              defaultValue={user.email}
              helperText='Updated automaticly on login'
              marginForm
              fullWidth
              disabled
              />
          </div>
          <div className='col-md-6'>
            <TextField
              label='Last Active'
              defaultValue={user.last_active}
              helperText='Updated automaticly on login'
              marginForm
              fullWidth
              disabled
              />
          </div>
        </div>
        <Divider/>
        <ManageGroups
          user={user}
          updateUsers={this.props.updateUsers}
          />
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

EditUser.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleDialogToggle: PropTypes.func.isRequired,
  updateUsers: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default withStyles(styleSheet)(EditUser);
