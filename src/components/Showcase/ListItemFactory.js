import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

const ListItemFactory = props => {
  const { avatar, basename, itemId, primary, rootProps, secondary } = props;
  const to = `${basename}/edit/${itemId}`;
  return (
    <ListItem key={itemId} button component={Link} to={to} {...rootProps}>
      {avatar && <Avatar alt={primary} src={avatar} />}
      <ListItemText
        primary={primary}
        secondary={secondary}
        primaryTypographyProps={{ noWrap: true }}
        secondaryTypographyProps={{ noWrap: true }}
      />
      <ListItemSecondaryAction>
        <IconButton component={Link} to={to}>
          <Icon>open_in_new</Icon>
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

ListItemFactory.propTypes = {
  avatar: PropTypes.string,
  basename: PropTypes.string.isRequired,
  itemId: PropTypes.string.isRequired,
  primary: PropTypes.string.isRequired,
  rootProps: PropTypes.object,
  secondary: PropTypes.string,
};

export default ListItemFactory;
