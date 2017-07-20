import React from 'react';
import PropTypes from 'prop-types';

const TabContainer = (props) => {
  let gutterSize = props.gutterSize ? parseInt(props.gutterSize, 10) : 24;
  let style = {
    padding: gutterSize,
  };

  if (props.disableVGutter) {
    style = {
      padding: '0 ' + gutterSize + 'px',
    };
  }

  if (props.disableHGutter) {
    style = {
      padding: gutterSize + 'px 0',
    };
  }

  if (props.disableGutter || (props.disableHGutter && props.disableVGutter)) {
    style = null;
  }

  return <div style={style}>{props.children}</div>
};

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  gutterSize: PropTypes.number,
  diableGutter: PropTypes.bool,
  diableVGutter: PropTypes.bool,
  diableHGutter: PropTypes.bool,
};

export default TabContainer;
