import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { TextField } from 'redux-form-material-ui';

const ManageContactModal = (props, context) => {
  const {
    message,
    submit,
    cancel,
    open,
    contactInput,
    updateContactInput,
  } = props;
  const actions = [
    <FlatButton
      label="Ok"
      primary
      keyboardFocused
      disabled={!contactInput}
      onClick={() => submit()}
    />,
    <FlatButton label="Cancel" primary onClick={() => cancel()} />,
  ];
  const menuItems = [];
  return (
    <div>
      <Dialog
        actions={actions}
        modal={false}
        open={open}
        onRequestClose={() => cancel()}
      >
        <div>{message}</div>
        <div>
          <TextField
            name="contactName"
            floatingLabelText="Name"
            floatingLabelFixed
            hintText="Name"
            value={contactInput.name || ''}
            onChange={(event, newValue) => updateContactInput('name', newValue)}
          />
        </div>
        <div>
          <TextField
            name="contactPhone"
            floatingLabelText="Phone"
            floatingLabelFixed
            hintText="Phone"
            value={contactInput.phone || ''}
            onChange={(event, newValue) => updateContactInput('phone', newValue)}
          />
        </div>
        <div>
          <TextField
            name="contactEmail"
            floatingLabelText="Email"
            floatingLabelFixed
            hintText="Email"
            value={contactInput.email || ''}
            onChange={(event, newValue) => updateContactInput('email', newValue)}
          />
        </div>
      </Dialog>
    </div>
  );
};

ManageContactModal.propTypes = {
  message: PropTypes.string.isRequired,
  cancel: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  contactInput: PropTypes.object.isRequired,
  updateContactInput: PropTypes.func.isRequired,
};

export default ManageContactModal;
