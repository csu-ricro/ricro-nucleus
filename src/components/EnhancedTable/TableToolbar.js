import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import TableFilter from './TableFilter';

const styles = theme => ({
  actions: { display: 'flex' },
  root: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    flexWrap: 'wrap',
  },
  spacer: { flex: 'auto' },
  title: { flex: '0 0 auto' },
});

class EnhancedTableToolbar extends React.Component {
  state = {
    hasBadge: false,
    isFilterOpen: false,
  };

  handleSetBadge = hasBadge => {
    this.setState({ hasBadge });
  };

  handleFilterToggle = () => {
    this.setState(state => ({
      isFilterOpen: !state.isFilterOpen,
    }));
  };

  // eslint-disable-next-line max-lines-per-function
  render() {
    const { hasBadge, isFilterOpen } = this.state;
    const { classes } = this.props;
    const { isLoading } = this.props.enhancedTable.rootState;
    const {
      disableAdd,
      disableFilter,
      disableReload,
      location,
      title,
      iconAdd,
      iconFilter,
      iconReload,
    } = this.props.enhancedTable.rootProps;
    const { onFetchData } = this.props.enhancedTable.rootFuncs;

    return (
      <React.Fragment>
        <AppBar color="default" component="div" elevation={0} position="static">
          <Toolbar className={classes.root}>
            <div className={classes.title}>
              <Typography color="inherit" variant="h4" id="tableTitle">
                {title}
              </Typography>
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
              {iconAdd && !disableAdd && (
                <Tooltip className={classes.middleButtonPadding} title={`Add new ${title}`}>
                  <IconButton component={Link} to={`${location.pathname}/add`}>
                    {iconAdd}
                  </IconButton>
                </Tooltip>
              )}
              {!disableReload && (
                <Tooltip title={isLoading ? 'Refreshing...' : `Refresh ${title}`}>
                  <div className={classes.disabledTooltipWrapper}>
                    <IconButton disabled={isLoading} onClick={onFetchData}>
                      {iconReload}
                    </IconButton>
                  </div>
                </Tooltip>
              )}
              {!disableFilter && (
                <Tooltip className={classes.middleButtonPadding} title={`Filter ${title}`}>
                  <div>
                    <IconButton
                      color={isFilterOpen ? 'primary' : 'default'}
                      disabled={isLoading}
                      onClick={this.handleFilterToggle}
                    >
                      <Badge
                        className={classes.margin}
                        color="error"
                        invisible={!hasBadge}
                        variant="dot"
                      >
                        {iconFilter}
                      </Badge>
                    </IconButton>
                  </div>
                </Tooltip>
              )}
            </div>
          </Toolbar>
          {!disableFilter && (
            <TableFilter
              onSetBadge={this.handleSetBadge}
              open={isFilterOpen && !isLoading}
              enhancedTable={this.props.enhancedTable}
            />
          )}
        </AppBar>
      </React.Fragment>
    );
  }
}

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired, // MUI withStyles
  enhancedTable: PropTypes.shape({
    rootFuncs: PropTypes.shape({ onFetchData: PropTypes.func.isRequired }),
    rootProps: PropTypes.shape({
      disableAdd: PropTypes.bool,
      disableFilter: PropTypes.bool,
      disableReload: PropTypes.bool,
      iconAdd: PropTypes.object,
      iconFilter: PropTypes.object,
      iconReload: PropTypes.object,
      location: PropTypes.object.isRequired,
      title: PropTypes.string,
    }),
    rootState: PropTypes.shape({ isLoading: PropTypes.bool.isRequired }),
  }),
};

export default withStyles(styles)(EnhancedTableToolbar);
