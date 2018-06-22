import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Showcase from './';

const data = [];

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

const Backups = () => {
  const locationBasename = '/backups/';
  return (
    <Showcase
      icon="storage"
      title="Backups"
      viewMorePath={locationBasename}
      data={data}
      listItemProps={{ locationBasename }}
      listItemFactory={listItemFactory}
    />
  );
};

Backups.propTypes = {};

export default Backups;
