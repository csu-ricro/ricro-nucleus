import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
});

class ModifyUserGroupType extends React.Component {
  state = {
    name: this.props.userGroupTypeId || '',
    alias: '',
    description: '',
  };

  handleUpdateState = key => event => {
    const stateKey = key != null ? key : event.currentTarget.getAttribute('data-statekey');
    let value = event;
    if (event.target != null) {
      value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    }
    // debugger //eslint-disable-line

    this.setState({
      [stateKey]: value,
    });
  };

  render() {
    const { classes } = this.props;
    const { name, alias, description } = this.state;
    return (
      <React.Fragment>
        <div className="row justify-content-center">
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-6">
                <TextField
                  label="Name"
                  helperText="Use lowerCamelCase"
                  margin="normal"
                  value={name}
                  inputProps={{
                    'data-statekey': 'name',
                  }}
                  onChange={this.handleUpdateState()}
                  fullWidth
                />
              </div>
              <div className="col-md-6">
                <TextField
                  label="Alias"
                  helperText="This will be name displayed in the applicaitons"
                  margin="normal"
                  value={alias}
                  inputProps={{
                    'data-statekey': 'alias',
                  }}
                  onChange={this.handleUpdateState()}
                  fullWidth
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <TextField
                  id="helperText"
                  label="Description"
                  margin="normal"
                  value={description}
                  inputProps={{
                    'data-statekey': 'description',
                  }}
                  onChange={this.handleUpdateState()}
                  rows="5"
                  fullWidth
                  multiline
                />
              </div>
            </div>
            <Button variant="contained" color="primary">
              <Icon className={classes.leftIcon}>save</Icon>
              Save
            </Button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

ModifyUserGroupType.propTypes = {
  classes: PropTypes.object.isRequired, // MUI withStyles
  userGroupTypeId: PropTypes.string,
};

export default withStyles(styles)(ModifyUserGroupType);
