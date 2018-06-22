import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import config from '../../config.json';
import Showcase from './';

const data = [
  { avatar: config.app.userDefaultProfileImg, name: 'Daniel Lennox', csuId: 830126214 },
  { avatar: config.app.userDefaultProfileImg, name: 'Daniel Lennox', csuId: 830126215 },
];

const listItemFactory = item => (
  <ListItem key={item.csuId} button component={Link} to={`/users/${item.csuId}`}>
    <Avatar alt={item.name} src={item.avatar} />
    <ListItemText
      primary={item.name}
      secondary={item.csuId}
      secondaryTypographyProps={{ noWrap: true }}
    />
    <ListItemSecondaryAction>
      <IconButton component={Link} to={`/users/${item.csuId}`}>
        <Icon>open_in_new</Icon>
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
);

const Users = () => {
  return (
    <Showcase
      icon="person"
      title="Users"
      viewMorePath="/users"
      data={data}
      listItemFactory={listItemFactory}
    />
  );
};

Users.propTypes = {};

export default Users;
