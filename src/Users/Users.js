import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import {
  withStyles,
  createStyleSheet
} from 'material-ui/styles';
import Card, {
  CardContent,
  CardHeader
} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Tabs, {
  Tab
} from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import List from 'material-ui/List';

import PermRequest from './PermRequest';
import User from './User';
import LoadMore from '../LoadMore';

const TabContainer = props =>
  <div>
  {props.children}
</div>;

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styleSheet = createStyleSheet('Users', theme => ({
  card: {
    maxWidth: 775,
  },
  cardHeaderRoot: {
    backgroundColor: theme.palette.primary[500],
  },
  cardHeaderContent: {
    color: theme.palette.common.white,
  },
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
    index: 1,
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
    const cardHeaderClasses = {
      root: classes.cardHeaderRoot,
      content: classes.cardHeaderContent,
    }
    return (
      <Card className={classes.card}>
        <CardHeader title={
            <Typography type='headline' className={classes.cardHeaderContent}>
              Users
            </Typography>
          } classes={cardHeaderClasses} color='inherit'
          />
        <CardContent>
          <Tabs
            index={this.state.index}
            onChange={this.handleChange}
            textColor="primary"
            fullWidth
            centered
            >
            <Tab
              classes={{root: classes.tabsRoot}}
              icon={createTabShowcase(3)}
              label='requests'
              />
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
            <TabContainer>
                <List>
                  <PermRequest/>
                  <PermRequest/>
                  <PermRequest/>
                </List>
              <LoadMore/>
            </TabContainer>
            <TabContainer>
                <List>
                  <User/>
                  <User/>
                  <User/>
                  <User/>
                  <User/>
                </List>
              <LoadMore/>
            </TabContainer>
          </SwipeableViews>
        </CardContent>
      </Card>
    );
  }
}

Users.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Users);
