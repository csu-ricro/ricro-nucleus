import { Collapse } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TablePagination from '@material-ui/core/TablePagination';
import _ from 'lodash';
import MdiFilter from 'mdi-material-ui/Filter';
import MdiPlusCircle from 'mdi-material-ui/PlusCircle';
import MdiReload from 'mdi-material-ui/Reload';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styles from './styles';
import EnhancedTableBody from './TableBody';
import EnhancedTableErrorLoading from './TableErrorLoading';
import EnhancedTableHead from './TableHead';
import EnhancedTableToolbar from './TableToolbar';

class EnhancedTable extends React.Component {
  state = {
    data: {
      search: [],
      source: [],
    },
    error: false,
    // eslint-disable-next-line react/no-unused-state
    isLoading: true,
    showLoading: false,
    hasDoneInitalLoad: false,
    order: this.props.order,
    orderBy: this.props.orderBy,
    pagination: {
      page: this.props.defaults.startPage || 0,
      rowsPerPage: this.props.defaults.rowsPerPage || 10,
    },
  };

  getData = () => this.state.data;

  removeRow = element => {
    this.setState(state => {
      const search = [...state.data.search];
      const source = [...state.data.source];
      search.splice(_.findIndex(search, element), 1);
      source.splice(_.findIndex(source, element), 1);
      return { data: { search, source } };
    });
  };

  exitLoading = (initalLoad, initalLoadTimeout) => {
    setTimeout(
      () =>
        this.setState({
          // eslint-disable-next-line react/no-unused-state
          isLoading: false,
          showLoading: false,
        }),
      800,
    );
    if (initalLoad) {
      clearTimeout(initalLoadTimeout);
      this.setState({ hasDoneInitalLoad: true });
    }
  };

  setData = ({ data, initalLoad, initalLoadTimeout }) => {
    const { title } = this.props;
    data = data || [];
    this.setState({
      data: {
        search: data,
        source: data,
      },
      error: data.length < 1 && {
        variant: 'info',
        message: `No ${title.charAt(title.length - 1) === 's' ? title : `${title}s`}`,
      },
    });
    this.exitLoading(initalLoad, initalLoadTimeout);
  };

  handleRequestSort = property => {
    const orderBy = property;
    let order = 'asc';

    if (this.state.orderBy === property && this.state.order === 'asc') {
      order = 'desc';
    }

    this.setState({ order, orderBy });
  };

  handleChangePage = (event, page) => {
    this.setState(state => ({
      pagination: {
        ...state.pagination,
        page,
      },
    }));
  };

  handleChangeRowsPerPage = event => {
    this.setState(state => ({
      pagination: {
        ...state.pagination,
        rowsPerPage: event.target.value,
      },
    }));
  };

  handleFetchData = (initalLoad = false) => () => {
    let initalLoadTimeout;
    if (initalLoad) {
      initalLoadTimeout = setTimeout(() => this.setState({ showLoading: true }), 1000);
    } else {
      this.setState({ showLoading: true });
    }
    const { endpoint } = this.props;
    // eslint-disable-next-line react/no-unused-state
    this.setState({ isLoading: true });
    this.props.api.axios
      .get(endpoint)
      .then(resp => {
        this.setData({
          data: resp.data.status === 'nodata' ? [] : resp.data.result,
          initalLoad,
          initalLoadTimeout,
        });
      })
      .catch(err => {
        this.setState({
          error: {
            variant: 'error',
            message: _.get(err, 'response.data.result', 'An error has occured. Please try again'),
          },
        });
        this.exitLoading(initalLoad, initalLoadTimeout);
      });
  };

  handleUpdateSearchData = searchData => {
    this.setState(state => ({
      data: {
        ...state.data,
        search: searchData,
      },
    }));
  };

  componentWillUnmount = () => {
    if (this.props.onRef) {
      this.props.onRef(this);
    }
  };

  componentDidMount = () => {
    if (this.props.onRef) {
      this.props.onRef(this);
    }
    if (this.props.endpoint) {
      this.handleFetchData(true)();
    } else if (this.props.staticData) {
      this.setData({ data: this.props.staticData, initalLoad: true });
    }
  };

  render() {
    const { ariaTableId, classes } = this.props;
    const { data, error, hasDoneInitalLoad, pagination, showLoading } = this.state;
    const enhancedTable = {
      rootData: this.state.data,
      rootFuncs: {
        onUpdateSearchData: this.handleUpdateSearchData,
        onFetchData: this.handleFetchData(),
      },
      rootProps: this.props,
      rootState: this.state,
    };

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar enhancedTable={enhancedTable} />
        <div className={classes.body}>
          <Collapse in={!error && hasDoneInitalLoad && !showLoading && data.search.length > 0}>
            <div className={classes.tableWrapper}>
              <Table className={classes.table} aria-labelledby={ariaTableId}>
                <EnhancedTableHead
                  onRequestSort={this.handleRequestSort}
                  enhancedTable={enhancedTable}
                />
                <EnhancedTableBody enhancedTable={enhancedTable} />
              </Table>
            </div>
            <TablePagination
              backIconButtonProps={{ 'aria-label': 'Previous Page' }}
              component="div"
              count={enhancedTable.rootData.search.length}
              nextIconButtonProps={{ 'aria-label': 'Next Page' }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
              {...pagination}
            />
          </Collapse>
          <EnhancedTableErrorLoading enhancedTable={enhancedTable} />
        </div>
      </Paper>
    );
  }
}

EnhancedTable.defaultProps = {
  staticData: false,
  defaults: {
    rowsPerPage: 10,
    startPage: 0,
  },
  disableAdd: false,
  disableFilter: false,
  disableReload: false,
  iconAdd: <MdiPlusCircle />,
  iconFilter: <MdiFilter />,
  iconReload: <MdiReload />,
  order: 'desc',
  uniqueDataKey: 'id',
};

EnhancedTable.propTypes = {
  api: PropTypes.object.isRequired, // redux state
  ariaTableId: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired, // MUI withStyles
  columnData: PropTypes.array.isRequired,
  defaults: PropTypes.shape({
    rowsPerPage: PropTypes.oneOf([10, 25, 50, 100]),
    startPage: PropTypes.number,
  }),
  disableAdd: PropTypes.bool,
  disableFilter: PropTypes.bool,
  disableReload: PropTypes.bool,
  endpoint: PropTypes.string,
  iconAdd: PropTypes.object,
  iconFilter: PropTypes.object,
  iconReload: PropTypes.object,
  onRef: PropTypes.func,
  order: PropTypes.string,
  orderBy: PropTypes.string.isRequired,
  staticData: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  title: PropTypes.string.isRequired,
  uniqueDataKey: PropTypes.string,
};

const mapStateToProps = state => ({ api: state.config.api });

export default connect(mapStateToProps)(withRouter(withStyles(styles)(EnhancedTable)));
