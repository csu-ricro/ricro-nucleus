import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import { ApiTable } from 'colostate-ricro-ui';
import MdiOpenInApp from 'mdi-material-ui/OpenInApp';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

const columnData = [
  { id: 'id', label: 'ID' },
  { id: 'alias', label: 'Alias' },
  { id: 'description', label: 'Description' },
  { id: 'userCount', label: 'Number of Users', tableCellProps: { align: 'right' } },
  { id: 'actions', label: 'Actions', disableSort: true, tableCellProps: { align: 'center' } },
];
const searchKeys = columnData.filter(data => {
  return data.id !== 'actions' ? { id: data.id, label: data.label } : null;
});

const UserGroupTypes = ({ location }) => (
  <ApiTable
    ariaTableId="user-group-types-table"
    columnData={columnData}
    disableAdd
    endpoint="/nucleus/groups/"
    orderBy={searchKeys[0].id}
    title="User Group Types"
    searchKeys={searchKeys}
  >
    {({ row }) => {
      const to = `${location.pathname}/edit/${row.id}`;
      return (
        <TableRow hover>
          <TableCell>{row.id}</TableCell>
          <TableCell>{row.alias}</TableCell>
          <TableCell>{row.description}</TableCell>
          <TableCell align="right">{row.userCount}</TableCell>
          <TableCell align="center">
            <Tooltip title={`View ${row.id}`}>
              <IconButton component={Link} to={to}>
                <MdiOpenInApp />
              </IconButton>
            </Tooltip>
          </TableCell>
        </TableRow>
      );
    }}
  </ApiTable>
);

UserGroupTypes.propTypes = {
  location: PropTypes.object.isRequired, // react-router withRouter()
};

export default withRouter(UserGroupTypes);
