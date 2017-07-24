import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';

import CsuDialog from '../csu-app-template/CsuDialog';

class EditUserGroup extends Component {
  render() {
    const group = this.props.group;
    const deleteGroup = (
      <IconButton aria-label='Delete group'>
        <Icon>delete</Icon>
      </IconButton>
    );
    return (
      <CsuDialog
        open={this.props.open}
        onRequestClose={this.props.handleDialogToggle}
        dialogActions={deleteGroup}
        title='Edit User Group'
        >
        <div className='row'>
          <div className='col-md-6'>
            <TextField
              id='alias'
              label='Alias'
              defaultValue={group.alias}
              helperText='Human friendly version of name. This is what the user will see.'
              marginForm
              fullWidth
              />
          </div>
          <div className='col-md-6'>
            <TextField
              id='name'
              label='Name'
              defaultValue={group.name}
              helperText={<span>Value must be code friendly and follow <code>lowerCammelCase</code> conventions.</span>}
              marginForm
              fullWidth
              />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <TextField
              label='Description'
              defaultValue={group.description}
              rows='2'
              multiline
              marginForm
              fullWidth
              />
          </div>
        </div>
      </CsuDialog>
    );
  }
}

EditUserGroup.propTypes = {
  group: PropTypes.object.isRequired,
  handleDialogToggle: PropTypes.func.isRequired,
};

export default EditUserGroup;
