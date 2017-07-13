import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  createStyleSheet
} from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import {
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import {
  DialogContentText,
} from 'material-ui/Dialog';

import CsuDialog from '../CsuDialog';
import defaultProfileImg from '../assets/images/default-profile.png';

const styleSheet = createStyleSheet('PermRequest', theme => ({
  avatar: {
    backgroundColor: theme.palette.primary[500],
  },
}));

class PermRequest extends Component {
  state = {
    open: false
  };
  handleDialogToggle = () => {
    this.setState({
      open: !this.state.open
    });
  };
  render() {
    // const classes = this.props.classes;
    const dialogActions = (
      <div>
        <Button raised color='primary'>approve</Button>
        <Button>reject</Button>
      </div>
    );
    return (
      <div>
        <CsuDialog
          open={this.state.open}
          onRequestClose={this.handleDialogToggle}
          dialogActions={dialogActions}
          title='Edit Permission Request'
          >
          <DialogContentText>
            test
          </DialogContentText>
        </CsuDialog>
        <ListItem
          onClick={this.handleDialogToggle}
          button
          >
          <ListItemAvatar>
            <Avatar
              alt={'<NAME>\'s profile image'}
              src={defaultProfileImg}
              />
          </ListItemAvatar>
          <ListItemText
            primary={'User\'s Name'}
            secondary='September 15th, 2016'
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

PermRequest.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(PermRequest);
