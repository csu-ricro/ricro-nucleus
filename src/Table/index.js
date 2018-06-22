import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
//
import EnhancedTableHead from './Head';
import EnhancedTableToolbar from './Toolbar';

function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
    : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}

const styles = theme => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  notFound: {
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

class EnhancedTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      order: this.props.defaults.order,
      orderBy: this.props.defaults.orderBy,
      selected: [],
      page: 0,
      rowsPerPage: 10,
    };
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { data, actions, classes, columnData, rowFactory, title } = this.props;
    const { order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    const rowHeight = 57;

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} title={title} actions={actions} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              columnData={columnData}
              onRequestSort={this.handleRequestSort}
              order={order}
              orderBy={orderBy}
            />
            <TableBody>
              {data
                .sort(getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  return (
                    <TableRow hover key={n.id}>
                      {rowFactory(n)}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 &&
                !_.isEmpty(data) && (
                  <TableRow style={{ height: rowHeight * emptyRows }}>
                    <TableCell colSpan={columnData.length} />
                  </TableRow>
                )}
              {_.isEmpty(data) && (
                <TableRow style={{ height: rowHeight * emptyRows }}>
                  <TableCell colSpan={columnData.length}>
                    <Typography variant="headline" className={classes.notFound}>
                      {`No ${title.charAt(title.length - 1) === 's' ? title : `${title}s`} found`}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  actions: PropTypes.node,
  classes: PropTypes.object.isRequired, // MUI withStyles
  columnData: PropTypes.array.isRequired,
  data: PropTypes.array,
  defaults: PropTypes.shape({
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
  }),
  rowFactory: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(EnhancedTable);
