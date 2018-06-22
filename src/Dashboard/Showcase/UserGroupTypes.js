import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Showcase from './';

const data = [
  {
    name: 'appsAdmin',
    alias: 'Apps Admin',
    description: 'Admins have full control over all other users',
  },
  { name: 'dev', alias: 'Developer', description: 'Developers have unrestricted access' },
  {
    name: 'protocolStatus',
    alias: 'Protocol Status User',
    description: 'Users can view, create, and update the requests in the Protocol Status app',
  },
];

const listItemFactory = (item, props) => (
  <ListItem key={item.name} button component={Link} to={props.locationBasename + item.name}>
    <ListItemText
      primary={item.alias}
      secondary={item.description}
      secondaryTypographyProps={{ noWrap: true }}
    />
    <ListItemSecondaryAction>
      <IconButton component={Link} to={props.locationBasename + item.name}>
        <Icon>open_in_new</Icon>
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
);

listItemFactory.propTypes = { locationBasename: PropTypes.string.isRequired };

const styles = theme => ({
  avatar: {
    backgroundColor: theme.palette.csuBrand.primary.green,
  },
});

const UserGroups = () => {
  // const { classes } = props;
  const locationBasename = '/type/user-groups/';
  return (
    <Showcase
      icon="group"
      title="User Groups Types"
      viewMorePath={locationBasename}
      data={data}
      listItemProps={{ locationBasename }}
      listItemFactory={listItemFactory}
    />
  );
};

UserGroups.propTypes = {
  classes: PropTypes.object.isRequired, // MUI withStyles
};

export default withStyles(styles)(UserGroups);