import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Icon from '@material-ui/core/Icon';

const deleteButton = theme => ({
  color: theme.palette.getContrastText(theme.palette.alerts.danger),
  backgroundColor: theme.palette.alerts.danger,
  '&:hover': {
    backgroundColor: 'red',
  },
});

const styles = theme => ({
  deleteButton: {
    marginTop: theme.spacing.unit * 3,
    ...deleteButton(theme),
  },
  confirmButton: {
    ...deleteButton(theme),
  },

  iconLeft: {
    marginRight: theme.spacing.unit,
  },
});

class DeleteUser extends React.Component {
  state = {
    isConfirmOpen: false,
  };

  handleToggleOpen = event => {
    // debugger //eslint-disable-line
    const key = event.currentTarget.getAttribute('data-statekey');
    this.setState({
      [key]: !this.state[key],
    });
  };

  render() {
    const { classes } = this.props;
    const { isConfirmOpen } = this.state;
    const text =
      "Deleting the user won't remove the user's existing data. All their permissions will be cleared but their core data will be retained. The user will lose access to all non-public apps and their respective permissions will have to be regranted.";
    return (
      <div className="row justify-content-center">
        <div className="col-md-10">
          <Button
            variant="contained"
            fullWidth
            className={classes.deleteButton}
            onClick={this.handleToggleOpen}
            data-statekey="isConfirmOpen"
          >
            <Icon className={classes.iconLeft}>delete</Icon>Delete
          </Button>
          <Dialog
            open={isConfirmOpen}
            onClose={this.handleToggleOpen}
            data-statekey="isConfirmOpen"
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <p>
                  {
                    "Deleting the user won't remove the user's existing data. All their permissions will be cleared but their core data will be retained. The user will lose access to all non-public apps and their respective permissions will have to be regranted."
                  }
                </p>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleToggleOpen} data-statekey="isConfirmOpen" color="primary">
                Cancel
              </Button>
              <Button
                onClick={this.handleToggleOpen}
                data-statekey="isConfirmOpen"
                color="primary"
                variant="contained"
                autoFocus
                className={classes.confirmButton}
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}

DeleteUser.propTypes = {
  classes: PropTypes.object.isRequired, // MUI withStyles
};

export default withStyles(styles)(DeleteUser);
