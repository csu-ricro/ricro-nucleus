import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';

const styles = () => ({
  root: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
});

class LinkedTableCell extends React.Component {
  handleClick = event => {
    const location = event.currentTarget.getAttribute('data-to');
    // Checks if the url is a valid external url
    // https://stackoverflow.com/questions/8667070/javascript-regular-expression-to-validate-url#answer-15855457
    const isAnchor = Boolean(
      location.match(
        // eslint-disable-next-line
      /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/g,
      ),
    );
    // debugger //eslint-disable-line
    if (isAnchor) {
      window.location = location;
    } else {
      this.props.history.push(location);
    }
  };

  render() {
    const { children, classes, className, to, staticContext, ...other } = this.props;
    return (
      <TableCell
        {...other}
        className={classNames(classes.root, className)}
        onClick={this.handleClick}
        data-to={to}
      >
        {children}
      </TableCell>
    );
  }
}

LinkedTableCell.propTypes = {
  children: PropTypes.any,
  classes: PropTypes.object.isRequired, // MUI withStyles
  className: PropTypes.string,
  history: PropTypes.object.isRequired, // react-router withRouter
  staticContext: PropTypes.any,
  to: PropTypes.string.isRequired,
};

export default withRouter(withStyles(styles)(LinkedTableCell));
