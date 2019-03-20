import withStyles from '@material-ui/core/styles/withStyles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import React from 'react';

const HeaderCell = withStyles(() => ({ head: { fontSize: '1rem' } }))(TableCell);

class EnhancedTableHead extends React.Component {
  createSortHandler = property => () => {
    this.props.onRequestSort(property);
  };

  render() {
    const { order, orderBy } = this.props.enhancedTable.rootState;
    const { columnData } = this.props.enhancedTable.rootProps;

    return (
      <TableHead>
        <TableRow>
          {columnData.map(column => {
            column.disableSort = column.disableSort || false;
            return (
              <HeaderCell
                {...column.tableCellProps}
                key={column.id}
                sortDirection={orderBy === column.id && !column.disableSort ? order : false}
              >
                {!column.disableSort ? (
                  <Tooltip title={`Sort by ${column.label}`} enterDelay={300}>
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={order}
                      onClick={!column.disableSort ? this.createSortHandler(column.id) : null}
                    >
                      {column.label}
                    </TableSortLabel>
                  </Tooltip>
                ) : (
                  column.label
                )}
              </HeaderCell>
            );
          })}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  enhancedTable: PropTypes.shape({
    rootProps: PropTypes.shape({
      columnData: PropTypes.arrayOf(
        PropTypes.shape({
          disableSort: PropTypes.bool,
          id: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
          tableCellProps: PropTypes.object,
        }),
      ),
    }),
    rootState: PropTypes.shape({
      order: PropTypes.string.isRequired,
      orderBy: PropTypes.string.isRequired,
    }),
  }),
  onRequestSort: PropTypes.func.isRequired,
};

export default EnhancedTableHead;
