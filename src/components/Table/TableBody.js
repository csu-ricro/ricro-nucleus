import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';
import MdiAlert from 'mdi-material-ui/Alert';
import PropTypes from 'prop-types';
import React from 'react';

const styles = () => ({
  notFound: {
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  notFoundIcon: {
    display: 'flex',
    fontSize: '5em',
    justifyContent: 'center',
    margin: '0 auto 0.25em',
  },
});

function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
    : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}

const EnhancedTableBody = props => {
  const { classes, parentProps, parentState } = props;
  const { children, columnData, data, isLoading, title } = parentProps;
  const { order, orderBy, rowsPerPage, page } = parentState;
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
  const rowHeight = 65;
  const TableRowRenderer = children;

  return (
    <TableBody>
      {data
        .sort(getSorting(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map(row => (
          <TableRow key={row.id} hover>
            <TableRowRenderer row={row} />
          </TableRow>
        ))}
      {/* {emptyRows > 0 && !_.isEmpty(data) && (
        <TableRow style={{ height: rowHeight * emptyRows }}>
          <TableCell colSpan={columnData.length} />
        </TableRow>
      )} */}
      {(_.isEmpty(data) || isLoading) && (
        <TableRow style={{ height: rowHeight * emptyRows }}>
          <TableCell colSpan={columnData.length}>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <React.Fragment>
                <MdiAlert className={classes.notFoundIcon} />
                <Typography variant="h5" className={classes.notFound}>
                  {`No ${title.charAt(title.length - 1) === 's' ? title : `${title}s`} found`}
                </Typography>
              </React.Fragment>
            )}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

EnhancedTableBody.defaultProps = {
  parentProps: {
    data: [],
    isLoading: true,
  },
};

EnhancedTableBody.propTypes = {
  classes: PropTypes.object.isRequired, // MUI withStyles()
  defaults: PropTypes.shape({
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
  }),
  parentProps: PropTypes.shape({
    children: PropTypes.func.isRequired,
    columnData: PropTypes.array.isRequired,
    data: PropTypes.array,
    isLoading: PropTypes.bool,
    title: PropTypes.string.isRequired,
  }),
  parentState: PropTypes.shape({
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  }),
};

export default withStyles(styles)(EnhancedTableBody);
