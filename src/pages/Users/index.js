import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import { defaultProfileSvg } from 'colostate-ricro-ui';
import MdiAccountPlus from 'mdi-material-ui/AccountPlus';
import MdiOpenInApp from 'mdi-material-ui/OpenInApp';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Table from '../../components/EnhancedTable';
import LinkedTableCell from '../../components/Table/LinkedTableCell';

const columnData = [
  { id: 'displayName', label: 'Display Name' },
  { id: 'csuId', label: 'CSU ID', tableCellProps: { align: 'right' } },
  { id: 'eId', label: 'eID' },
  { id: 'lastName', label: 'Name' },
  { id: 'email', label: 'Email' },
  { id: 'lastActive', label: 'Last Active' },
  { id: 'actions', label: 'Actions', disableSort: true, tableCellProps: { align: 'center' } },
];
const searchKeys = [
  ...columnData.filter(data => {
    return !['actions', 'lastName'].includes(data.id) ? { id: data.id, label: data.label } : null;
  }),
  { id: 'firstName', label: 'First Name' },
  { id: 'lastName', label: 'Last Name' },
].sort((a, b) => (a.label < b.label ? -1 : 1));

const UserGroupTypes = ({ api, location }) => (
  <Table
    ariaTableId="user-table"
    columnData={columnData}
    endpoint="/nucleus/users/"
    orderBy="lastName"
    title="Users"
    searchKeys={searchKeys}
    uniqueDataKey="csuId"
    iconAdd={<MdiAccountPlus />}
  >
    {({ row }) => {
      const to = `${location.pathname}/edit/${row.csuId}`;
      return (
        <TableRow hover>
          <LinkedTableCell to={to}>
            <ListItem dense>
              <ListItemIcon>
                <Avatar src={row.profileImage ? api.host + row.profileImage : defaultProfileSvg} />
              </ListItemIcon>
              <ListItemText primary={row.displayName} />
            </ListItem>
          </LinkedTableCell>
          <LinkedTableCell to={to} align="right">
            {row.csuId}
          </LinkedTableCell>
          <LinkedTableCell to={to}>{row.eId}</LinkedTableCell>
          <LinkedTableCell to={to}>{`${row.lastName}, ${row.firstName}`}</LinkedTableCell>
          <LinkedTableCell to={to}>
            <a href={`mailto:${row.email}`}>{row.email}</a>
          </LinkedTableCell>
          <LinkedTableCell to={to}>
            {moment(row.lastActive).format('dddd, MMMM Do, YYYY')}
          </LinkedTableCell>
          <TableCell align="center">
            <Tooltip title={`View ${row.displayName}'s profile`}>
              <IconButton component={Link} to={to}>
                <MdiOpenInApp />
              </IconButton>
            </Tooltip>
          </TableCell>
        </TableRow>
      );
    }}
  </Table>
);

UserGroupTypes.propTypes = {
  api: PropTypes.object.isRequired, // redux state
  location: PropTypes.object.isRequired, // react-router withRouter()
};

const mapStateToProps = state => ({ api: state.config.api });

export default connect(mapStateToProps)(withRouter(UserGroupTypes));
