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
    id: 1,
    type: 'info',
    title: 'Revised Common Rule (Human Subjects Regulations)',
    date: '2018-06-03',
  },
  {
    id: 2,
    type: 'warning',
    title: 'The European Union (EU) General Data Protection Regulation (GDPR)',
    date: '2018-05-16',
  },
  {
    id: 3,
    type: 'success',
    title: 'Filler Title',
    date: '2018-05-16',
  },
];

const styles = theme => ({
  danger: {
    borderLeft: `5px solid ${theme.palette.alerts.danger}`,
  },
  info: {
    borderLeft: `5px solid ${theme.palette.alerts.info}`,
  },
  success: {
    borderLeft: `5px solid ${theme.palette.alerts.success}`,
  },
  warning: {
    borderLeft: `5px solid ${theme.palette.alerts.warning}`,
  },
});

const listItemFactory = (item, props) => (
  <ListItem
    key={item.id}
    button
    component={Link}
    to={`/alerts/${item.id}`}
    className={props.classes[item.type]}
  >
    <ListItemText
      primary={item.title}
      secondary={item.date}
      primaryTypographyProps={{ noWrap: true }}
      secondaryTypographyProps={{ noWrap: true }}
    />
    <ListItemSecondaryAction>
      <IconButton component={Link} to={`/alerts/${item.id}`}>
        <Icon>open_in_new</Icon>
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
);

listItemFactory.propTypes = { classes: PropTypes.object.isRequired };

const Alerts = props => {
  const { classes } = props;
  return (
    <Showcase
      icon="notifications"
      title="Alerts"
      viewMorePath="/alerts"
      data={data}
      listItemProps={{ classes }}
      listItemFactory={listItemFactory}
    />
  );
};

Alerts.propTypes = {
  classes: PropTypes.object.isRequired, // MUI withStyles
};

export default withStyles(styles)(Alerts);
