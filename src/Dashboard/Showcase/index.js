import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  avatar: {
    backgroundColor: theme.palette.csuBrand.primary.green,
    margin: '25px auto',
    height: 112,
    width: 112,
    fontSize: '3.5rem',
  },
  childContainer: {
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    overflow: 'auto',
    minHeight: 220,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  card: {
    margin: `${theme.spacing.unit * 2}px 0`,
    flex: 1,
  },
  notFound: {
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
  icon: {
    textAlign: 'center',
    fontSize: 'unset',
  },
});

const CardShowcase = props => {
  const {
    avatarProps,
    classes,
    data,
    icon,
    listItemFactory,
    listItemProps,
    title,
    viewMorePath,
  } = props;
  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        {icon && (
          <Typography variant="display4" className={classes.textCenter}>
            <Icon className={classes.icon}>{icon}</Icon>
          </Typography>
        )}
        {avatarProps && (
          <Avatar className={classes.avatar} {...avatarProps}>
            {avatarProps.children}
          </Avatar>
        )}
        <Typography variant="display1" className={classes.textCenter}>
          {title}
        </Typography>
        <Divider />
        <div className={classes.childContainer}>
          {_.isEmpty(data) ? (
            <Typography variant="subheading" className={classes.notFound}>
              {`No ${title.charAt(title.length - 1) === 's' ? title : `${title}s`} found`}
            </Typography>
          ) : (
            <List>{data.map(n => listItemFactory(n, listItemProps))}</List>
          )}
        </div>
        <Button component={Link} to={viewMorePath} fullWidth>
          view More
        </Button>
      </CardContent>
    </Card>
  );
};

CardShowcase.propTypes = {
  avatarProps: PropTypes.object,
  classes: PropTypes.object.isRequired, // MUI withStyles
  data: PropTypes.array.isRequired,
  icon: PropTypes.string,
  listItemFactory: PropTypes.func.isRequired,
  listItemProps: PropTypes.object,
  title: PropTypes.string.isRequired,
  viewMorePath: PropTypes.string.isRequired,
};

export default withStyles(styles)(CardShowcase);
