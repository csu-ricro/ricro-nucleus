import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  createStyleSheet
} from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import List, {
  ListItem,
  ListItemSecondaryAction,
  ListItemAvatar,
  ListItemText,
  ListSubheader
} from 'material-ui/List';

import CsuDialog from '../CsuDialog';
import defaultProfileImg from '../assets/images/default-profile.png';

const styleSheet = createStyleSheet('User', theme => ({
  avatar: {
    backgroundColor: theme.palette.primary[500],
  },
  profileImgContainer: {
    // margin: '20 auto',
  },
  profileImg: {
    margin: '0 auto 25px auto',
    height: 200,
    width: 200,
    borderRadius: '100px',
    backgroundColor: 'grey',
  },
}));

class User extends Component {
  state = {
    open: false
  };
  handleDialogToggle = () => {
    console.log('fired');
    this.setState({
      open: !this.state.open
    });
  };
  render() {
    const classes = this.props.classes;
    const dialogActions = (
      <div>
        <Button color='accent'>deactive account</Button>
      </div>
    );
    return (
      <div>
        <CsuDialog
          open={this.state.open}
          onRequestClose={this.handleDialogToggle}
          dialogActions={dialogActions}
          title='User Account'
          >
          <div className='row'>
            <div className={classes.profileImgContainer}>
              <Avatar
                alt={'<NAME>\'s profile image'}
                src={defaultProfileImg}
                className={classes.profileImg}
                />
            </div>
          </div>
          <Divider/>
          <div className='row'>
            <div className='col-md-6'>
              <TextField
                id='first-name'
                label='First Name'
                defaultValue="First"
                className={classes.input}
                marginForm
                fullWidth
                />
            </div>
            <div className='col-md-6'>
              <TextField
                id='last-name'
                label='Last Name'
                defaultValue="Last"
                className={classes.input}
                marginForm
                fullWidth
                />
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6'>
              <TextField
                label='eName'
                defaultValue='ename'
                helperText='Updated automaticly on login'
                marginForm
                fullWidth
                disabled
                />
            </div>
            <div className='col-md-6'>
              <TextField
                label='eID'
                defaultValue='000 000 000'
                helperText='Updated automaticly on login'
                marginForm
                fullWidth
                disabled
                />
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6'>
              <TextField
                label='Email'
                defaultValue='first.last@colostate.edu'
                helperText='Updated automaticly on login'
                marginForm
                fullWidth
                disabled
                />
            </div>
            <div className='col-md-6'>
              <TextField
                label='Last Active'
                defaultValue='2:15pm September 15th, 2016'
                helperText='Updated automaticly on login'
                marginForm
                fullWidth
                disabled
                />
            </div>
          </div>
          <List subheader={<ListSubheader>Groups</ListSubheader>}>
            <ListItem>
              <ListItemText primary='Group Name' secondary='groupName' />
              <ListItemSecondaryAction>
                <IconButton aria-label='Delete group'>
                  <Icon>delete</Icon>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText primary='Group Name' secondary='groupName' />
              <ListItemSecondaryAction>
                <IconButton aria-label='Delete group'>
                  <Icon>delete</Icon>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText primary='Group Name' secondary='groupName' />
              <ListItemSecondaryAction>
                <IconButton aria-label='Delete group'>
                  <Icon>delete</Icon>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText primary='Group Name' secondary='groupName' />
              <ListItemSecondaryAction>
                <IconButton aria-label='Delete group'>
                  <Icon>delete</Icon>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText primary='Group Name' secondary='groupName' />
              <ListItemSecondaryAction>
                <IconButton aria-label='Delete group'>
                  <Icon>delete</Icon>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText primary='Group Name' secondary='groupName' />
              <ListItemSecondaryAction>
                <IconButton aria-label='Delete group'>
                  <Icon>delete</Icon>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText primary='Group Name' secondary='groupName' />
              <ListItemSecondaryAction>
                <IconButton aria-label='Delete group'>
                  <Icon>delete</Icon>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText primary='Group Name' secondary='groupName' />
              <ListItemSecondaryAction>
                <IconButton aria-label='Delete group'>
                  <Icon>delete</Icon>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
          <Button raised className='text-center'>Add Group</Button>
        </CsuDialog>
        <ListItem button onClick={this.handleDialogToggle}>
          <ListItemAvatar>
            <Avatar
              alt={'<NAME>\'s profile image'}
              src={defaultProfileImg}
              />
          </ListItemAvatar>
          <ListItemText
            primary="First Last"
            secondary='000 000 000 • ename'
            />
            <ListItemSecondaryAction>
              <IconButton aria-label='Edit' onClick={this.handleDialogToggle}>
                <Icon>edit</Icon>
              </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
      </div>
    );
  }
}

User.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(User);
