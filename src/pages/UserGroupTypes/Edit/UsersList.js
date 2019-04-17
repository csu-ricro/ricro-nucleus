import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Portal from '@material-ui/core/Portal';
import Snackbar from '@material-ui/core/Snackbar';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { defaultProfileSvg, IconSnackbarContent } from 'colostate-ricro-ui';
import _ from 'lodash';
import MdiClose from 'mdi-material-ui/Close';
import MdiDelete from 'mdi-material-ui/Delete';
import MdiPlus from 'mdi-material-ui/Plus';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

const styles = theme => ({
  addUserButtonContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  gridContainer: {
    '&>div': {
      padding: theme.spacing.unit * 2,
    },
  },
  noUsers: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  usersAppBar: {
    position: 'relative',
    zIndex: '1',
  },
  usersToolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  usersContainer: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
});

class UsersList extends React.Component {
  state = {
    textFieldValues: {
      csuId: '',
    },
    isAdding: false,
    isAddUserOpen: false,
    isDeleting: false,
    snackbar: {
      open: false,
      variant: 'default',
      message: '',
    },
  };

  handleCloseSnackbar = () => {
    this.setState(state => ({ snackbar: { ...state.snackbar, isOpen: false } }));
  };

  handleToggleAddUserOpen = () => {
    this.setState(state => ({ isAddUserOpen: !state.isAddUserOpen }));
  };

  handleTextFieldChange = name => event => {
    const value = event.target.value;
    this.setState(state => ({
      textFieldValues: {
        ...state.textFieldValues,
        [name]: value,
      },
    }));
  };

  handleAddUser = () => {
    const { id: groupId } = this.props.groupType;
    this.setState({ isAdding: true });
    this.props.api.axios
      .get('/nucleus/groups/add-user/', {
        params: {
          csuId: this.state.textFieldValues.csuId,
          groupId,
        },
      })
      .then(() => {
        this.props.updateGroupType(true);
        this.setState({
          snackbar: {
            isOpen: true,
            variant: 'success',
            message: 'User added',
          },
          isAdding: false,
        });
      })
      .catch(err => {
        let message = _.get(err, 'response.data.result', 'Failed to add user');
        if (_.get(err, 'response.data.result')) {
          message = err.response.data.result.includes('Invalid values for: csuId.')
            ? 'User does not exist. Add new users first.'
            : err.response.data.result;
        }
        this.setState({
          snackbar: {
            isOpen: true,
            variant: 'error',
            message,
          },
          isAdding: false,
        });
      });
  };

  handleRemoveUser = csuId => () => {
    const { id: groupId } = this.props.groupType;
    this.setState({ isDeleting: true });
    this.props.api.axios
      .get('/nucleus/groups/remove-user/', { params: { csuId, groupId } })
      .then(() => {
        this.props.updateGroupType(true);
        this.setState({
          snackbar: {
            isOpen: true,
            variant: 'success',
            message: 'User removed',
          },
          isDeleting: false,
        });
      })
      .catch(err => {
        this.setState({
          snackbar: {
            isOpen: true,
            variant: 'error',
            message: _.get(err, 'response.data.result', 'Failed to remove user'),
          },
          isDeleting: false,
        });
      });
  };

  createAppBar = () => {
    const { classes } = this.props;
    const { isAdding, isAddUserOpen, textFieldValues } = this.state;
    return (
      <AppBar className={classes.usersAppBar} position="static" color="default" component="div">
        <Toolbar className={classes.usersToolbar}>
          <Typography variant="h6" color="inherit">
            Users
          </Typography>
          <Tooltip title="Add a user">
            <IconButton disabled={isAdding} onClick={this.handleToggleAddUserOpen}>
              {isAddUserOpen ? <MdiClose /> : <MdiPlus />}
            </IconButton>
          </Tooltip>
        </Toolbar>
        <Collapse in={isAddUserOpen}>
          <Divider />
          <Grid className={classes.gridContainer} container>
            <Grid item xs={12} md={9}>
              <TextField
                fullWidth
                id="addUser-csuId"
                label="CSU ID"
                onChange={this.handleTextFieldChange('csuId')}
                value={textFieldValues.csuId}
                variant="outlined"
                type="number"
              />
            </Grid>
            <Grid className={classes.addUserButtonContainer} item xs={12} md={3}>
              <Button color="primary" fullWidth onClick={this.handleAddUser} variant="contained">
                Add
              </Button>
            </Grid>
          </Grid>
        </Collapse>
      </AppBar>
    );
  };

  createSnackbar = () => (
    <Portal>
      <Snackbar
        open={this.state.snackbar.isOpen}
        autoHideDuration={6e3}
        onClose={this.handleCloseSnackbar}
      >
        <IconSnackbarContent
          variant={this.state.snackbar.variant}
          message={this.state.snackbar.message}
        />
      </Snackbar>
    </Portal>
  );

  render() {
    const { api, classes, groupType } = this.props;
    const { isDeleting } = this.state;
    return (
      <React.Fragment>
        {this.createAppBar()}
        <Paper className={classes.usersContainer}>
          <List>
            {groupType.users.length === 0 && (
              <Typography className={classes.noUsers} variant="button">
                No Users in this Group
              </Typography>
            )}
            {groupType.users.map((user, i) => (
              <ListItem divider={i !== groupType.users.length - 1} key={user.csuId}>
                <ListItemAvatar>
                  <Avatar
                    src={
                      user.profileImage
                        ? api.host + user.profileImage.replace('large', 'small')
                        : defaultProfileSvg
                    }
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={user.displayName || user.csuId}
                  secondary={user.email ? `${user.csuId} - ${user.email}` : null}
                />
                <ListItemSecondaryAction>
                  <Tooltip title={`Remove ${user.displayName || user.csuId}`} placement="left">
                    <IconButton disabled={isDeleting} onClick={this.handleRemoveUser(user.csuId)}>
                      <MdiDelete />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
        {this.createSnackbar()}
      </React.Fragment>
    );
  }
}

UsersList.propTypes = {
  api: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  groupType: PropTypes.shape({
    id: PropTypes.string.isRequired,
    users: PropTypes.array.isRequired,
  }),
  updateGroupType: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ api: state.config.api });
export default connect(mapStateToProps)(withStyles(styles)(UsersList));
