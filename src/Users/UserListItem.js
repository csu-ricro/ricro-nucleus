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
    return (
      <div>
        <EditUser
          user={user}
          open={this.state.open}
          handleDialogToggle={this.handleDialogToggle}
          />
        <ListItem button onClick={this.handleDialogToggle}>
          <ListItemAvatar>
            <Avatar
              alt={user.first_name + ' ' + user.last_name + '\'s profile image'}
              src={defaultProfileImg}
              />
          </ListItemAvatar>
          <ListItemText
            primary={user.first_name + ' ' + user.last_name}
            secondary={user.eId + ' • ' + user.eName}
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
};

export default UserListItem;
