import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import withStyles from '@material-ui/core/styles/withStyles';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { HttpError, LoadingIndicator } from 'colostate-ricro-ui';
import MdiKeyboardBackspace from 'mdi-material-ui/KeyboardBackspace';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import UsersList from './UsersList';

const styles = theme => ({
  gridContainer: {
    '& > div': {
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing.unit * 2,
      },
    },
  },
});

class EditUserGroupType extends React.Component {
  state = {
    error: false,
    isLoading: true,
    groupType: {},
  };

  componentDidMount() {
    this.handleFetchData();
  }

  handleFetchData = (disableLoading = false) => {
    const { id } = this.props.match.params;

    if (!disableLoading) {
      this.setState({ isLoading: true });
    }

    this.props.api.axios
      .get('/nucleus/groups/', { params: { id } })
      .then(resp => {
        this.setState({ groupType: resp.data.result[0], isLoading: false });
      })
      .catch(err => {
        this.setState({
          error:
            err.response.status === 401
              ? { code: 401 }
              : {
                  code: 404,
                  message: (
                    <React.Fragment>
                      The group type <code>{id}</code> does not exist. If you believe this to be an
                      error please contact us.
                    </React.Fragment>
                  ),
                },
          isLoading: false,
        });
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

  // eslint-disable-next-line max-lines-per-function
  render() {
    const { classes } = this.props;
    const { error, isLoading, groupType } = this.state;

    if (error) return <HttpError code={error.code} subheader={error.message} />;
    if (isLoading) return <LoadingIndicator size={200} />;

    return (
      <React.Fragment>
        <Toolbar disableGutters>
          <Tooltip title="Back to Users">
            <IconButton component={Link} to="/users">
              <MdiKeyboardBackspace />
            </IconButton>
          </Tooltip>
          <Typography variant="h4">User Group Type</Typography>
        </Toolbar>
        <Divider />
        <Grid className={classes.gridContainer} container justify="space-around">
          <Grid item xs={12} md={4}>
            <List>
              <ListItem>
                <ListItemText primary={groupType.id} secondary="ID" />
              </ListItem>
              <ListItem>
                <ListItemText primary={groupType.alias} secondary="Alias" />
              </ListItem>
              <ListItem>
                <ListItemText primary={groupType.description} secondary="Description" />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            {/* eslint-disable-next-line react/jsx-handler-names */}
            <UsersList groupType={groupType} updateGroupType={this.handleFetchData} />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

EditUserGroupType.propTypes = {
  api: PropTypes.object.isRequired, // redux state
  classes: PropTypes.object.isRequired, // MUI withStyles()
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired, // react-router withRouter()
    }),
  }),
};

const mapStateToProps = state => ({ api: state.config.api });
export default connect(mapStateToProps)(withStyles(styles)(withRouter(EditUserGroupType)));
