import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import MdiAccount from 'mdi-material-ui/Account';
import MdiAccountGroup from 'mdi-material-ui/AccountGroup';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit,
    flex: 1,
    [theme.breakpoints.up('md')]: { padding: theme.spacing.unit * 2 },
  },
  card: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  cardAvatar: {
    background: theme.palette.primary.main,
    marginBottom: theme.spacing.unit,
  },
  cardActions: { justifyContent: 'flex-end' },
  cardDescription: {
    display: 'flex',
    alignItems: 'center',
  },
  cardHeader: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    padding: `0${theme.spacing.unit}px`,
  },
  gridItemPadding: {
    display: 'flex',
    padding: theme.spacing.unit * 2,
  },
});

const dashboards = [
  {
    name: 'Users',
    icon: <MdiAccount />,
    description: "View, modify, or add users. Add or remove existing users' permissions.",
    actions: [{ name: 'View Users', link: '/users' }, { name: 'Add User', link: '/users/add' }],
  },
  {
    name: 'User Group Types',
    icon: <MdiAccountGroup />,
    description: "View existing User Group Types. Add or remove existing users' from a group.",
    actions: [{ name: 'View User Group Types', link: '/user-group-types' }],
  },
];

class DashboardPage extends React.Component {
  state = {
    cardHover: '',
  };

  handleHover = cardName => () => {
    this.setState({ cardHover: cardName });
  };

  handleResetHover = () => {
    this.setState({ cardHover: '' });
  };

  createCardActions = actions => {
    return actions.map(action => (
      <Button component={Link} key={action.name} to={action.link} variant="outlined">
        {action.name}
      </Button>
    ));
  };

  render() {
    const { classes } = this.props;
    const { cardHover } = this.state;
    return (
      <Grid container>
        {dashboards.map(board => (
          <Grid
            className={classes.gridItemPadding}
            item
            key={board.name}
            xs={12}
            md={12 / dashboards.length}
          >
            <Card
              className={classes.card}
              raised={board.name === cardHover}
              onMouseEnter={this.handleHover(board.name)}
              onMouseLeave={this.handleResetHover}
            >
              <Tooltip title={`View ${board.name}`}>
                <CardActionArea className={classes.root}>
                  <Grid container>
                    <Grid item xs={12} md={4}>
                      <Typography className={classes.cardHeader} variant="h5">
                        <Avatar className={classes.cardAvatar}>{board.icon}</Avatar>
                        {board.name}
                      </Typography>
                    </Grid>
                    <Grid className={classes.cardDescription} item xs={12} md={8}>
                      <Typography variant="subtitle1">{board.description}</Typography>
                    </Grid>
                  </Grid>
                </CardActionArea>
              </Tooltip>
              <Divider />
              <CardActions className={classes.cardActions}>
                {this.createCardActions(board.actions)}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }
}

DashboardPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DashboardPage);
