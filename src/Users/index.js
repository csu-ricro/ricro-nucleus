import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TableCell from '@material-ui/core/TableCell';
import moment from 'moment';
import Table from '../components/Table';
import Search from '../components/Table/Search';
import LinkedTableCell from '../components/Table/LinkedTableCell';

function createData(csuId, eId, firstName, lastName, displayName, email, profileImg, lastActive) {
  return { id: csuId, csuId, eId, firstName, lastName, displayName, email, profileImg, lastActive };
}
const demoData = [
  createData(
    830126214,
    'dlennox',
    'Daniel',
    'Lennox',
    'Daniel Lennox',
    'daniel.lennox@colostate.edu',
    'https://services.ricro.colostate.edu/_static/img/default-profile.png',
    '2018-06-21 14:37:56',
  ),
  createData(
    830126215,
    'acc2',
    'Account',
    'Two',
    'Account Two',
    'account.two@colostate.edu',
    'https://services.ricro.colostate.edu/_static/img/default-profile.png',
    '2018-06-21 14:37:56',
  ),
  createData(
    830126216,
    'other3',
    'Other',
    'Name',
    'Other Name',
    'ohter.name@colostate.edu',
    'https://services.ricro.colostate.edu/_static/img/default-profile.png',
    '2018-06-21 14:37:56',
  ),
];

const columnData = [
  { id: 'displayName', numeric: false, disablePadding: false, label: 'Display Name' },
  { id: 'csuId', numeric: true, disablePadding: false, label: 'CSU ID' },
  { id: 'eId', numeric: false, disablePadding: false, label: 'eID' },
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
  { id: 'lastActive', numeric: false, disablePadding: false, label: 'Last Active' },
  { id: 'actions', numeric: true, disablePadding: false, label: 'Actions' },
];

const tableRowFactory = row => {
  const to = `/users/edit/${row.csuId}`;
  return (
    <React.Fragment>
      <LinkedTableCell to={to}>
        <ListItem dense>
          <ListItemIcon>
            <Avatar src={row.profileImg} />
          </ListItemIcon>
          <ListItemText primary={row.displayName} />
        </ListItem>
      </LinkedTableCell>
      <LinkedTableCell to={to} numeric>
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
      <TableCell numeric>
        <IconButton component={Link} to={to}>
          <Icon>open_in_new</Icon>
        </IconButton>
      </TableCell>
    </React.Fragment>
  );
};

class Users extends React.Component {
  state = {
    sourceData: demoData,
    data: undefined,
  };

  handleUpdateData = data => {
    this.setState({
      data,
    });
  };

  render() {
    const { data, sourceData } = this.state;

    return (
      <React.Fragment>
        <Table
          columnData={columnData}
          data={data || sourceData}
          defaults={{ order: 'asc', orderBy: 'csuId' }}
          rowFactory={tableRowFactory}
          title="Users"
          actions={
            <Search
              sourceData={sourceData}
              onUpdateData={this.handleUpdateData}
              searchKeys={['csuId', 'eId', 'firstName', 'lastName', 'displayName', 'email']}
            />
          }
        />
      </React.Fragment>
    );
  }
}

Users.propTypes = {
  // classes: PropTypes.object.isRequired, // MUI withStyles
};

export default Users;
