import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import moment from 'moment';
import Table from '../components/Table';
import Search from '../components/Table/Search';
import LinkedTableCell from '../components/Table/LinkedTableCell';
import TypeChip from './TypeChip';

function createData(type, title, message, timestamp, locationRegex, action) {
  return { id: timestamp, type, title, message, timestamp, locationRegex, action };
}
const demoData = [
  createData(
    'info',
    'Revised Human Subjects Regulations (Common Rule)',
    'The regulations that human subjects researchers must adhere to (referred to as the Common Rule Regulations) were established in 1991. In 2011, federal agencies began the long-awaited process to revise these regulations and, on January 18, 2017, the <a href="https://www.hhs.gov/ohrp/regulations-and-policy/regulations/finalized-revisions-common-rule/index.html">final revisions to the Common Rule</a> (Final Rule) were posted in the federal register. <strong>The effective and implementation dates have recently changed.</strong> As posted in the federal register on June 18, 2018, the revised final Common Rule is both effective and to be implemented on <strong>January 21, 2019</strong> with the option of implementing 3 burden-reducing provisions before January 21, 2019.',
    1528686040549,
    new RegExp('/ricro/irb/(?!revised-common-rule/)/g').toString(),
    {
      title: 'Learn More',
      location: 'https://vpr.colostate.edu/ricro/irb/revised-common-rule/',
    },
  ),
  createData(
    'danger',
    'Danger Alert Message',
    'The regulations that human subjectshere to (referred to as the Common Rule Regulations)',
    1529476050549,
    new RegExp('/ricro/irb/(?!revised-common-rule/)/g').toString(),
    {
      title: 'Learn More',
      location: 'https://vpr.colostate.edu/ricro/irb/revised-common-rule/',
    },
  ),
  createData(
    'warning',
    'Warning Alert Message 2',
    'The regulations that human subjectshere to (referred to as the Common Rule Regulations)',
    1529472050549,
    new RegExp('/ricro/irb/(?!revised-common-rule/)/g').toString(),
    {
      title: 'Learn More',
      location: 'https://vpr.colostate.edu/ricro/irb/revised-common-rule/',
    },
  ),
  createData(
    'success',
    'Success Alert Message',
    'The regulations that human subjectshere to (referred to as the Common Rule Regulations)',
    1429482050549,
    new RegExp('/ricro/irb/(?!revised-common-rule/)/g').toString(),
    {
      title: 'Learn More',
      location: 'https://vpr.colostate.edu/ricro/irb/revised-common-rule/',
    },
  ),
  createData(
    'warning',
    'Warning Alert Message',
    'The regulations that human subjectshere to (referred to as the Common Rule Regulations)',
    1521486050549,
    new RegExp('/ricro/irb//g').toString(),
    {
      title: 'Learn More',
      location: 'https://vpr.colostate.edu/ricro/irb/revised-common-rule/',
    },
  ),
];

const columnData = [
  { id: 'title', numeric: false, disablePadding: false, label: 'Title' },
  { id: 'type', numeric: false, disablePadding: false, label: 'Type' },
  { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
  { id: 'locationRegex', numeric: false, disablePadding: false, label: 'Location Regex' },
  { id: 'action', numeric: false, disablePadding: false, label: 'Action' },
  { id: 'actions', numeric: true, disablePadding: false, label: 'Actions' },
];

const tableRowFactory = row => {
  const to = `/alerts/edit/${row.timestamp}`;
  return (
    <React.Fragment>
      <LinkedTableCell to={to}>{row.title}</LinkedTableCell>
      <LinkedTableCell to={to}>
        <TypeChip type={row.type} />
      </LinkedTableCell>
      <LinkedTableCell>{moment(row.timestamp).format('dddd, MMMM Do, YYYY')}</LinkedTableCell>
      <LinkedTableCell to={to}>
        <code>{row.locationRegex}</code>
      </LinkedTableCell>
      <LinkedTableCell>{`[${row.action.title}](${row.action.location})`}</LinkedTableCell>
      <TableCell numeric>
        <IconButton component={Link} to={to}>
          <Icon>open_in_new</Icon>
        </IconButton>
      </TableCell>
    </React.Fragment>
  );
};

const styles = theme => ({
  button: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

class Alerts extends React.Component {
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
    const { classes } = this.props;
    const { data, sourceData } = this.state;

    return (
      <React.Fragment>
        <Table
          columnData={columnData}
          data={data || sourceData}
          defaults={{ order: 'desc', orderBy: 'title' }}
          rowFactory={tableRowFactory}
          title="Alerts"
          actions={
            <React.Fragment>
              <Search
                sourceData={sourceData}
                onUpdateData={this.handleUpdateData}
                searchKeys={['title', 'locationRegex']}
              />
              <Tooltip title="Add Alert">
                <IconButton
                  className={classes.button}
                  aria-label="Add Alert"
                  component={Link}
                  to="/alerts/new"
                >
                  <Icon>add</Icon>
                </IconButton>
              </Tooltip>
            </React.Fragment>
          }
        />
      </React.Fragment>
    );
  }
}

Alerts.propTypes = {
  classes: PropTypes.object.isRequired, // MUI withStyles
};

export default withStyles(styles)(Alerts);
