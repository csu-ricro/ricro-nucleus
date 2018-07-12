import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import config from '../config.json';
import AddGroup from './AddGroup';

const transition = {
  transition: '.5s ease',
};

const styles = theme => ({
  active: {
    borderRight: `5px solid ${theme.palette.csuBrand.secondary.aggieOrange}`,
  },
  avatar: {
    backgroundColor: theme.palette.csuBrand.primary.green,
    fontSize: '1rem',
    fontWeight: 'bold',
    height: 200,
    width: 200,
    margin: 'auto',
  },
  card: {
    height: 350,
    marginTop: -100,
  },
  profileImg: {
    ...transition,
    display: 'block',
    margin: '0 auto',
  },
  avatarContainer: {
    '&:hover $avatarEdit': {
      opacity: 1,
    },
    '&:hover $profileImg': {
      opacity: 0.5,
    },
    paddingTop: '3%',
    position: 'relative',
    maxWidth: 200,
    margin: '0 auto',
  },
  avatarEdit: {
    ...transition,
    opacity: 0,
    position: 'absolute',
    top: '50%',
    left: '50%',
    textAlign: 'center',
    transform: 'translate(-50%, -50%)',
    '-ms-transform': 'translate(-50%, -50%)',
  },
  toolbarRoot: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
});

const user = {
  firstName: 'Daniel',
  lastName: 'Lennox',
  displayName: 'Daniel Lennox',
  eId: 'dlennox',
  csuId: 830126214,
  email: 'daniel.lennox@colostate.edu',
  userGroups: [
    {
      name: 'dev',
      alias: 'Dev',
      description: 'Developer of the ricro-apps. Has access to all applicaitons.',
    },
    {
      name: 'admin',
      alias: 'Administrator',
      description:
        'Administrator of the ricro-apps. Has access to Nucleus and is able to manage users.',
    },
  ],
};
class EditUser extends React.Component {
  state = {
    editDisplayName: false,
    displayName: user.displayName,
  };

  handleUpdateState = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleToggleOpen = event => {
    const key = event.currentTarget.getAttribute('data-id');
    this.setState({
      [key]: !this.state[key],
    });
  };

  render() {
    const { classes } = this.props;
    const { editDisplayName, displayName } = this.state;
    return (
      <React.Fragment>
        <Typography variant="display2">Edit User</Typography>
        <Divider />
        <Grid container>
          <Grid item xs={12} md={3}>
            <div className={classes.avatarContainer}>
              <img
                src={user.profileImg || config.app.userDefaultProfileImg}
                className={classes.profileImg}
                alt={`${user.displayName} profile`}
              />
              <Button variant="fab" color="primary" className={classes.avatarEdit}>
                <Icon>edit</Icon>
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} md={9}>
            <Toolbar className={classes.toolbarRoot} disableGutters>
              <Typography variant="title" className={classes.flex}>
                User
              </Typography>
            </Toolbar>
            <Divider />
            <Grid container>
              <Grid item md={6} xs={12}>
                <List>
                  <ListItem
                    button={!editDisplayName}
                    onClick={editDisplayName ? null : this.handleToggleOpen}
                    data-id="editDisplayName"
                  >
                    <ListItemText
                      primary={
                        !editDisplayName ? (
                          user.displayName
                        ) : (
                          <TextField
                            id="displayName"
                            margin="none"
                            value={displayName}
                            onChange={this.handleUpdateState}
                            placeholder={user.displayName}
                            fullWidth
                          />
                        )
                      }
                      secondary="Display Name"
                    />
                    <ListItemSecondaryAction>
                      <Tooltip title="Edit">
                        <IconButton
                          data-id="editDisplayName"
                          aria-label="Edit display name"
                          onClick={this.handleToggleOpen}
                        >
                          <Icon>{editDisplayName ? 'clear' : 'edit'}</Icon>
                        </IconButton>
                      </Tooltip>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </Grid>
              <Grid item md={6} xs={12}>
                <ListItem>
                  <ListItemText primary={`${user.lastName}, ${user.firstName}`} secondary="Name" />
                </ListItem>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item md={6} xs={12}>
                <ListItem>
                  <ListItemText primary={user.eId} secondary="eID" />
                </ListItem>
              </Grid>
              <Grid item md={6} xs={12}>
                <ListItem>
                  <ListItemText
                    primary={user.csuId.toString().replace(/(.{3})/g, '$1 ')}
                    secondary="CSU ID"
                  />
                </ListItem>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item md={6} xs={12}>
                <ListItem>
                  <ListItemText
                    primary={<a href={`mailto:${user.email}`}>{user.email}</a>}
                    secondary="Email"
                  />
                </ListItem>
              </Grid>
            </Grid>
            {_.isEmpty(user.userGroups) ? null : (
              <Grid container>
                <Grid item xs={12}>
                  <List disablePadding>
                    <AddGroup />
                    <Divider />
                    {user.userGroups.map(userGroup => (
                      <ListItem key={userGroup.alias}>
                        <ListItemText primary={userGroup.alias} secondary={userGroup.description} />
                        <ListItemSecondaryAction>
                          <Tooltip title="Edit">
                            <IconButton data-name={userGroup.name} aria-label="Remove Group">
                              <Icon>clear</Icon>
                            </IconButton>
                          </Tooltip>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

EditUser.propTypes = {
  classes: PropTypes.object.isRequired, // MUI withStyles
  match: PropTypes.object.isRequired, // react-router
};

export default withStyles(styles)(EditUser);
