import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
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

import CsuDashboard from '../CsuDashboard';
import UserListItem from './UserListItem';
import users from '../testData/users.json';

const styleSheet = createStyleSheet('Dashboard', theme => ({
  tabsRoot: {
    height: 'initial',
  },
}));

function createTabShowcase(showcase) {
  return (
    <Typography type='display1' component='h2'>
      {showcase}
    </Typography>
  );
}

class Dashboard extends Component {
  state = {
    index: 0,
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
            icon={createTabShowcase(users.length)}
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
          <div style={{padding: 24}}>
            <Typography type='display1'>
              Users
            </Typography>
            <Typography type='body1'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
          </div>
          <div>
            <List>
              {users.map((user)=><UserListItem key={user.eId} user={user}/>)}
            </List>
          </div>
          <div>
            <Typography className='text-center' type='headline'>
              Coming Soon!
            </Typography>
          </div>
        </SwipeableViews>
      </CsuDashboard>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Dashboard);
