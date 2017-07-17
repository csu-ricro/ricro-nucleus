import React, {
  PureComponent
} from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import SwipeableViews from 'react-swipeable-views';
import {
  withStyles,
  createStyleSheet
} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Tabs, {
  Tab
} from 'material-ui/Tabs';
import List from 'material-ui/List';
import Icon from 'material-ui/Icon';
import {
  CircularProgress
} from 'material-ui/Progress';

import CsuDashboard from '../CsuDashboard';
import TabContainer from '../TabContainer';
import UserListItem from './UserListItem';
import apiCall from '../apiCall';

const styleSheet = createStyleSheet('UsersDashboard', theme => ({
  tabsRoot: {
    height: 'initial',
  },
  progress: {
    margin: '30px auto',
    display: 'block',
  },
}));

function createTabShowcase(showcase) {
  return (
    <Typography type='display1' component='h2'>
      {showcase}
    </Typography>
  );
}


class UsersDashboard extends PureComponent {
  state = {
    index: 0,
    loadingUsers: true,
    users: [],
  };

  handleChange = (event, index) => {
    this.setState({
      index
    });
  };

  handleChangeIndex = index => {
    this.setState({
      index
    });
  };

  componentDidMount() {
    $.when(apiCall('/user/')).done((data) => {
      console.log(data);
      $('#users-loading').slideUp('fast', () => {
        this.setState({
          loadingUsers: !this.state.loadingUsers,
          users: data.result,
        });
      })
    });
  }

  render() {
    const classes = this.props.classes;
    return (
      <CsuDashboard title='Users'>
        <Tabs
          index={this.state.index}
          onChange={this.handleChange}
          textColor="primary"
          fullWidth
          centered
          >
          <Tab
            classes={{root: classes.tabsRoot}}
            icon={<Icon>info_outline</Icon>}
            label='Description'
            />
          <Tab
            classes={{root: classes.tabsRoot}}
            icon={createTabShowcase(this.state.users.length)}
            label='users'
            />
          <Tab
            classes={{root: classes.tabsRoot}}
            icon={createTabShowcase(0)}
            label='requests'
            />
        </Tabs>
        <SwipeableViews
          index={this.state.index}
          onChangeIndex={this.handleChangeIndex}
          animateHeight
          >
          <TabContainer>
            <Typography type='display1'>
              Users
            </Typography>
            <Typography type='body1'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
          </TabContainer>
          <TabContainer>
            <CircularProgress id='users-loading' className={classes.progress} size={75} />
            <List>
              {this.state.users.map((user)=><UserListItem key={user.eId} user={user}/>)}
            </List>
          </TabContainer>
          <TabContainer>
            <Typography className='text-center' type='headline'>
              Coming Soon!
            </Typography>
          </TabContainer>
        </SwipeableViews>
      </CsuDashboard>
    );
  }
}

UsersDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(UsersDashboard);
