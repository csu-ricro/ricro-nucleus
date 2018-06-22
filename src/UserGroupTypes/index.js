import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import Table from '../Table';
import Search from '../Table/Search';

let counter = 0;
function createData(name, alias, numberUsers, description) {
  counter += 1;
  return { id: counter, name, alias, numberUsers, description };
}
const demoData = [
  createData('appsAdmin', 'Apps Admin', 1, 'Admins have full control over all other users'),
  createData('dev', 'Developer', 2, 'Developers have unrestricted access'),
  createData('excon', 'ExCon', 3, 'Export Control'),
  createData('iacuc', 'IACUC', 4, 'Institutional Animal Care and Use Committee'),
  createData('ibc', 'IBC', 5, 'Institutional Biosafety Committee'),
  createData('irb', 'IRB', 6, 'Institutional Review Board'),
  createData('osp', 'OSP', 7, 'Office of Sponsored Programs'),
  createData(
    'protocolStatus',
    'Protocol Status User',
    5,
    'Users can view, create, and update the requests in the Protocol Status app',
  ),
  createData(
    'protocolStatus-notifyExcon',
    'Protocol Status ExCon Notifications',
    6,
    'Users are notified of new requests that contain ExCon related information',
  ),
  createData(
    'protocolStatus-notifyIacuc',
    'Protocol Status IACUC Notifications',
    7,
    'Users are notified of new requests that contain IACUC related information',
  ),
  createData(
    'protocolStatus-notifyIbc',
    'Protocol Status IBC Notifications',
    8,
    'Users are notified of new requests that contain IBC related information',
  ),
  createData(
    'protocolStatus-notifyIrb',
    'Protocol Status IRB Notifications',
    9,
    'Users are notified of new requests that contain IRB related information',
  ),
  createData(
    'protocolStatus-notifyQa',
    'Protocol Status QA Notifications',
    10,
    'Users are notified of new requests that contain QA related information',
  ),
  createData('qa', 'QA', 8, 'Quality Assurance'),
  createData('rcr', 'RCR', 9, 'Responsible Conduct of Research'),
];
// data = [];

const columnData = [
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'alias', numeric: false, disablePadding: false, label: 'Alias' },
  { id: 'numberUsers', numeric: true, disablePadding: false, label: 'Number of Users' },
  { id: 'description', numeric: false, disablePadding: false, label: 'Description' },
  { id: 'actions', numeric: true, disablePadding: false, label: 'Actions' },
];

const tableRowFactory = row => (
  <React.Fragment>
    <TableCell component="th" scope="row">
      {row.name}
    </TableCell>
    <TableCell>{row.alias}</TableCell>
    <TableCell numeric>{row.numberUsers}</TableCell>
    <TableCell>{row.description}</TableCell>
    <TableCell numeric>
      <IconButton component={Link} to={`/type/user-groups/edit/${row.name}`}>
        <Icon>open_in_new</Icon>
      </IconButton>
    </TableCell>
  </React.Fragment>
);

class UserGroupTypes extends React.Component {
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
          defaults={{ order: 'asc', orderBy: 'alias' }}
          rowFactory={tableRowFactory}
          title="User Group Types"
          actions={
            <Search
              sourceData={sourceData}
              onUpdateData={this.handleUpdateData}
              searchKeys={['name', 'alias', 'description']}
            />
          }
        />
      </React.Fragment>
    );
  }
}

UserGroupTypes.propTypes = {};

export default UserGroupTypes;
