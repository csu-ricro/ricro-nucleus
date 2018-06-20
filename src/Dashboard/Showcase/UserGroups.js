import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
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

const UserGroups = () => {
  return (
    <Showcase icon="group" title="User Groups" viewMorePath="/groups">
      <List>
        {data.map(n => (
          <ListItem key={n.name} button component={Link} to={`/groups/${n.name}`}>
            <ListItemText
              primary={n.alias}
              secondary={n.description}
              secondaryTypographyProps={{ noWrap: true }}
            />
            <ListItemSecondaryAction>
              <IconButton component={Link} to={`/groups/${n.name}`}>
                <Icon>open_in_new</Icon>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Showcase>
  );
};

UserGroups.propTypes = {};

export default UserGroups;
