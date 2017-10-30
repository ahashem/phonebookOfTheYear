import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const ContactModal = (props, context) => {
  const {
    message,
    submit,
    cancel,
    open,
    textInput,
    updateTextInput,
    contactsList,
  } = props;
  const actions = [
    <FlatButton label="Ok" primary keyboardFocused onClick={() => submit()} />,
  ];
  const menuItems = [];
  contactsList && contactsList.length > 0
    ? contactsList.map((item, i) => {
        menuItems.push(
          <MenuItem key={i} value={item.label} primaryText={item.label} />
        );
      })
    : '';
  return (
    <div>
      <Dialog
        actions={actions}
        modal={false}
        open={open}
        onRequestClose={() => cancel()}
      >
        {message}
        <DropDownMenu
          name="Contacts selector"
          value={textInput}
          onChange={(event, index, newValue) => updateTextInput(newValue)}
          openImmediately={true}
        >
          {menuItems}
        </DropDownMenu>
        {/*<TextField
          name="Contact Text"
          hintText="Contact"
          value={textInput}
          onChange={(event, newValue) => updateTextInput(newValue)}
        />*/}
      </Dialog>
    </div>
  );
};

ContactModal.propTypes = {
  message: PropTypes.string.isRequired,
  cancel: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  textInput: PropTypes.string.isRequired,
  updateTextInput: PropTypes.func.isRequired,
  contactsList: PropTypes.array.isRequired,
};

export default ContactModal;
