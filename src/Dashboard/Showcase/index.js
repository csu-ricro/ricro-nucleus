import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  avatar: {
    backgroundColor: theme.palette.csuBrand.primary.green,
    margin: '25px auto',
    height: 112,
    width: 112,
    fontSize: '3.5rem',
  },
  button: {},
  childContainer: {
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    overflow: 'auto',
  },
  card: {
    margin: `${theme.spacing.unit * 2}px 0`,
    flex: 1,
  },
  cardContent: {},
  textCenter: {
    textAlign: 'center',
  },
  icon: {
    textAlign: 'center',
    fontSize: 'unset',
  },
  root: {},
});

const CardShowcase = props => {
  const { avatarProps, children, classes, icon, title, viewMorePath } = props;
  return (
    <div className={classes.root}>
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
          <div className={classes.childContainer}>{children}</div>
          <Button component={Link} to={viewMorePath} fullWidth>
            view More
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

CardShowcase.propTypes = {
  avatarProps: PropTypes.object,
  children: PropTypes.node,
  classes: PropTypes.object.isRequired, // MUI withStyles
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  viewMorePath: PropTypes.string.isRequired,
};

export default withStyles(styles)(CardShowcase);
