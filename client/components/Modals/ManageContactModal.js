import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {TextField} from 'redux-form-material-ui';
import {ValidatorForm} from 'react-form-validator-core';
import {TextValidator} from 'react-material-ui-form-validator';

class ManageContactModal extends React.PureComponent {

  constructor(props) {
    super(props);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleBlur(event) {
    this.refs[event.target.name].validate(event.target.value);
  }

  render() {
    const {
      message,
      submit,
      cancel,
      open,
      contactInput,
      updateContactInput,
    } = this.props;

    const actions = [
      <FlatButton
        label="Ok"
        primary
        keyboardFocused
        disabled={!contactInput}
        onClick={() => submit()}
      />,
      <FlatButton label="Cancel" primary onClick={() => cancel()}/>,
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
          <ValidatorForm
            instantValidate={false}
            onSubmit={this.props.submit}
          >
            <div>
              <TextValidator
                ref="contactName"
                name="contactName"
                floatingLabelText="Name"
                floatingLabelFixed
                hintText="Name"
                validators={['required']}
                errorMessages={['Name field is required']}
                value={contactInput.name}
                onBlur={this.handleBlur}
                onChange={(event, newValue) => updateContactInput('name', newValue)}
              />
            </div>
            <div>
              <TextValidator
                ref="contactPhone"
                name="contactPhone"
                floatingLabelText="Phone"
                floatingLabelFixed
                hintText="Phone"
                validators={['required']}
                errorMessages={['Phone field is required']}
                value={contactInput.phone}
                onBlur={this.handleBlur}
                onChange={(event, newValue) => updateContactInput('phone', newValue)}
              />
            </div>
            <div>
              <TextValidator
                ref="contactEmail"
                name="contactEmail"
                floatingLabelText="Email"
                floatingLabelFixed
                hintText="Email"
                validators={['required', 'isEmail']}
                errorMessages={['Email field is required', 'Email is not valid']}
                value={contactInput.email}
                onBlur={this.handleBlur}
                onChange={(event, newValue) => updateContactInput('email', newValue)}
              />
            </div>
          </ValidatorForm>
        </Dialog>
      </div>
    );
  }
}

ManageContactModal.propTypes = {
  message: PropTypes.string.isRequired,
  cancel: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  contactInput: PropTypes.object.isRequired,
  updateContactInput: PropTypes.func.isRequired,
};

export default ManageContactModal;
