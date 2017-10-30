import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const RemoveContactModal = (props, context) => {
  const { message, cancel, discard } = props;
  const actions = [
    <FlatButton label="Cancel" primary onClick={() => cancel()} />,
    <FlatButton label="Ok, Delete" primary onClick={() => discard()} />,
  ];
  return (
    <div>
      <Dialog
        actions={actions}
        modal={false}
        open
        onRequestClose={() => cancel()}
      >
        {message}
      </Dialog>
    </div>
  );
};

RemoveContactModal.propTypes = {
  message: PropTypes.string,
  cancel: PropTypes.func,
  discard: PropTypes.func,
};

export default RemoveContactModal;
