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
import Icon from 'material-ui/Icon';
import Dialog from 'material-ui/Dialog';

const styleSheet = createStyleSheet('PermissionRequest', theme => ({
  avatar: {
    backgroundColor: theme.palette.primary[500],
  },
}));

class PermissionRequest extends Component {
  render() {
    const classes = this.props.classes;
    return (
      <div>
        <Dialog
          open={this.state.open}
          onRequestClose={this.handleDialogToggle}
          >
          test
        </Dialog>
      <ListItem
        onClick={this.handleDialogToggle}
        button
        >
        <ListItemAvatar>
          <Avatar aria-label="User icon" className={classes.avatar}>
            UN
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={'User\'s Name'}
          secondary='September 15th, 2016'
          />
        <ListItemSecondaryAction>
          <IconButton aria-label='Edit'>
            <Icon>edit</Icon>
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </div>
    );
  }
}

PermissionRequest.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(PermissionRequest);
