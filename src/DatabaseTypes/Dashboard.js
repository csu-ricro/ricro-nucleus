import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import {
  withStyles,
  createStyleSheet
} from 'material-ui/styles';
import Tabs, {
  Tab
} from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import List from 'material-ui/List';
import Icon from 'material-ui/Icon';

import CsuDashboard from '../CsuDashboard';
import UserGroupListItem from './UserGroupListItem';
import types from '../testData/types.json';

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
      <CsuDashboard title='Database TYPES'>
        <Tabs
          index={this.state.index}
          onChange={this.handleChange}
          textColor="default"
          scrollButtons='auto'
          scrollable
          >
          <Tab
            classes={{root: classes.tabsRoot}}
            icon={<Icon>info_outline</Icon>}
            label='Description'
            />
          <Tab
            classes={{root: classes.tabsRoot}}
            icon={createTabShowcase(types.app_groups.length)}
            label='type_app_groups'
            />
          <Tab
            classes={{root: classes.tabsRoot}}
            icon={createTabShowcase(types.apps.length)}
            label='type_apps'
            />
          <Tab
            classes={{root: classes.tabsRoot}}
            icon={createTabShowcase(types.file_groups.length)}
            label='type_file_groups'
            />
          <Tab
            classes={{root: classes.tabsRoot}}
            icon={createTabShowcase(types.requests.length)}
            label='type_requests'
            />
          <Tab
            classes={{root: classes.tabsRoot}}
            icon={createTabShowcase(types.status.length)}
            label='type_status'
            />
          <Tab
            classes={{root: classes.tabsRoot}}
            icon={createTabShowcase(types.user_groups.length)}
            label='type_user_groups'
            />
        </Tabs>
        <SwipeableViews
          index={this.state.index}
          onChangeIndex={this.handleChangeIndex}
          animateHeight
          >
          <div style={{padding: 24}}>
            <Typography type='display1'>
              Database TYPES
            </Typography>
            <Typography type='body1'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
          </div>
          <div>
            <List>
              {types.app_groups.map((type)=><UserGroupListItem key={type.app_group_type_id} edit group={type}/>)}
            </List>
          </div>
          <div>
            <List>
              {types.apps.map((type)=><UserGroupListItem key={type.app_type_id} edit group={type}/>)}
            </List>
          </div>
          <div>
            <List>
              {types.file_groups.map((type)=><UserGroupListItem key={type.file_group_type_id} edit group={type}/>)}
            </List>
          </div>
          <div>
            <List>
              {types.requests.map((type)=><UserGroupListItem key={type.request_type_id} edit group={type}/>)}
            </List>
          </div>
          <div>
            <List>
              {types.status.map((type)=><UserGroupListItem key={type.status_type_id} edit group={type}/>)}
            </List>
          </div>
          <div>
            <List>
              {types.user_groups.map((type)=><UserGroupListItem key={type.user_group_type_id} edit group={type}/>)}
            </List>
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
