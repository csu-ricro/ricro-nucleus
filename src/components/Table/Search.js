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

const styles = () => ({
  field: {
    width: 350,
    verticalAlign: 'middle',
  },
});

class Search extends React.Component {
  state = {
    value: '',
  };

  handleSearch = event => {
    const value = event.target.value;
    let searchValue = value;
    let threshold = 0.5;
    if (value.charAt(0) === '"' && value.charAt(value.length - 1) === '"') {
      threshold = 0;
      searchValue = value.substring(1, value.length - 2);
    }
    const fuseOptions = {
      threshold,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 2,
      keys: this.props.searchKeys,
    };
    const searchResult = new Fuse(this.props.sourceData, fuseOptions).search(searchValue);
    this.setState({ value });
    this.props.onUpdateData(_.isEmpty(value) ? this.props.sourceData : searchResult);
  };

  handleResetSearch = () => {
    this.setState({ value: '' });
    this.props.onUpdateData(this.props.sourceData);
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <TextField
        aria-label="search"
        className={classes.field}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon>search</Icon>
            </InputAdornment>
          ),
          endAdornment: _.isEmpty(value) ? null : (
            <InputAdornment position="end">
              <Tooltip title="Clear">
                <IconButton onClick={this.handleResetSearch}>
                  <MdiClose />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
        placeholder="Search"
        value={value}
        onChange={this.handleSearch}
      />
    );
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired, // MUI withStyles
  onUpdateData: PropTypes.func.isRequired,
  searchKeys: PropTypes.array.isRequired,
  sourceData: PropTypes.array.isRequired,
};

export default withStyles(styles)(Search);
