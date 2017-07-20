import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import {
  ListItem,
  ListItemSecondaryAction,
  ListItemAvatar,
  ListItemText,
} from 'material-ui/List';

import EditUser from './EditUser';
import defaultProfileImg from '../assets/images/default-profile.png';

class UserListItem extends Component {
  state = {
    open: false
  };
  handleDialogToggle = () => {
    this.setState({
      open: !this.state.open
    });
  };
  render() {
    const user = this.props.user;
    const eId = user.eId.toString().replace(/(.{3})/g, '$1 ');
    const username = (user.last_name == null || user.first_name == null) ?
      'Data will be updated on login' :
      user.last_name + ', ' + user.first_name;
    const userSubheader = user.eName == null ? eId : eId + ' • ' + user.eName;
    return (
      <div>
        <EditUser
          user={user}
          open={this.state.open}
          handleDialogToggle={this.handleDialogToggle}
          updateUsers={this.props.updateUsers}
          />
        <ListItem button onClick={this.handleDialogToggle}>
          <ListItemAvatar>
            <Avatar
              alt={user.first_name + ' ' + user.last_name + '\'s profile image'}
              src={defaultProfileImg}
              />
          </ListItemAvatar>
          <ListItemText
            primary={username}
            secondary={userSubheader}
            />
          <ListItemSecondaryAction>
            <IconButton aria-label='Edit' onClick={this.handleDialogToggle}>
              <Icon>edit</Icon>
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </div>
    );
  }
}

UserListItem.propTypes = {
  user: PropTypes.object.isRequired,
  updateUsers: PropTypes.func.isRequired,
};

export default UserListItem;
