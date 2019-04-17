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
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  createTableSortLabel = (column, order, orderBy) => (
    <TableSortLabel
      active={orderBy === column.id}
      direction={order}
      onClick={!column.disableSort ? this.createSortHandler(column.id) : null}
    >
      {column.label}
    </TableSortLabel>
  );

  render() {
    const { columnData, order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          {columnData.map(column => {
            column.disableSort = column.disableSort || false;
            return (
              <HeaderCell
                key={column.id}
                sortDirection={orderBy === column.id && !column.disableSort ? order : false}
                {...column.tableCellProps}
              >
                {!column.disableSort ? (
                  <Tooltip title={`Sort by ${column.label}`} enterDelay={300}>
                    {this.createTableSortLabel(column, order, orderBy)}
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
  columnData: PropTypes.arrayOf(
    PropTypes.shape({
      disableSort: PropTypes.bool,
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      tableCellProps: PropTypes.object,
    }),
  ),
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default EnhancedTableHead;
