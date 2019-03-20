import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import withStyles from '@material-ui/core/styles/withStyles';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';
import MdiFileImport from 'mdi-material-ui/FileImport';
import MdiKeyboardBackspace from 'mdi-material-ui/KeyboardBackspace';
import MdiUpload from 'mdi-material-ui/Upload';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AddUserFields from './AddUserFields';
import CsvImport from './CsvImport';

const styles = theme => ({
  buttonPadding: { margin: `0 ${theme.spacing.unit}px` },
  flex: { flexGrow: 1 },
  uploadIcon: { marginRight: theme.spacing.unit },
});

const defaultUser = { id: 0, csuId: '', firstName: '', lastName: '', error: false };

class AddUser extends React.Component {
  state = {
    hasError: false,
    hasSubmitted: false,
    isImportIn: false,
    id: 0,
    newUsers: [{ ...defaultUser }],
  };

  handleAddUsers = users => {
    users = Array.isArray(users) ? users : [users];
    this.setState(state => ({ newUsers: this.validateNewUsers(users.concat(state.newUsers)) }));
  };

  handleToggleState = key => () => {
    this.setState(state => ({ [key]: !state[key] }));
  };

  createStatus = ({ icon, label, type }) => {
    const { classes } = this.props;
    return (
      <Tooltip title={label} placement="right">
        <Avatar className={classes[`${type}Status`]}>{icon}</Avatar>
      </Tooltip>
    );
  };

  handleRemoveRow = index => () => {
    this.setState(state => {
      const newUsers = [...state.newUsers];
      if (state.newUsers.length === 1) {
        newUsers.push({ ...defaultUser, id: state.id });
      }
      newUsers.splice(index, 1);
      return { id: state.id + 1, newUsers };
    });
  };

  handleChangeUserField = (index, key) => event => {
    const value = event.target.value;
    this.setState(state => {
      let id = state.id;
      let newUsers = [...state.newUsers];
      if (key !== 'csuId' || (key === 'csuId' && newUsers[index][key].length <= 9)) {
        newUsers[index] = {
          ...newUsers[index],
          [key]: value,
        };
      }

      newUsers = this.validateNewUsers(newUsers);

      if (
        !_.isEmpty(newUsers[newUsers.length - 1].csuId) &&
        newUsers[newUsers.length - 1].csuId.length > 8 &&
        !_.isEmpty(newUsers[newUsers.length - 1].firstName) &&
        !_.isEmpty(newUsers[newUsers.length - 1].lastName)
      ) {
        id += 1;
        newUsers.push({ ...defaultUser, id });
      }

      return { id, newUsers };
    });
  };

  validateNewUsers = (newUsers = this.state.newUsers) => {
    let hasError = false;
    newUsers.forEach((user, i) => {
      let error = [];
      if (_.isEmpty(user.csuId) || user.csuId.length !== 9) error.push('csuId');
      if (_.isEmpty(user.firstName)) error.push('firstName');
      if (_.isEmpty(user.lastName)) error.push('lastName');

      if (error.length === 3 && newUsers.length - 1 === i) {
        error = [];
      }
      hasError = hasError || error.length > 0;
      user.error = error;
      return user;
    });
    this.setState({ hasError });
    return newUsers;
  };

  updateUserStatus = (id, status) => {
    this.setState(state => {
      state.newUsers[id].status = status;
      return { newUsers: state.newUsers };
    });
  };

  handleSubmitUsers = () => {
    const { api } = this.props;
    const { newUsers: newUsersOld } = this.state;
    this.validateNewUsers();
    this.setState(state => {
      const newUsers = [...state.newUsers];
      newUsers.forEach((user, i) => {
        if (i !== newUsers.length - 1) {
          user.status = 'pending';
        } else {
          newUsers.pop();
        }
      });
      return { newUsers, hasSubmitted: true };
    });
    newUsersOld.forEach((user, i) => {
      if (i !== newUsersOld.length - 1) {
        api.axios
          .put(
            '/nucleus/users/new/',
            `csuId=${user.csuId}&firstName=${user.firstName}&lastName=${user.lastName}`,
          )
          .then(resp => {
            this.updateUserStatus(i, resp.data.status);
          })
          .catch(err => {
            this.updateUserStatus(i, _.get(err, 'response.data.status', 'unknown'));
          });
      }
    });
  };

  render() {
    const { classes } = this.props;
    const { hasError, hasSubmitted, isImportIn, newUsers } = this.state;
    return (
      <React.Fragment>
        <Typography variant="h4">Add New User</Typography>
        <Divider />
        <Toolbar>
          <div className={classes.flex}>
            <Tooltip title="Back to Users">
              <IconButton component={Link} to="/users">
                <MdiKeyboardBackspace />
              </IconButton>
            </Tooltip>
          </div>
          {!isImportIn && !hasSubmitted && (
            <Tooltip title="CSV Import">
              <IconButton
                className={classes.buttonPadding}
                onClick={this.handleToggleState('isImportIn')}
              >
                <MdiFileImport />
              </IconButton>
            </Tooltip>
          )}
          <Fab
            aria-label="Submit users"
            className={classes.buttonPadding}
            color="primary"
            disabled={newUsers.length < 2 || hasError || hasSubmitted}
            onClick={this.handleSubmitUsers}
            variant="extended"
          >
            <MdiUpload className={classes.uploadIcon} />
            Submit Users
          </Fab>
        </Toolbar>
        <CsvImport
          hasSubmitted={hasSubmitted}
          isImportIn={isImportIn}
          onAddUsers={this.handleAddUsers}
        />
        <AddUserFields
          {...this.state}
          onChangeUserField={this.handleChangeUserField}
          onRemoveRow={this.handleRemoveRow}
        />
      </React.Fragment>
    );
  }
}

AddUser.propTypes = {
  api: PropTypes.object.isRequired, // redux state
  classes: PropTypes.object.isRequired, // MUI withStyles()
};

const mapStateToProps = state => ({ api: state.config.api });
export default connect(mapStateToProps)(withStyles(styles)(AddUser));
