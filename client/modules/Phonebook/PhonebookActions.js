import callApi from '../../util/apiCaller';
import { startLoading, loadComplete } from '../App/AppActions';

// Export Constants
export const SET_CONTACTS_LIST = 'SET_CONTACTS_LIST';
export const SET_SELECTED_ROW = 'SET_SELECTED_ROW';

export const OPEN_REMOVE_CONTACT_MODAL = 'OPEN_REMOVE_CONTACT_MODAL';
export const CLOSE_REMOVE_CONTACT_MODAL = 'CLOSE_REMOVE_CONTACT_MODAL';

export const OPEN_CONTACT_EDIT_MODAL = 'OPEN_CONTACT_EDIT_MODAL';
export const CLOSE_CONTACT_EDIT_MODAL = 'CLOSE_CONTACT_EDIT_MODAL';
export const SET_CURRENT_CONTACT = 'SET_CURRENT_CONTACT';
export const CONTACT_MODAL_ADD_MODE = 'CONTACT_MODAL_ADD_MODE';
export const CONTACT_MODAL_EDIT_MODE = 'CONTACT_MODAL_EDIT_MODE';

// Export Actions
export const fetchContactsList = () => {
  return dispatch => {
    return callApi(`contacts`, 'get')
      .then(res => {
        dispatch(setContactsList(res.contacts));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const createContact = contact => {
  return dispatch => {
    dispatch(startLoading());
    return callApi(`contacts/new`, 'post', { contact })
      .then(res => {
        dispatch(fetchContactsList());
        dispatch(loadComplete());
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const updateContactById = (labelId, updatedContact) => {
  return dispatch => {
    return callApi(`contacts/${labelId}`, 'post', { label: updatedContact })
      .then(res => {
        dispatch(fetchContactsList());
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const deleteContactById = labelId => {
  return dispatch => {
    return callApi(`contacts/${labelId}`, 'delete')
      .then(res => {
        dispatch(fetchContactsList());
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const setContactsList = contacts => {
  return {
    type: SET_CONTACTS_LIST,
    contacts,
  };
};

export const selectRow = selectedRow => {
  return {
    type: SET_SELECTED_ROW,
    selectedRow,
  };
};

export function openRemoveContactModal(label) {
  return {
    type: OPEN_REMOVE_CONTACT_MODAL,
  };
}

export function closeRemoveContactModal() {
  return {
    type: CLOSE_REMOVE_CONTACT_MODAL,
  };
}

export function setCurrentContact(label) {
  return {
    type: SET_CURRENT_CONTACT,
    label,
  };
}

export function openContactEditModal(modalMode, label) {
  return {
    type: OPEN_CONTACT_EDIT_MODAL,
    label,
    modalMode,
  };
}

export function closeContactEditModal() {
  return {
    type: CLOSE_CONTACT_EDIT_MODAL,
  };
}
