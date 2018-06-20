import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import config from '../../config.json';
import Showcase from './';

const data = [
  { avatar: config.app.userDefaultProfileImg, name: 'Daniel Lennox', csuId: 830126214 },
  { avatar: config.app.userDefaultProfileImg, name: 'Daniel Lennox', csuId: 830126215 },
  { avatar: config.app.userDefaultProfileImg, name: 'Daniel Lennox', csuId: 830126216 },
];

const Users = () => {
  return (
    <Showcase icon="person" title="Users" viewMorePath="/users">
      <List>
        {data.map(n => (
          <ListItem key={n.csuId} button component={Link} to={`/users/${n.csuId}`}>
            <Avatar alt={n.name} src={n.avatar} />
            <ListItemText
              primary={n.name}
              secondary={n.csuId}
              secondaryTypographyProps={{ noWrap: true }}
            />
            <ListItemSecondaryAction>
              <IconButton component={Link} to={`/users/${n.csuId}`}>
                <Icon>open_in_new</Icon>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Showcase>
  );
};

Users.propTypes = {};

export default Users;
