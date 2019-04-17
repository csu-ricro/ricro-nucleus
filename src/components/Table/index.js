import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TablePagination from '@material-ui/core/TablePagination';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';
import EnhancedTableHead from './Head';
import EnhancedTableBody from './TableBody';
import EnhancedTableToolbar from './Toolbar';

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
  state = {
    order: this.props.defaults.order,
    orderBy: this.props.defaults.orderBy,
    selected: [],
    page: 0,
    rowsPerPage: 10,
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'asc';

    if (this.state.orderBy === property && this.state.order === 'asc') {
      order = 'desc';
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
    const { data, actions, classes, columnData, title } = this.props;
    const { order, orderBy, selected, rowsPerPage, page } = this.state;

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
            <EnhancedTableBody parentProps={this.props} parentState={this.state} />
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{ 'aria-label': 'Previous Page' }}
          nextIconButtonProps={{ 'aria-label': 'Next Page' }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

EnhancedTable.defaultProps = {
  data: [],
};

EnhancedTable.propTypes = {
  actions: PropTypes.node,
  classes: PropTypes.object.isRequired, // MUI withStyles
  columnData: PropTypes.array.isRequired,
  data: PropTypes.array,
  defaults: PropTypes.shape({
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
  }),
  title: PropTypes.string.isRequired,
};

export default withRouter(withStyles(styles)(EnhancedTable));
