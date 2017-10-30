// Import Actions
import {
  CLOSE_CONTACT_EDIT_MODAL,
  CLOSE_REMOVE_CONTACT_MODAL,
  CONTACT_MODAL_ADD_MODE,
  OPEN_CONTACT_EDIT_MODAL,
  OPEN_REMOVE_CONTACT_MODAL,
  SET_CURRENT_CONTACT,
  SET_CONTACTS_LIST,
  SET_SELECTED_ROW,
} from './PhonebookActions';
import ContactManager from './Phonebook';

// Initial State
const initialState = {
  contactsList: [],
  selectedRow: null,
  isRemoveModalOpen: false,
  isContactEditModalOpen: false,
  currentContact: {},
  contactModalMode: CONTACT_MODAL_ADD_MODE,
};

const ACTION_HANDLERS = {
  [SET_CONTACTS_LIST]: (state, action) => {
    return {
      ...state,
      contactsList: action.contacts,
    };
  },
  [SET_SELECTED_ROW]: (state, action) => {
    return {
      ...state,
      selectedRow: action.selectedRow,
    };
  },
  [OPEN_REMOVE_CONTACT_MODAL]: (state, action) => {
    return {
      ...state,
      isRemoveModalOpen: true,
    };
  },
  [CLOSE_REMOVE_CONTACT_MODAL]: (state, action) => {
    return {
      ...state,
      isRemoveModalOpen: false,
    };
  },
  [OPEN_CONTACT_EDIT_MODAL]: (state, action) => {
    return {
      ...state,
      isContactEditModalOpen: true,
      contactModalMode: action.modalMode || CONTACT_MODAL_ADD_MODE,
      currentContact: action.contact
        ? Object.assign({}, state.currentContact, action.contact)
        : {},
    };
  },
  [CLOSE_CONTACT_EDIT_MODAL]: (state, action) => {
    return {
      ...state,
      isContactEditModalOpen: false,
      currentContact: {},
    };
  },
  [SET_CURRENT_CONTACT]: (state, action) => {
    return {
      ...state,
      currentContact: Object.assign({}, state.currentContact, action.contact),
    };
  },
};

const PhonebookReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};

/* Selectors */
// get list of contacts from DB
export const getContactsList = state => state.Phonebook.contactsList;
// get selected row index
export const getSelectedRow = state => state.Phonebook.selectedRow;
// Check if removing a contact modal is open
export const getIsRemoveModalOpen = state => state.Phonebook.isRemoveModalOpen;
// check if the modal for add/edit contact is open
export const getIsContactEditModalOpen = state =>
  state.Phonebook.isContactEditModalOpen;
// get Mode of opened Contact Modal (Add / Edit)
export const getContactModalMode = state => state.Phonebook.contactModalMode;
// get Currently edited Contact
export const getCurrentContact = state => state.Phonebook.currentContact;

export default PhonebookReducer;
