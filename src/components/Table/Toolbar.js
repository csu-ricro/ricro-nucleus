import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';

const styles = theme => ({
  actions: { color: theme.palette.text.secondary },
  root: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    flexWrap: 'wrap',
  },
  spacer: { flex: 'auto' },
  title: { flex: '0 0 auto' },
});

class EnhancedTableToolbar extends React.Component {
  state = { isFilterOpen: false };

  handleFilterToggle = () => {
    this.setState(state => ({
      isFilterOpen: !state.isFilterOpen,
    }));
  };

  render() {
    const { actions, classes, title } = this.props;

    return (
      <React.Fragment>
        <AppBar position="static" color="default" elevation={0}>
          <Toolbar className={classes.root}>
            <div className={classes.title}>
              <Typography color="inherit" variant="h4" id="tableTitle">
                {title}
              </Typography>
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>{actions}</div>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    );
  }
}

EnhancedTableToolbar.propTypes = {
  actions: PropTypes.node,
  classes: PropTypes.object.isRequired, // MUI withStyles
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(EnhancedTableToolbar);
