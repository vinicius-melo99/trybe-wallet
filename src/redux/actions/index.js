export const USER_LOGIN = 'USER_LOGIN';

export const actionUserLogin = (email) => ({
  type: USER_LOGIN,
  payload: email,
});
