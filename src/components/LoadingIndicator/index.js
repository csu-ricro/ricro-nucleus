import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles from '@material-ui/core/styles/withStyles';
import { defaultProfileSvg } from 'colostate-ricro-ui';
import PropTypes from 'prop-types';
import React from 'react';

const filter = 'drop-shadow( 5px 5px 4px rgba(0, 0, 0, .3))';
const LoadingIndicator = props => {
  const styles = () => {
    const sizeOffset = 0.0454619 * props.size - 0.148469 + 8 + 16 * 1.454619;
    return {
      root: {
        alignItems: props.alignHorizontal,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: props.alignVertical,
        position: 'relative',
      },
      container: {
        alignItems: 'center',
        display: 'flex',
        height: props.size + sizeOffset + 8,
        justifyContent: 'center',
        overflow: 'hidden',
        width: props.size + sizeOffset + 8,
      },
      image: {
        filter,
        height: props.size - sizeOffset,
        position: 'absolute',
      },
      progress: { filter },
    };
  };

  const component = ({ classes, size }) => (
    <div className={classes.root}>
      <div className={classes.container}>
        <CircularProgress
          className={classes.progress}
          size={size}
          thickness={1}
          color="secondary"
        />
        <img alt="CSU Ram Loading Indicator" className={classes.image} src={defaultProfileSvg} />
      </div>
    </div>
  );
  component.propTypes = {
    classes: PropTypes.object.isRequired, // MUI withStyles()
    size: PropTypes.number,
  };

  const Styled = withStyles(styles)(component);
  return <Styled {...props} />;
};

LoadingIndicator.defaultProps = {
  alignHorizontal: 'center',
  alignVertical: 'center',
  size: 100,
};

LoadingIndicator.propTypes = {
  alignHorizontal: PropTypes.oneOf(['center', 'flex-end', 'flex-start', 'unset']),
  alignVertical: PropTypes.oneOf(['center', 'flex-end', 'flex-start', 'unset']),
  disableHorizontalCenter: PropTypes.bool,
  disableVerticleCenter: PropTypes.bool,
  size: PropTypes.number,
};

export default LoadingIndicator;
