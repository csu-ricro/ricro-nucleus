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

import CsuDashboard from '../CsuDashboard';
import UserListItem from './UserListItem';
import LoadMore from '../LoadMore';
import users from '../testData/users.json';

const styleSheet = createStyleSheet('Users', theme => ({
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

class Users extends Component {
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
            icon={createTabShowcase(17)}
            label='users'
            />
        </Tabs>
        <SwipeableViews
          index={this.state.index}
          onChangeIndex={this.handleChangeIndex}
          animateHeight
          >
          <div>
            <List>
              {users.map((user)=><UserListItem key={user.eId} user={user}/>)}
            </List>
            <LoadMore/>
          </div>
        </SwipeableViews>
      </CsuDashboard>
    );
  }
}

Users.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Users);
