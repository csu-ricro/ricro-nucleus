import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';
import { DateTimePicker } from 'material-ui-pickers';

const alertMenuItem = {
  borderLeft: '8px solid',
};

const styles = theme => ({
  alertDanger: {
    ...alertMenuItem,
    borderColor: theme.palette.alerts.danger,
  },
  alertInfo: {
    ...alertMenuItem,
    borderColor: theme.palette.alerts.info,
  },
  alertSuccess: {
    ...alertMenuItem,
    borderColor: theme.palette.alerts.success,
  },
  alertWarning: {
    ...alertMenuItem,
    borderColor: theme.palette.alerts.warning,
  },
  alerTypeContainer: {
    // ...alertMenuItem,
    transition: 'border-color ease 0.5s',
    paddingLeft: theme.spacing.unit / 2,
  },
});

const alertTypes = ['warning', 'info', 'danger', 'success'];

class ModifyAlert extends React.Component {
  state = {
    alertType: 'info',
    date: new Date(),
    hasAction: false,
  };

  handleUpdateState = key => event => {
    // debugger //eslint-disable-line
    const stateKey = key != null ? key : event.currentTarget.getAttribute('data-statekey');
    let value = event;
    if (event.target != null) {
      value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    }

    this.setState({
      [stateKey]: value,
    });
  };

  render() {
    const { alertId, classes } = this.props;
    const { alertType, date, hasAction } = this.state;
    return (
      <React.Fragment>
        <div className="row justify-content-center">
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-8">
                <TextField id="helperText" label="Title" margin="normal" fullWidth />
              </div>
              <div className="col-md-4">
                <TextField
                  id="helperText"
                  label="ID"
                  value={alertId || new Date().valueOf()}
                  helperText="Some important text"
                  margin="normal"
                  fullWidth
                  disabled
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <TextField
                  id="helperText"
                  label="Message"
                  margin="normal"
                  helperText="Plaintext or HTML string"
                  rows="5"
                  fullWidth
                  multiline
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div
                  className={classNames(
                    classes.alerTypeContainer,
                    classes[`alert${alertType.charAt(0).toUpperCase() + alertType.slice(1)}`],
                  )}
                >
                  <TextField
                    id="alertType"
                    select
                    label="Alert Type"
                    value={alertType}
                    onChange={this.handleUpdateState()}
                    margin="normal"
                    fullWidth
                  >
                    {alertTypes.map(type => (
                      <MenuItem
                        key={type}
                        value={type}
                        data-statekey="alertType"
                        className={classes[`alert${type.charAt(0).toUpperCase() + type.slice(1)}`]}
                      >
                        {type}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </div>
              <div className="col-md-4">
                <DateTimePicker
                  value={date}
                  onChange={this.handleUpdateState('date')}
                  label="Date"
                  data-statekey="date"
                  helperText="Initial date of the announcement"
                  margin="normal"
                  disableFuture
                  showTodayButton
                  fullWidth
                />
              </div>
              <div className="col-md-4">
                <TextField
                  id="helperText"
                  label="Location Regex"
                  placeholder="/\/ricro\/irb\/(?!revised-common-rule\/)/g"
                  helperText="A regular expression to define where this alert will be displayed"
                  margin="normal"
                  fullWidth
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hasAction}
                        onChange={this.handleUpdateState()}
                        inputProps={{ 'data-statekey': 'hasAction' }}
                      />
                    }
                    label="Has Action Button"
                  />
                </FormGroup>
                <Collapse in={hasAction} timeout="auto">
                  <div className="row">
                    <div className="col-md-6">
                      <TextField
                        id="actionLabel"
                        label="Label"
                        placeholder="Learn More"
                        margin="normal"
                        fullWidth
                      />
                    </div>
                    <div className="col-md-6">
                      <TextField
                        id="actionLocation"
                        label="Location"
                        placeholder="https://vpr.colostate.edu/ricro/some-page"
                        helperText="Fully qualified URL"
                        margin="normal"
                        fullWidth
                      />
                    </div>
                  </div>
                </Collapse>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

ModifyAlert.propTypes = {
  alertId: PropTypes.string,
  classes: PropTypes.object.isRequired, // MUI withStyles
};

export default withStyles(styles)(ModifyAlert);
