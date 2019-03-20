import { Collapse, IconButton, TableCell, TableRow, Tooltip } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import withStyles from '@material-ui/core/styles/withStyles';
import MdiDelete from 'mdi-material-ui/Delete';
import MdiUpload from 'mdi-material-ui/Upload';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Table from '../../../components/EnhancedTable';

const styles = theme => ({
  root: {
    margin: `${theme.typography.pxToRem(theme.spacing.unit * 4)} auto`,
    maxWidth: theme.breakpoints.values.lg,
  },
  errorStatus: {
    background: theme.palette.alerts.danger.main,
    color: theme.palette.alerts.danger.contrastText,
  },
  pendingStatus: {
    background: theme.palette.alerts.info.dark,
    color: theme.palette.alerts.info.contrastText,
  },
  successStatus: {
    background: theme.palette.alerts.success.dark,
    color: theme.palette.alerts.success.contrastText,
  },
  unknownStatus: {
    background: theme.palette.alerts.warning.main,
    color: theme.palette.alerts.warning.contrastText,
  },
});

const columnData = [
  { id: 'csuId', label: 'CSU ID' },
  { id: 'lastName', label: 'Last Name' },
  { id: 'firstName', label: 'First Name' },
  { id: 'actions', label: 'Actions', disableSort: true, tableCellProps: { align: 'right' } },
  { id: 'status', label: '', disableSort: true, tableCellProps: { padding: 'checkbox' } },
];
const searchKeys = columnData.filter(data => {
  return data.id !== 'actions' && data.id !== 'status' ? { id: data.id, label: data.label } : null;
});

class AddUserTable extends React.Component {
  handleRemoveRow = row => () => {
    this.tableRef.removeRow(row);
  };

  createStatus = ({ icon, label, type }) => {
    const { classes } = this.props;
    return (
      <Tooltip title={label} placement="left">
        <Avatar className={classes[`${type}Status`]}>{icon}</Avatar>
      </Tooltip>
    );
  };

  componentDidMount = () => {};

  render() {
    const { classes, data, onSubmitUser } = this.props;
    return (
      <Collapse className={classes.root} in={data.length > 0}>
        <Table
          ariaTableId="add-users-table"
          columnData={columnData}
          disableAdd
          disableReload
          onRef={ref => {
            this.tableRef = ref;
          }}
          orderBy="lastName"
          title="Users"
          searchKeys={searchKeys}
          staticData={data}
          uniqueDataKey="csuId"
        >
          {({ row, index }) => (
            <TableRow hover>
              <TableCell>{row.csuId.toString().replace(/(.{3})/g, '$1 ')}</TableCell>
              <TableCell>{row.lastName}</TableCell>
              <TableCell>{row.firstName}</TableCell>
              <TableCell align="right">
                <Tooltip title={`Remove ${row.firstName}`} placement="left">
                  <IconButton onClick={this.handleRemoveRow(row)}>
                    <MdiDelete />
                  </IconButton>
                </Tooltip>
                <Tooltip title={`Submit ${row.firstName}`} placement="right">
                  <IconButton onClick={onSubmitUser(index)}>
                    <MdiUpload />
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell align="center" padding="checkbox">
                {this.createStatus(row.status)}
              </TableCell>
            </TableRow>
          )}
        </Table>
      </Collapse>
    );
  }
}

AddUserTable.propTypes = {
  classes: PropTypes.object.isRequired, // MUI withStyles()
  data: PropTypes.array,
  onSubmitUser: PropTypes.func.isRequired,
};

AddUserTable.defaultProps = {
  data: [],
};

const mapStateToProps = state => ({ api: state.config.api });
export default connect(mapStateToProps)(withStyles(styles)(AddUserTable));
