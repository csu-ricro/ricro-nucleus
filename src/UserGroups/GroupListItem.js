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
    console.log('fired');
    this.setState({
      open: !this.state.open
    });
  };
  render() {
    const classes = this.props.classes;
    const group = this.props.group;
    return (
      <ListItem button onClick={this.handleDialogToggle}>
        <Dialog
          classes={{paper: classes.dialog}}
          open={this.state.open}
          onRequestClose={this.handleDialogToggle}
          >
          <DialogTitle>{group.alias}</DialogTitle>
          <DialogContent>
            <DialogContentText>{group.description}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogToggle}>close</Button>
          </DialogActions>
        </Dialog>
        <ListItemText primary={group.alias} secondary={group.name} />
        {this.props.listItemSecondaryAction ?
          <ListItemSecondaryAction>
            {this.props.listItemSecondaryAction}
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
  listItemSecondaryAction: PropTypes.node,
};

export default withStyles(styleSheet)(GroupListItem);
