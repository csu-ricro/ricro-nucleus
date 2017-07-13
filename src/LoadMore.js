// @flow

import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  createStyleSheet
} from 'material-ui/styles';
import {
  LinearProgress
} from 'material-ui/Progress';
import green from 'material-ui/colors/green';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';

const styleSheet = createStyleSheet('LoadMore', theme => ({
  wrapper: {
    marginTop: '5px',
    margin: '0 auto',
    textAlign: 'center',
  },
  button: {
    boxShadow: 'none',
    background: 'none',
    width: '100%',
  },
  loadingButton: {
    display: 'none',
  },
  successButton: {
    color: theme.palette.primary[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  progress: {
    color: theme.palette.accent.A200,
  },
}));

class LoadMore extends Component {
  state = {
    loading: false,
    success: false,
    disabled: false,
  };

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleButtonClick = () => {
    if (!this.state.loading) {
      this.setState({
          success: false,
          loading: true,
          disabled: true,
        },
        () => {
          this.timer = setTimeout(() => {
            this.setState({
              loading: false,
              success: true,
              disabled: true,
            });
          }, 2e3);
        },
      );
    }
  };

  handleResetLoadingState = () => {
    this.timer = setTimeout(() => {
      this.setState({
        success: false,
        loading: false,
        disabled: false,
      });
    }, 2e3);
  }

  timer = undefined;

  render() {
    const {
      loading,
      success
    } = this.state;
    const classes = this.props.classes;
    let buttonClass = '';

    if (success) {
      buttonClass = classes.successButton;
      this.handleResetLoadingState();
    }

    if (loading) {
      buttonClass = classes.loadingButton;
    }

    return (
      <div className={classes.wrapper + ' row'}>
        {loading && <LinearProgress color='accent' size={60} className={classes.progress} />}
        <Button
          className={classes.button + ' center-block ' + buttonClass}
          onClick={this.handleButtonClick}
          disabled={this.state.disabled}
          >
          {success ? <Icon>check</Icon> : <Icon>expand_more</Icon>}
        </Button>
      </div>
    );
  }
}

LoadMore.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(LoadMore);
