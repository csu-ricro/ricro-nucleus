import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import { HttpError, UserProfile } from 'colostate-ricro-ui';
import MdiKeyboardBackspace from 'mdi-material-ui/KeyboardBackspace';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import LoadingIndicator from '../../../components/LoadingIndicator';

class EditUser extends React.Component {
  state = {
    error: false,
    isLoading: true,
    user: {},
  };

  componentDidMount() {
    this.handleFetchData();
  }

  handleFetchData = (disableLoading = false) => {
    const { csuId } = this.props.match.params;

    if (!disableLoading) {
      this.setState({ isLoading: true });
    }

    this.props.api.axios
      .get('/nucleus/users/', { params: { csuId } })
      .then(resp => {
        this.setState({ user: resp.data.result[0], isLoading: false });
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
                      The user <code>{csuId}</code> does not exist. If you believe this to be an
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

  render() {
    const { error, isLoading, user } = this.state;

    if (error) return <HttpError code={error.code} subheader={error.message} />;
    if (isLoading) return <LoadingIndicator size={200} />;

    return (
      <React.Fragment>
        <Toolbar>
          <Tooltip title="Back to Users">
            <IconButton component={Link} to="/users">
              <MdiKeyboardBackspace />
            </IconButton>
          </Tooltip>
        </Toolbar>
        <UserProfile user={user} />
      </React.Fragment>
    );
  }
}

EditUser.propTypes = {
  api: PropTypes.object.isRequired, // redux state
  match: PropTypes.shape({
    params: PropTypes.shape({
      csuId: PropTypes.string.isRequired, // react-router withRouter()
    }),
  }),
};

const mapStateToProps = state => ({ api: state.config.api });
export default connect(mapStateToProps)(withRouter(EditUser));
