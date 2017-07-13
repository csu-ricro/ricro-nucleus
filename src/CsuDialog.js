import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  createStyleSheet
} from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const styleSheet = createStyleSheet('PermRequest', theme => ({
  dialogTitleRoot: {
    padding: '0 0 20px 0',
  },
  dialogRoot: {
    width: '95%',
  },
  flex: {
    flex: 1,
  },
}));

class CsuDialog extends Component {
  render() {
    const classes = this.props.classes;
    return (
      <Dialog
        classes={{paper: classes.dialogRoot}}
        open={this.props.open}
        onRequestClose={this.props.onRequestClose}
        maxWidth='md'
        >
        <DialogTitle
          classes={{
            root: classes.dialogTitleRoot
          }}
          disableTypography
          >
          <AppBar position='static'>
            <Toolbar>
              <Typography color='inherit' type='title'>
                {this.props.title}
              </Typography>
              <div className={classes.flex}/>
              <IconButton
                onClick={this.props.onRequestClose}
                color='inherit'
                aria-label='Close'
                >
                <Icon>close</Icon>
              </IconButton>
            </Toolbar>
          </AppBar>
        </DialogTitle>
        <DialogContent>{this.props.children}</DialogContent>
        {
          this.props.dialogActions != null
            ? <DialogActions>{this.props.dialogActions}</DialogActions>
            : null
        }
      </Dialog>
    );
  }
}

CsuDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

export default withStyles(styleSheet)(CsuDialog);
