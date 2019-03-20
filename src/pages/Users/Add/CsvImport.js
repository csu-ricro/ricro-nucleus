import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import Portal from '@material-ui/core/Portal';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { IconSnackbarContent } from 'colostate-ricro-ui';
import parse from 'csv-parse';
import PropTypes from 'prop-types';
import React from 'react';

class CsvImport extends React.Component {
  state = {
    csv: '',
    error: false,
    snackbar: {
      isOpen: false,
      variant: 'default',
      message: '',
    },
  };

  handleImport = event => {
    const value = event.target.value;
    parse(
      value,
      { columns: ['csuId', 'firstName', 'lastName'], relax_column_count: true },
      (err, output) => {
        const time = new Date().getTime();
        output = output.map((user, i) => ({
          ...user,
          id: `import-${i}-${time}`,
        }));
        this.props.onAddUsers(output);
        this.setState({
          csv: '',
          snackbar: {
            isOpen: true,
            variant: 'default',
            message: 'Imported CSV data',
          },
        });
      },
    );
    this.setState({ csv: value });
  };

  handleCloseSnackbar = () => {
    this.setState(state => ({ snackbar: { ...state.snackbar, isOpen: false } }));
  };

  render() {
    const { hasSubmitted, isImportIn } = this.props;
    const { error, csv, snackbar } = this.state;
    return (
      <Collapse in={isImportIn && !hasSubmitted}>
        <Grid container justify="center">
          <Grid item xs={12} md={8}>
            <Typography variant="body1">
              Paste CSV data in the format <code>csuId, firstName, lastName</code>. Automaticly
              imports on paste.
            </Typography>
            <TextField
              fullWidth
              error={error}
              helperText={error ? 'CSV parsing failed' : null}
              id="csv-import-users"
              label="Users CSV"
              margin="normal"
              multiline
              onChange={this.handleImport}
              placeholder="csuId, firstName, lastName"
              rows={5}
              rowsMax="10"
              value={csv}
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Portal>
          <Snackbar
            open={snackbar.isOpen}
            autoHideDuration={6e3}
            onClose={this.handleCloseSnackbar}
          >
            <IconSnackbarContent variant={snackbar.variant} message={snackbar.message} />
          </Snackbar>
        </Portal>
      </Collapse>
    );
  }
}

CsvImport.propTypes = {
  hasSubmitted: PropTypes.bool.isRequired,
  isImportIn: PropTypes.bool.isRequired,
  onAddUsers: PropTypes.func.isRequired,
};

export default CsvImport;
