import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

const styles = () => ({
  flex: {
    flex: 1,
  },
  toolbarRoot: {
    flexGrow: 1,
  },
});

const groups = [
  {
    name: 'dev',
    alias: 'Dev',
    description: 'Developer of the ricro-apps. Has access to all applicaitons.',
  },
  {
    name: 'admin',
    alias: 'Administrator',
    description:
      'Administrator of the ricro-apps. Has access to Nucleus and is able to manage users.',
  },
];

class EditUser extends React.Component {
  state = {
    open: false,
  };

  handleUpdateState = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleToggleOpen = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  handleSelectGroup = event => {
    console.log(event.currentTarget.getAttribute('data-id'));
    this.handleToggleOpen();
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;
    return (
      <React.Fragment>
        <Toolbar className={classes.toolbarRoot} disableGutters>
          <Typography variant="title" className={classes.flex}>
            User Groups
          </Typography>
          <Tooltip title="Add Group">
            <IconButton color="default" onClick={this.handleToggleOpen} data-id="open">
              <Icon>add</Icon>
            </IconButton>
          </Tooltip>
        </Toolbar>
        <Dialog open={open} onClose={this.handleToggleOpen} aria-labelledby="add-group-dialog">
          <DialogTitle id="add-group-dialog">Add Group</DialogTitle>
          <div>
            <List>
              {groups.map(group => (
                <ListItem
                  key={group.name}
                  data-id={group.name}
                  onClick={this.handleSelectGroup}
                  button
                  divider
                >
                  <ListItemText primary={group.alias} secondary={group.description} />
                </ListItem>
              ))}
            </List>
          </div>
        </Dialog>
      </React.Fragment>
    );
  }
}

EditUser.propTypes = {
  classes: PropTypes.object.isRequired, // MUI withStyles
  match: PropTypes.object.isRequired, // react-router
};

export default withStyles(styles)(EditUser);
