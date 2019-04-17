import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import classNames from 'classnames';
import MdiAccountCheck from 'mdi-material-ui/AccountCheck';
import MdiAccountQuestion from 'mdi-material-ui/AccountQuestion';
import MdiAccountRemove from 'mdi-material-ui/AccountRemove';
import MdiDelete from 'mdi-material-ui/Delete';
import MdiProgressUpload from 'mdi-material-ui/ProgressUpload';
import PropTypes from 'prop-types';
import React from 'react';

const status = {
  error: {
    type: 'error',
    icon: <MdiAccountRemove />,
    label: 'CSU ID already exists',
  },
  pending: {
    type: 'pending',
    icon: <MdiProgressUpload />,
    label: 'Pending upload',
  },
  success: {
    type: 'success',
    icon: <MdiAccountCheck />,
    label: 'User has been added',
  },
  unknown: {
    type: 'unknown',
    icon: <MdiAccountQuestion />,
    label: 'An uknown error occured',
  },
};

const styles = theme => ({
  deleteContainer: { display: 'flex', justifyContent: 'center' },
  gridItem: {
    [theme.breakpoints.up('md')]: {
      padding: theme.typography.pxToRem(theme.spacing.unit * 2),
    },
  },
  userContainer: { margin: `${theme.typography.pxToRem(theme.spacing.unit)} 0` },
  errorStatus: { color: `${theme.palette.alerts.danger.main} !important` },
  pendingStatus: { color: `${theme.palette.alerts.warning.main} !important` },
  successStatus: { color: `${theme.palette.alerts.success.main} !important` },
  unknownStatus: { color: `${theme.palette.alerts.danger.main} !important` },
});

const textFields = [
  {
    id: 'csuId',
    helperText: 'Must be a 9 digit CSU ID',
    label: 'CSU ID',
    props: { type: 'number' },
    size: 3,
  },
  { id: 'firstName', label: 'First Name', size: 4 },
  { id: 'lastName', label: 'Last Name', size: 4 },
];

const AddUser = props => {
  const { classes, newUsers, onChangeUserField, onRemoveRow } = props;

  return newUsers.map((user, i) => (
    <Collapse in key={user.id}>
      <Divider />
      <Grid container alignItems="center" alignContent="center">
        {textFields.map(field => {
          const hasError = Array.isArray(user.error) ? user.error.includes(field.id) : false;
          return (
            <Grid key={field.id} className={classes.gridItem} item xs={12} md={field.size}>
              <TextField
                autoFocus={newUsers.length === 1 && field.id === 'csuId'}
                className={classes.textField}
                disabled={user.status != null}
                error={hasError}
                fullWidth
                helperText={hasError ? field.helperText || 'This field is required' : null}
                id={`${field.id}-${i}`}
                label={field.label}
                margin="normal"
                onChange={onChangeUserField(i, field.id)}
                required
                value={user[field.id]}
                variant="outlined"
                {...field.props}
              />
            </Grid>
          );
        })}
        <Grid className={classNames(classes.gridItem, classes.deleteContainer)} item xs={12} md={1}>
          <Tooltip title={user.status ? status[user.status].label : 'Delete row'} placement="left">
            <div>
              <IconButton
                className={classNames(user.status && classes[`${user.status}Status`])}
                disabled={user.status != null}
                onClick={onRemoveRow(i)}
              >
                {user.status ? status[user.status].icon : <MdiDelete />}
              </IconButton>
            </div>
          </Tooltip>
        </Grid>
      </Grid>
    </Collapse>
  ));
};

AddUser.propTypes = {
  classes: PropTypes.object.isRequired, // MUI withStyles()
  newUsers: PropTypes.array.isRequired,
  onChangeUserField: PropTypes.func.isRequired,
  onRemoveRow: PropTypes.func.isRequired,
};

export default withStyles(styles)(AddUser);
