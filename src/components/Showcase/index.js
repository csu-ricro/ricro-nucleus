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
import ListItemFactory from './ListItemFactory';

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
    basename,
    classes,
    data,
    disableAddNewButton,
    disableViewMoreButton,
    icon,
    title,
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
            <List>
              {data.map(itemProps => <ListItemFactory {...itemProps} basename={basename} />)}
            </List>
          )}
        </div>
        {(!disableViewMoreButton || !disableAddNewButton) && (
          <div className="row justify-content-center">
            {!disableViewMoreButton && (
              <div className={disableAddNewButton ? 'col-md-12' : 'col-md-6'}>
                <Button variant="outlined" color="primary" component={Link} to={basename} fullWidth>
                  view More
                </Button>
              </div>
            )}
            {!disableAddNewButton && (
              <div className={disableViewMoreButton ? 'col-md-12' : 'col-md-6'}>
                <Button
                  variant="outlined"
                  color="primary"
                  component={Link}
                  to={`${basename}/new`}
                  fullWidth
                >
                  Add New
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

CardShowcase.propTypes = {
  avatarProps: PropTypes.object,
  basename: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired, // MUI withStyles
  data: PropTypes.array.isRequired,
  disableAddNewButton: PropTypes.bool,
  disableViewMoreButton: PropTypes.bool,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(CardShowcase);
