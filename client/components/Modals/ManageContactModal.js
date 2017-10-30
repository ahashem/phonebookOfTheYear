import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { TextField } from 'redux-form-material-ui';

const ManageContactModal = (props, context) => {
  const { message, submit, cancel, open, textInput, updateTextInput } = props;
  const actions = [
    <FlatButton
      label="Ok"
      primary
      keyboardFocused
      disabled={!textInput}
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
        {message}
        <TextField
          name="Contact Text"
          hintText="Contact"
          value={textInput}
          onChange={(event, newValue) => updateTextInput(newValue)}
        />
      </Dialog>
    </div>
  );
};

ManageContactModal.propTypes = {
  message: PropTypes.string.isRequired,
  cancel: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  textInput: PropTypes.string.isRequired,
  updateTextInput: PropTypes.func.isRequired,
};

export default ManageContactModal;
