// Constants
export const TOGGLE_SIDEBAR = 'MUI_THEME/TOGGLE_SIDEBAR';
export const SET_SIDEBAR_VISIBILITY = 'MUI_THEME/SET_SIDEBAR_VISIBILITY';

export const toggleSidebar = () => ({
  type: TOGGLE_SIDEBAR,
});

export const setSidebarVisibility = isOpen => ({
  type: SET_SIDEBAR_VISIBILITY,
  payload: isOpen,
});
