import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Showcase from '../components/Showcase';

const sourceData = [
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

const Alerts = props => {
  const { classes } = props;
  const data = sourceData.map(o => ({
    itemId: o.id,
    primary: o.title,
    secondary: o.date,
    rootProps: { className: classes[o.type] },
  }));

  return <Showcase icon="notifications" title="Alerts" basename="/alerts" data={data} />;
};

Alerts.propTypes = {
  classes: PropTypes.object.isRequired, // MUI withStyles
};

export default withStyles(styles)(Alerts);
