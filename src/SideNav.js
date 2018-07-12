import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter, matchPath } from 'react-router';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  active: {
    borderRight: `5px solid ${theme.palette.csuBrand.secondary.aggieOrange}`,
  },
  avatar: {
    backgroundColor: theme.palette.csuBrand.primary.green,
    fontSize: '1rem',
    fontWeight: 'bold',
    height: 30,
    width: 30,
  },
});

const ListItemWrapper = props => {
  const { children, classes, location, to } = props;
  return (
    <ListItem
      button
      component={Link}
      to={to}
      className={classNames(
        matchPath(location.pathname, {
          path: to,
          exact: to === '/',
        }) && classes.active,
      )}
    >
      {children}
    </ListItem>
  );
};

ListItemWrapper.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired, // MUI withStyles
  location: PropTypes.object.isRequired,
  to: PropTypes.string.isRequired,
};

const SideNav = props => {
  // const { classes } = props;
  return (
    <React.Fragment>
      <List>
        <ListItemWrapper {...props} to="/">
          <ListItemIcon>
            <Icon>dashboard</Icon>
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemWrapper>
        <ListItemWrapper {...props} to="/users">
          <ListItemIcon>
            <Icon>person</Icon>
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItemWrapper>
        <ListItemWrapper {...props} to="/alerts">
          <ListItemIcon>
            <Icon>notifications</Icon>
          </ListItemIcon>
          <ListItemText primary="Alerts" />
        </ListItemWrapper>
      </List>
      <Divider />
      <List>
        <ListItemWrapper {...props} to="/type/user-groups">
          <ListItemIcon>
            <Icon>group</Icon>
          </ListItemIcon>
          <ListItemText primary="User Group Types" />
        </ListItemWrapper>
      </List>
    </React.Fragment>
  );
};

SideNav.propTypes = {
  classes: PropTypes.object.isRequired, // MUI withStyles
  location: PropTypes.object.isRequired, // react-router withRouter
};

export default withRouter(withStyles(styles)(SideNav));
