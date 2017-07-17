import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  createStyleSheet
} from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import List from 'material-ui/List';

import CsuDialog from '../CsuDialog';
import UserGroupListItem from '../DatabaseTypes/UserGroupListItem';
import defaultProfileImg from '../assets/images/default-profile.png';

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

class EditUser extends Component {
  render() {
    const classes = this.props.classes;
    const user = this.props.user;
    user.userGroups = user.userGroups ? user.userGroups : [];
    const dialogActions = (
      <div>
        <Button raised color='primary' className='text-center'>add group</Button>
        <Button color='accent'>clear groups</Button>
      </div>
    );
    const deleteGroup = (
      <IconButton aria-label='Delete group'>
        <Icon>delete</Icon>
      </IconButton>
    );
    return (
      <CsuDialog
        open={this.props.open}
        onRequestClose={this.props.handleDialogToggle}
        dialogActions={dialogActions}
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
              id='first-name'
              label='First Name'
              defaultValue={user.first_name}
              className={classes.input}
              marginForm
              fullWidth
              />
          </div>
          <div className='col-md-6'>
            <TextField
              id='last-name'
              label='Last Name'
              defaultValue={user.last_name}
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
              helperText='Updated automaticly on login'
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
        <List>
          <Divider/>
          {user.userGroups.map((group)=>
            <UserGroupListItem
              key={group.user_group_type_id}
              group={group}
              listItemSecondaryAction={deleteGroup}
              />
          )}
        </List>
      </CsuDialog>
    );
  }
}

EditUser.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleDialogToggle: PropTypes.func.isRequired,
};

export default withStyles(styleSheet)(EditUser);
