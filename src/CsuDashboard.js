import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  createStyleSheet
} from 'material-ui/styles';
import Card, {
  CardContent,
  CardHeader,
  CardActions
} from 'material-ui/Card';
import Typography from 'material-ui/Typography';

const TabContainer = props =>
  <div>
  {props.children}
</div>;

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styleSheet = createStyleSheet('CsuDashboard', theme => ({
  card: {
    // maxWidth: 775,
  },
  cardHeaderRoot: {
    backgroundColor: theme.palette.primary[500],
  },
  cardHeaderContent: {
    color: theme.palette.common.white,
  },
  flex: {
    flex: 1,
  },
}));

class CsuDashboard extends Component {
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
              {this.props.title}
            </Typography>
          } classes={cardHeaderClasses} color='inherit'
          />
        <CardContent>
          {this.props.children}
        </CardContent>
        {this.props.cardActions ?
          <CardActions>
            {this.props.alignCARight ? <div className={classes.flex}/> : null}
            {this.props.cardActions}
          </CardActions>
          : null
        }
      </Card>
    );
  }
}

CsuDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  cardActions: PropTypes.node,
  alignCARight: PropTypes.bool,
};

export default withStyles(styleSheet)(CsuDashboard);
