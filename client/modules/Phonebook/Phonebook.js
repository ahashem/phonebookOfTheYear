import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import ActionNew from 'material-ui/svg-icons/communication/contacts';
import ActionEdit from 'material-ui/svg-icons/editor/mode-edit';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import { FlatButton, RaisedButton } from 'material-ui';
import RemoveContactModal from '../../components/Modals/RemoveContactModal';
import ManageContactModal from '../../components/Modals/ManageContactModal';
// Actions
import {
  closeContactEditModal,
  closeRemoveContactModal,
  createContact,
  deleteContactById,
  fetchContactsList,
  CONTACT_MODAL_ADD_MODE,
  CONTACT_MODAL_EDIT_MODE,
  openContactEditModal,
  openRemoveContactModal,
  selectRow,
  setCurrentContact,
  updateContactById,
} from './PhonebookActions';
// Reducers
import {
  getCurrentContact,
  getIsContactEditModalOpen,
  getIsRemoveModalOpen,
  getContactModalMode,
  getContactsList,
  getSelectedRow,
} from './PhonebookReducer';
// Import Style
import styles from './Phonebook.css';

const tableStyles = {
  propContainer: {
    width: 200,
    overflow: 'hidden',
    margin: '20px auto 0',
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  },
};

class Phonebook extends Component {
  componentDidMount() {
    this.props.fetchContactsList();
  }

  handleRowSelection(selectedRow) {
    this.props.selectRow(selectedRow);
  }

  handleCreate(label) {
    this.props.openContactEditModal(CONTACT_MODAL_ADD_MODE);
  }

  handleUpdate(label) {
    this.props.openContactEditModal(CONTACT_MODAL_EDIT_MODE, label);
  }

  handleDelete(label) {
    this.props.setCurrentContact(label);
    this.props.openRemoveContactModal();
  }

  submitContact(currentContact) {
    const {
      contactModalMode,
      createContact,
      updateContactById,
      closeContactEditModal,
    } = this.props;
    if (contactModalMode === CONTACT_MODAL_ADD_MODE) {
      createContact(currentContact);
    } else if (contactModalMode === CONTACT_MODAL_EDIT_MODE) {
      updateContactById(currentContact.id, currentContact.label);
    }
    closeContactEditModal();
  }

  render() {
    const {
      contactsList,
      isRemoveModalOpen,
      isContactEditModalOpen,
      currentContact,
      setCurrentContact,
      closeRemoveContactModal,
      closeContactEditModal,
      deleteContactById,
    } = this.props;
    const tableRows = [];
    contactsList && contactsList.length > 0
      ? contactsList.map((label, index) => {
          tableRows.push(
            <TableRow key={index} selected={this.props.selectedRow === index}>
              <TableRowColumn>{index}</TableRowColumn>
              <TableRowColumn>{label.name}</TableRowColumn>
              <TableRowColumn>{label.phone}</TableRowColumn>
              <TableRowColumn>{label.email}</TableRowColumn>
              <TableRowColumn>
                <FlatButton
                  label="Edit"
                  labelPosition="after"
                  primary
                  icon={<ActionEdit />}
                  onClick={event => this.handleUpdate(label)}
                />
                <FlatButton
                  label="Delete"
                  labelPosition="after"
                  primary
                  icon={<ActionDelete />}
                  onClick={event => this.handleDelete(label)}
                />
              </TableRowColumn>
            </TableRow>
          );
        })
      : '';

    return (
      <div className="label-manager">
        <div className="page-head">
          <h1>Phonebook</h1>
          <RaisedButton
            label="New"
            labelPosition="after"
            primary
            icon={<ActionNew />}
            onClick={event => this.handleCreate()}
          />
        </div>
        <Table
          fixedHeader
          selectable
          onRowSelection={selectedRows =>
            this.handleRowSelection(selectedRows[0])}
        >
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>#</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Phone</TableHeaderColumn>
              <TableHeaderColumn>Email</TableHeaderColumn>
              <TableHeaderColumn />
            </TableRow>
          </TableHeader>
          <TableBody deselectOnClickaway showRowHover stripedRows>
            {tableRows}
          </TableBody>
        </Table>
        {isRemoveModalOpen && (
          <RemoveContactModal
            message={'Are you sure you want to delete this label?'}
            cancel={() => closeRemoveContactModal()}
            discard={event => {
              deleteContactById(currentContact._id);
              closeRemoveContactModal();
            }}
          />
        )}
        <ManageContactModal
          message={'Contact: '}
          cancel={() => closeContactEditModal()}
          open={isContactEditModalOpen}
          submit={() => this.submitContact(currentContact)}
          updateTextInput={updatedText =>
            setCurrentContact({ ...currentContact, label: updatedText })}
          textInput={currentContact || ''}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    contactsList: getContactsList(state),
    selectedRow: getSelectedRow(state),
    isRemoveModalOpen: getIsRemoveModalOpen(state),
    isContactEditModalOpen: getIsContactEditModalOpen(state),
    currentContact: getCurrentContact(state),
    contactModalMode: getContactModalMode(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchContactsList: () => dispatch(fetchContactsList()),
    createContact: contact => dispatch(createContact(label)),
    updateContactById: (labelId, updatedContact) =>
      dispatch(updateContactById(labelId, updatedContact)),
    deleteContactById: labelId => dispatch(deleteContactById(labelId)),
    selectRow: selectedRow => dispatch(selectRow(selectedRow)),
    openRemoveContactModal: contact => dispatch(openRemoveContactModal(label)),
    closeRemoveContactModal: () => dispatch(closeRemoveContactModal()),
    openContactEditModal: (mode, label) =>
      dispatch(openContactEditModal(mode, label)),
    closeContactEditModal: () => dispatch(closeContactEditModal()),
    setCurrentContact: contact => dispatch(setCurrentContact(label)),
  };
};

Phonebook.propTypes = {
  fetchContactsList: PropTypes.func,
  createContact: PropTypes.func,
  updateContactById: PropTypes.func,
  deleteContactById: PropTypes.func,
  contactsList: PropTypes.array,
  isRemoveModalOpen: PropTypes.bool,
  openRemoveContactModal: PropTypes.func,
  closeRemoveContactModal: PropTypes.func,
  openContactEditModal: PropTypes.func,
  closeContactEditModal: PropTypes.func,
  currentContact: PropTypes.object,
  setCurrentContact: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Phonebook);
