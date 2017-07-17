import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  createStyleSheet
} from 'material-ui/styles';
import Button from 'material-ui/Button';
import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';
import Dialog, {
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions
} from 'material-ui/Dialog';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';

import EditFileGroup from './EditFileGroup';

const styleSheet = createStyleSheet('GroupListItem', theme => ({
  dialog: {
    minWidth: '250px',
  },
}));

class GroupListItem extends Component {
  state = {
    open: false
  };
  handleDialogToggle = () => {
    this.setState({
      open: !this.state.open
    });
  };
  render() {
    const classes = this.props.classes;
    const group = this.props.group;
    return (
      <ListItem button onClick={this.handleDialogToggle}>
        {this.props.edit ?
          (<EditFileGroup
            group={group}
            open={this.state.open}
            handleDialogToggle={this.handleDialogToggle}
            />)
          :
        (<Dialog
          classes={{paper: classes.dialog}}
          open={this.state.open}
          onRequestClose={this.handleDialogToggle}
          >
          <DialogTitle>{group.file_group_type.alias}</DialogTitle>
          <DialogContent>
            <DialogContentText>{group.file_group_type.description}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogToggle}>close</Button>
          </DialogActions>
        </Dialog>)
      }
        <ListItemText primary={group.file_group_type.alias} secondary={group.file_group_type.name} />
        {this.props.listItemSecondaryAction ?
          <ListItemSecondaryAction>
            {this.props.listItemSecondaryAction}
          </ListItemSecondaryAction>
          : null
        }
        {this.props.edit ?
          <ListItemSecondaryAction>
            <IconButton aria-label='Edit' onClick={this.handleDialogToggle}>
              <Icon>edit</Icon>
            </IconButton>
          </ListItemSecondaryAction>
          : null
        }
      </ListItem>
    );
  }
}

GroupListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
  edit: PropTypes.bool,
  listItemSecondaryAction: PropTypes.node,
};

export default withStyles(styleSheet)(GroupListItem);
