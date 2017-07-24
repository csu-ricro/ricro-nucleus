import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import _ from 'lodash';
import {
  withStyles,
  createStyleSheet
} from 'material-ui/styles';
import List, {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';
import Switch from 'material-ui/Switch';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

import apiCall from '../utils/apiCall';
import CsuSnackbar from '../csu-app-template/CsuSnackbar';

const styleSheet = createStyleSheet('ManageGroups', theme => ({
  userGroupSearch: {
    margin: '10px 0',
  },
}));

class GroupListItem extends Component {
  state = {
    checked: this.props.isActive,
    snackbar: {
      open: false,
      message: 'notification',
      className: 'default',
    },
  };

  handleToggle = () => {
    let message = 'An error occured. Please try again.';
    let className = 'error';
    $.when(apiCall('/user/toggleUserGroup/', {
      method: 'PUT',
      data: {
        eId: this.props.eId,
        userGroupId: this.props.group.user_group_type_id,
      },
    })).done((data) => {
      if (data.status === 'success') {
        message = this.state.checked ? 'Group successfully deactivated' : 'Group successfully activated';
        className = 'success';
        this.props.updateUsers();
        this.setState({
          checked: !this.state.checked,
        });
      }
      this.setState({
        snackbar: {
          open: true,
          message,
          className,
        },
      });
    });
  }

  handleSnackbarClose = () => {
    this.setState({
      snackbar: {
        ...this.state.snackbar,
        open: false,
      },
    });
  }

  render() {
    if (!this.state.checked && !this.props.manageMode) {
      return null;
    }
    return (
      <ListItem
        onClick={this.props.manageMode ? this.handleToggle : null}
        button={this.props.manageMode}
        >
        <ListItemText primary={this.props.group.alias} secondary={this.props.group.description} />
        {this.props.manageMode ? (
          <ListItemSecondaryAction>
            <Switch
              checked={this.state.checked}
              />
          </ListItemSecondaryAction>
        ) : null}
        <CsuSnackbar
          className={this.state.snackbar.className}
          open={this.state.snackbar.open}
          onRequestClose={this.handleSnackbarClose}
          message={this.state.snackbar.message}
          />
      </ListItem>
    );
  }
}

GroupListItem.propTypes = {
  group: PropTypes.object.isRequired,
  eId: PropTypes.number.isRequired,
  updateUsers: PropTypes.func.isRequired,
  manageMode: PropTypes.bool,
  isActive: PropTypes.bool,
};

class ManageGroups extends Component {
  state = {
    manageMode: false,
    groups: {
      all: [],
      search: [],
    },
    search: '',
  }

  toggleManageMode = () => {
    if (this.state.manageMode) {
      this.setState({
        groups: {
          ...this.state.groups,
          search: this.state.groups.all,
        }
      })
    }
    this.setState({
      manageMode: !this.state.manageMode,
      search: '',
    });
  }

  updateAllGroups = () => {
    $.when(apiCall('/userGroup/')).done((data) => {
      this.setState({
        groups: {
          all: data.result,
          search: data.result,
        },
        search: '',
      });
    });
  }

  search = event => {
    const value = event.target.value;
    const valueLower = value.toLowerCase();
    this.setState({
      groups: {
        ...this.state.groups,
        search: _.filter(this.state.groups.all, (o) => {
          return (
            o.alias.toLowerCase().includes(valueLower) ||
            o.name.toLowerCase().includes(valueLower) ||
            o.description.toLowerCase().includes(valueLower)
          );
        }),
      },
      search: value,
    });
  }

  componentDidMount() {
    this.updateAllGroups();
  }

  render() {
    const classes = this.props.classes;
    return (
      <div className='row'>
        <div className='col-md-8 col-md-offset-2'>
          <List>
            <Button
              style={{width: '100%'}}
              color='primary'
              onClick={this.toggleManageMode}
              raised={this.state.manageMode}
              >
              manage groups
            </Button>
            {!this.state.manageMode ? null : (
              <TextField
                label='Search'
                value={this.state.search}
                className={classes.userGroupSearch}
                inputProps={{onChange: this.search}}
                helperText={this.state.groups.search.length + ' groups found'}
                fullWidth
                />
            )}
            {this.state.groups.search.map((group) =>
              <GroupListItem
                key={group.user_group_type_id}
                group={group}
                eId={this.props.user.eId}
                manageMode={this.state.manageMode}
                updateUsers={this.props.updateUsers}
                isActive={_.some(this.props.user.userGroups, group)}
                />
            )}
          </List>
        </div>
      </div>
    );
  }
}

ManageGroups.propTypes = {
  user: PropTypes.object.isRequired,
  updateUsers: PropTypes.func.isRequired,
};

export default withStyles(styleSheet)(ManageGroups);
