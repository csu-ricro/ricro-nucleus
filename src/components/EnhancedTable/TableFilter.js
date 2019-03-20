import { Checkbox, Collapse, Divider, FormControlLabel, Grid } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Fuse from 'fuse.js';
import _ from 'lodash';
import MdiClose from 'mdi-material-ui/Close';
import PropTypes from 'prop-types';
import React from 'react';

const styles = theme => ({
  gridRoot: { padding: theme.spacing.unit * 3 },
});

class TableFilter extends React.Component {
  state = {
    checkedSearchKeys:
      _.flatMap(this.props.enhancedTable.rootProps.searchKeys, key => key.id) || [],
    displayValue: '',
    searchValue: '',
    threshold: 0.3,
  };

  handleChange = key => () => {
    this.setState(state => {
      if (state.checkedSearchKeys.includes(key)) {
        state.checkedSearchKeys = state.checkedSearchKeys.filter(checkedKey => key !== checkedKey);
      } else {
        state.checkedSearchKeys.push(key);
      }

      this.checkBadgeState({ checkedSearchKeys: state.checkedSearchKeys });

      return { checkedSearchKeys: state.checkedSearchKeys };
    });
  };

  executeSearch = ({
    displayValue = this.state.value,
    threshold = this.state.threshold,
    searchValue = this.state.searchValue,
  }) => {
    const { rootFuncs, rootData } = this.props.enhancedTable;
    this.setState({ threshold, displayValue, searchValue });
    this.checkBadgeState({ displayValue });
    const fuseOptions = {
      threshold,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 2,
      keys: this.state.checkedSearchKeys,
    };

    const searchResult = new Fuse(rootData.source, fuseOptions).search(searchValue);

    rootFuncs.onUpdateSearchData(_.isEmpty(displayValue) ? rootData.source : searchResult);
  };

  handleChangeSearch = event => {
    const displayValue = event.target.value;
    let searchValue = displayValue;
    let { threshold } = this.state;

    if (displayValue.charAt(0) === '"' && displayValue.charAt(displayValue.length - 1) === '"') {
      threshold = 0;
      searchValue = displayValue.substring(1, displayValue.length - 2);
    }

    this.executeSearch({ threshold, displayValue, searchValue });
  };

  handleResetSearch = () => {
    const { rootData, rootFuncs } = this.props.enhancedTable;
    this.checkBadgeState({ displayValue: '' });
    this.setState({ displayValue: '', searchValue: '' });
    rootFuncs.onUpdateSearchData(rootData.source);
  };

  checkBadgeState = ({ displayValue }) => {
    if (_.isEmpty(displayValue == null ? this.state.displayValue : displayValue)) {
      this.props.onSetBadge(false);
    } else {
      this.props.onSetBadge(true);
    }
  };

  // eslint-disable-next-line max-lines-per-function
  render() {
    const { classes, open } = this.props;
    const { checkedSearchKeys, displayValue } = this.state;
    const { searchKeys } = this.props.enhancedTable.rootProps;

    return (
      <Collapse in={open}>
        <Divider />
        <Grid alignItems="center" className={classes.gridRoot} container justify="center">
          <Grid item xs={6}>
            <TextField
              aria-label="search"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon>search</Icon>
                  </InputAdornment>
                ),
                endAdornment: _.isEmpty(displayValue) ? null : (
                  <InputAdornment position="end">
                    <Tooltip title="Clear">
                      <IconButton onClick={this.handleResetSearch}>
                        <MdiClose />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
              fullWidth
              placeholder="Search"
              onChange={this.handleChangeSearch}
              value={displayValue}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            {searchKeys
              .sort((a, b) => (a.label < b.label ? -1 : 1))
              .map(key => {
                return (
                  <FormControlLabel
                    key={key.id}
                    control={
                      <Checkbox
                        value={key.id}
                        checked={checkedSearchKeys.includes(key.id)}
                        onChange={this.handleChange(key.id)}
                      />
                    }
                    label={key.label}
                    labelPlacement="bottom"
                  />
                );
              })}
          </Grid>
        </Grid>
      </Collapse>
    );
  }
}

TableFilter.propTypes = {
  classes: PropTypes.object.isRequired, // MUI withStyles
  enhancedTable: PropTypes.shape({
    rootData: PropTypes.shape({
      search: PropTypes.array.isRequired,
      source: PropTypes.array.isRequired,
    }),
    rootFuncs: PropTypes.shape({ onUpdateSearchData: PropTypes.func.isRequired }),
    rootProps: PropTypes.shape({
      columnData: PropTypes.array.isRequired,
      searchKeys: PropTypes.array.isRequired,
    }),
  }),
  onSetBadge: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default withStyles(styles)(TableFilter);
