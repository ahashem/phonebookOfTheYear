// Import Actions
import {
  CLOSE_LABEL_EDIT_MODAL,
  CLOSE_REMOVE_LABEL_MODAL,
  CONTACT_MODAL_ADD_MODE,
  OPEN_LABEL_EDIT_MODAL,
  OPEN_REMOVE_LABEL_MODAL,
  SET_CURRENT_LABEL,
  SET_LABELS_LIST,
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
  [SET_LABELS_LIST]: (state, action) => {
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
  [OPEN_REMOVE_LABEL_MODAL]: (state, action) => {
    return {
      ...state,
      isRemoveModalOpen: true,
    };
  },
  [CLOSE_REMOVE_LABEL_MODAL]: (state, action) => {
    return {
      ...state,
      isRemoveModalOpen: false,
    };
  },
  [OPEN_LABEL_EDIT_MODAL]: (state, action) => {
    return {
      ...state,
      isContactEditModalOpen: true,
      contactModalMode: action.modalMode || CONTACT_MODAL_ADD_MODE,
      currentContact: action.label
        ? Object.assign({}, state.currentContact, action.label)
        : {},
    };
  },
  [CLOSE_LABEL_EDIT_MODAL]: (state, action) => {
    return {
      ...state,
      isContactEditModalOpen: false,
      currentContact: {},
    };
  },
  [SET_CURRENT_LABEL]: (state, action) => {
    return {
      ...state,
      currentContact: Object.assign({}, state.currentContact, action.label),
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
export const getIsRemoveModalOpen = state =>
  state.Phonebook.isRemoveModalOpen;
// check if the modal for add/edit contact is open
export const getIsContactEditModalOpen = state =>
  state.Phonebook.isContactEditModalOpen;
// get Mode of opened Contact Modal (Add / Edit)
export const getContactModalMode = state => state.Phonebook.contactModalMode;
// get Currently edited Contact
export const getCurrentContact = state => state.Phonebook.currentContact;

export default PhonebookReducer;
