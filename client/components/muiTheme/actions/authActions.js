export const USER_LOGIN = 'MUI_THEME/USER_LOGIN';
export const USER_LOGIN_LOADING = 'MUI_THEME/USER_LOGIN_LOADING';
export const USER_LOGIN_FAILURE = 'MUI_THEME/USER_LOGIN_FAILURE';
export const USER_LOGIN_SUCCESS = 'MUI_THEME/USER_LOGIN_SUCCESS';

export const userLogin = (payload, pathName) => ({
  type: USER_LOGIN,
  payload,
  meta: { auth: true, pathName },
});

export const USER_CHECK = 'MUI_THEME/USER_CHECK';

export const userCheck = (payload, pathName) => ({
  type: USER_CHECK,
  payload,
  meta: { auth: true, pathName },
});

export const USER_LOGOUT = 'MUI_THEME/USER_LOGOUT';

export const userLogout = () => ({
  type: USER_LOGOUT,
  meta: { auth: true },
});
